import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { unstable_cache, revalidateTag } from 'next/cache'
import { buildCatalog, THEMES, type ProductDoc, type StoreData, type Theme } from './catalog'
import { DEFAULT_STORE } from './catalog-defaults'
import { areaId, type DeliveryFee } from './delivery'

// The shop is saved as one JSON document in Upstash Redis (connected through
// Vercel's Storage tab). Without a database the built-in defaults are used;
// in local development changes are kept in .data/store.json instead.

const KEY = 'henna:store'
const TAG = 'store'
const LOCAL_FILE = path.join(process.cwd(), '.data', 'store.json')

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

const localFileMode = () => !redisConfig() && process.env.NODE_ENV !== 'production'

export const storageConnected = () => Boolean(redisConfig()) || localFileMode()
export const photoStorageConnected = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

async function redis(command: unknown[]) {
  const cfg = redisConfig()!
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  const json = (await res.json().catch(() => null)) as { result?: unknown; error?: string } | null
  if (!res.ok || !json || json.error) throw new Error(json?.error ?? `Database request failed (${res.status})`)
  return json.result
}

async function readRaw(): Promise<string | null> {
  if (redisConfig()) return (await redis(['GET', KEY])) as string | null
  if (localFileMode()) return fs.readFile(LOCAL_FILE, 'utf8').catch(() => null)
  return null
}

async function readStore(): Promise<StoreData> {
  try {
    const raw = await readRaw()
    if (!raw) return DEFAULT_STORE
    const checked = validateStore(JSON.parse(raw))
    return 'data' in checked ? checked.data : DEFAULT_STORE
  } catch (err) {
    console.error('Could not read the shop from the database, using defaults', err)
    return DEFAULT_STORE
  }
}

// Cached between requests and refreshed the moment the dashboard saves
export const getStore = unstable_cache(readStore, [KEY], { tags: [TAG] })

export async function getCatalog() {
  return buildCatalog(await getStore())
}

export async function saveStore(data: StoreData) {
  const json = JSON.stringify({ ...data, updatedAt: new Date().toISOString() })
  if (redisConfig()) {
    await redis(['SET', KEY, json])
  } else if (localFileMode()) {
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true })
    await fs.writeFile(LOCAL_FILE, json)
  } else {
    throw new Error('No database is connected.')
  }
  revalidateTag(TAG)
}

// ---- Validation: everything the dashboard sends is checked here ----

const BLOB_HOST = /^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function text(v: unknown, max: number) {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export function isAllowedImage(src: string) {
  if (src.startsWith('/images/') && !src.includes('..')) return true
  try {
    const u = new URL(src)
    return u.protocol === 'https:' && BLOB_HOST.test(u.hostname)
  } catch {
    return false
  }
}

function price(v: unknown, max: number) {
  const n = typeof v === 'number' ? v : typeof v === 'string' && v.trim() !== '' ? Number(v) : NaN
  return Number.isInteger(n) && n >= 0 && n <= max ? n : null
}

type Result = { data: StoreData } | { error: string }

export function validateStore(input: unknown): Result {
  const raw = (input ?? {}) as Record<string, unknown>
  if (!Array.isArray(raw.products) || !Array.isArray(raw.delivery)) return { error: 'The shop data is incomplete.' }
  if (raw.products.length === 0) return { error: 'Keep at least one product.' }
  if (raw.products.length > 50) return { error: 'There can be at most 50 products.' }

  const slugs = new Set<string>()
  const skus = new Set<string>()
  const products: ProductDoc[] = []

  for (const rp of raw.products as Record<string, unknown>[]) {
    const name = text(rp?.name, 80)
    if (!name) return { error: 'Every product needs a name.' }
    const slug = text(rp.slug, 60).toLowerCase()
    if (slug.length < 2 || !SLUG.test(slug)) return { error: `"${name}" needs a web address made of lowercase letters, numbers and dashes.` }
    if (slugs.has(slug)) return { error: `Two products use the web address "${slug}".` }
    slugs.add(slug)

    const sizesIn = Array.isArray(rp.sizes) ? (rp.sizes as Record<string, unknown>[]) : []
    if (sizesIn.length === 0) return { error: `"${name}" needs at least one size.` }
    if (sizesIn.length > 10) return { error: `"${name}" can have at most 10 sizes.` }
    const sizes = []
    for (const rs of sizesIn) {
      const label = text(rs?.label, 30)
      if (!label) return { error: `Every size of "${name}" needs a label, such as 900g.` }
      const sku = text(rs.sku, 80).toLowerCase()
      if (sku.length < 2 || !SLUG.test(sku)) return { error: `The ${label} size of "${name}" has an invalid code.` }
      if (skus.has(sku)) return { error: `Two sizes share the code "${sku}".` }
      skus.add(sku)
      const p = price(rs.price, 10_000_000)
      if (!p) return { error: `Set a price for the ${label} size of "${name}" (whole naira, more than 0).` }
      sizes.push({ sku, label, price: p, available: rs.available !== false })
    }

    const images = (Array.isArray(rp.images) ? (rp.images as Record<string, unknown>[]) : [])
      .slice(0, 12)
      .map(img => ({ src: text(img?.src, 500), alt: text(img?.alt, 160) || name }))
    if (images.some(img => !isAllowedImage(img.src))) return { error: `One of the photos for "${name}" is not from this site's photo storage.` }
    const cardImage = text(rp.cardImage, 500)
    if (cardImage && !isAllowedImage(cardImage)) return { error: `The card photo for "${name}" is not from this site's photo storage.` }

    const theme = (typeof rp.theme === 'string' && rp.theme in THEMES ? rp.theme : 'gold') as Theme

    products.push({
      slug,
      name,
      shortName: text(rp.shortName, 60) || name,
      tagline: text(rp.tagline, 120),
      summary: text(rp.summary, 400),
      description: text(rp.description, 2000),
      theme,
      badge: text(rp.badge, 30),
      cardImage,
      images,
      sizes,
      benefits: (Array.isArray(rp.benefits) ? rp.benefits : []).map(b => text(b, 120)).filter(Boolean).slice(0, 8),
      ingredients: text(rp.ingredients, 1500),
      visible: rp.visible !== false,
    })
  }

  if (raw.delivery.length > 400) return { error: 'There can be at most 400 delivery areas.' }
  const areaIds = new Set<string>()
  const delivery: DeliveryFee[] = []
  for (const ra of raw.delivery as Record<string, unknown>[]) {
    const name = text(ra?.name, 60)
    if (!name) continue
    const id = areaId(name)
    if (!id) return { error: `"${name}" is not a valid area name.` }
    if (areaIds.has(id)) return { error: `The area "${name}" is listed twice.` }
    areaIds.add(id)
    if (ra.fee === null || ra.fee === '' || ra.fee === undefined) {
      delivery.push({ name, fee: null })
      continue
    }
    const fee = price(ra.fee, 1_000_000)
    if (fee === null) return { error: `The fee for ${name} must be a whole naira amount, or blank to quote on request.` }
    delivery.push({ name, fee })
  }

  return { data: { products, delivery, updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : null } }
}
