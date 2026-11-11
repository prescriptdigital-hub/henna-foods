'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatMoney, productHref, THEMES, type ProductDoc, type SizeDoc, type StoreData, type Theme } from '@/lib/catalog'
import type { DeliveryFee } from '@/lib/delivery'

type Props = { initial: StoreData; databaseReady: boolean; photosReady: boolean }

const ORIGINAL = ['cookies', 'chinchin']

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)

const naira = (n: number) => formatMoney(n, 'NGN')

function blankProduct(existing: ProductDoc[]): ProductDoc {
  let slug = 'new-product'
  for (let i = 2; existing.some(p => p.slug === slug); i++) slug = `new-product-${i}`
  return {
    slug,
    name: '',
    shortName: '',
    tagline: '',
    summary: '',
    description: '',
    theme: 'gold',
    badge: 'New',
    cardImage: '',
    images: [],
    sizes: [{ sku: '', label: '', price: 0, available: true }],
    benefits: [],
    ingredients: '',
    visible: false,
  }
}

// New sizes get a permanent code the first time they are saved
function withSkus(data: StoreData): StoreData {
  const used = new Set(data.products.flatMap(p => p.sizes.map(s => s.sku)).filter(Boolean))
  return {
    ...data,
    products: data.products.map(p => ({
      ...p,
      sizes: p.sizes.map(s => {
        if (s.sku) return s
        const base = `${p.slug}-${slugify(s.label) || 'size'}`
        let sku = base
        for (let i = 2; used.has(sku); i++) sku = `${base}-${i}`
        used.add(sku)
        return { ...s, sku }
      }),
    })),
  }
}

// Large phone photos are resized in the browser before upload
async function shrink(file: File): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Photos must be JPG, PNG or WebP.')
  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file
  const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size < 2.5 * 1024 * 1024) return file
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return new Promise((resolve, reject) =>
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Could not prepare the photo.'))), 'image/jpeg', 0.86)
  )
}

async function uploadPhoto(file: File): Promise<string> {
  const blob = await shrink(file)
  const form = new FormData()
  form.append('file', blob, file.name.replace(/\.\w+$/, '') + (blob.type === 'image/jpeg' ? '.jpg' : ''))
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error ?? 'The photo could not be uploaded.')
  return json.url as string
}

export default function AdminDashboard({ initial, databaseReady, photosReady }: Props) {
  const router = useRouter()
  const [data, setData] = useState<StoreData>(initial)
  const [saved, setSaved] = useState(() => JSON.stringify(initial))
  const [tab, setTab] = useState<'products' | 'delivery'>('products')
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)

  const dirty = JSON.stringify(data) !== saved
  const savedSlugs = useMemo(() => (JSON.parse(saved) as StoreData).products.map(p => p.slug), [saved])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const save = async () => {
    setSaving(true)
    setNotice(null)
    const payload = withSkus(data)
    const res = await fetch('/api/admin/store', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null)
    const json = await res?.json().catch(() => ({}))
    setSaving(false)
    if (!res?.ok) {
      setNotice({ kind: 'error', text: json?.error ?? 'Could not save. Please check your connection.' })
      return
    }
    setData(json.data)
    setSaved(JSON.stringify(json.data))
    setNotice({ kind: 'ok', text: 'Saved. The website now shows your changes.' })
    router.refresh()
  }

  const logout = async () => {
    if (dirty && !window.confirm('You have unsaved changes. Log out anyway?')) return
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.refresh()
  }

  const updateProduct = (slug: string, next: ProductDoc) =>
    setData(d => ({ ...d, products: d.products.map(p => (p.slug === slug ? next : p)) }))

  const current = data.products.find(p => p.slug === editing) ?? null

  return (
    <section className="bg-cream min-h-[70vh] pb-28">
      <div className="bg-ivory border-b border-gold/25">
        <div className="container-henna py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-chocolate">Shop Dashboard</h1>
            <p className="font-body text-xs text-chocolate/50 mt-1">
              {data.updatedAt
                ? `Last saved ${new Date(data.updatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`
                : 'Showing the built-in products and fees. Nothing has been saved yet.'}
            </p>
          </div>
          <button type="button" onClick={logout} className="btn-secondary text-xs px-5 py-2.5">Log out</button>
        </div>
        <div className="container-henna flex gap-1">
          {(['products', 'delivery'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t)
                setEditing(null)
              }}
              className={`font-body text-sm font-semibold px-5 py-3 border-b-2 transition-colors ${
                tab === t ? 'border-gold text-chocolate' : 'border-transparent text-chocolate/50 hover:text-chocolate'
              }`}
            >
              {t === 'products' ? `Products (${data.products.length})` : `Delivery fees (${data.delivery.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="container-henna pt-8">
        {!databaseReady && (
          <Banner>
            <strong>Saving is switched off.</strong> Connect a database in Vercel (Storage, then Upstash Redis) and redeploy.
            You can look around, but changes made now will not be kept.
          </Banner>
        )}

        {tab === 'products' &&
          (current ? (
            <ProductEditor
              key={data.products.indexOf(current)}
              product={current}
              isSaved={savedSlugs.includes(current.slug)}
              allSlugs={data.products.map(p => p.slug)}
              photosReady={photosReady}
              onChange={next => {
                updateProduct(current.slug, next)
                if (next.slug !== current.slug) setEditing(next.slug)
              }}
              onBack={() => setEditing(null)}
              onDelete={() => {
                setData(d => ({ ...d, products: d.products.filter(p => p.slug !== current.slug) }))
                setEditing(null)
              }}
            />
          ) : (
            <ProductList
              products={data.products}
              onEdit={setEditing}
              onToggle={p => updateProduct(p.slug, { ...p, visible: !p.visible })}
              onAdd={() => {
                const p = blankProduct(data.products)
                setData(d => ({ ...d, products: [...d.products, p] }))
                setEditing(p.slug)
              }}
            />
          ))}

        {tab === 'delivery' && <DeliveryEditor areas={data.delivery} onChange={delivery => setData(d => ({ ...d, delivery }))} />}
      </div>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-ivory/95 backdrop-blur border-t border-gold/30">
        <div className="container-henna py-3 flex flex-wrap items-center justify-between gap-3">
          <p className={`font-body text-sm ${notice?.kind === 'error' ? 'text-rose-red' : 'text-chocolate/60'}`} role="status">
            {notice?.text ?? (dirty ? 'You have unsaved changes.' : 'Everything is saved.')}
          </p>
          <div className="flex gap-3">
            {dirty && (
              <button
                type="button"
                onClick={() => {
                  setData(JSON.parse(saved))
                  setNotice(null)
                }}
                className="btn-secondary text-xs px-5 py-2.5"
              >
                Undo changes
              </button>
            )}
            <button
              type="button"
              onClick={save}
              disabled={!dirty || saving || !databaseReady}
              className="btn-primary text-xs px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-2xl border border-gold/50 bg-[#FBE6C4] px-5 py-4 font-body text-sm text-chocolate leading-relaxed">
      {children}
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-body text-sm font-semibold text-chocolate block mb-1">{label}</span>
      {hint && <span className="font-body text-xs text-chocolate/50 block mb-1.5">{hint}</span>}
      {children}
    </label>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-ivory rounded-2xl border border-gold/25 shadow-card p-6">
      <h3 className="font-heading text-lg font-semibold text-chocolate mb-5">{title}</h3>
      {children}
    </div>
  )
}

function Thumb({ src, className = '' }: { src: string; className?: string }) {
  // Plain img: previews must also work for photos not yet saved
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className={`object-cover bg-cream ${className}`} />
}

// ---------- Products ----------

function ProductList({
  products,
  onEdit,
  onToggle,
  onAdd,
}: {
  products: ProductDoc[]
  onEdit: (slug: string) => void
  onToggle: (p: ProductDoc) => void
  onAdd: () => void
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="font-body text-sm text-chocolate/60">Click a product to change its prices, sizes, photos or wording.</p>
        <button type="button" onClick={onAdd} className="btn-accent text-xs px-5 py-2.5">+ Add a product</button>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {products.map(p => (
          <div key={p.slug} className="bg-ivory rounded-2xl border border-gold/25 shadow-card overflow-hidden flex">
            <button type="button" onClick={() => onEdit(p.slug)} className="shrink-0 w-28 sm:w-36 bg-cream" aria-label={`Edit ${p.name || 'new product'}`}>
              {p.cardImage || p.images[0] ? (
                <Thumb src={p.cardImage || p.images[0].src} className="w-full h-full" />
              ) : (
                <span className="font-body text-xs text-chocolate/40 px-2">No photo</span>
              )}
            </button>
            <div className="flex-1 p-5 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <button type="button" onClick={() => onEdit(p.slug)} className="text-left">
                  <h3 className="font-heading text-lg font-semibold text-chocolate leading-snug hover:text-cookie-brown">
                    {p.name || 'Untitled product'}
                  </h3>
                </button>
                <span className={`shrink-0 font-body text-[11px] font-semibold rounded-pill px-2.5 py-1 ${p.visible ? 'bg-henna-green/15 text-henna-green' : 'bg-chocolate/10 text-chocolate/55'}`}>
                  {p.visible ? 'On sale' : 'Hidden'}
                </span>
              </div>
              <ul className="mt-2 space-y-0.5">
                {p.sizes.map((s, i) => (
                  <li key={s.sku || i} className={`font-body text-sm ${s.available ? 'text-chocolate/75' : 'text-chocolate/35 line-through'}`}>
                    {s.label || 'New size'} · {s.price ? naira(s.price) : 'no price'}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => onEdit(p.slug)} className="font-body text-sm font-semibold text-chocolate underline underline-offset-4 decoration-gold">
                  Edit
                </button>
                <button type="button" onClick={() => onToggle(p)} className="font-body text-sm text-chocolate/60 hover:text-chocolate">
                  {p.visible ? 'Hide from shop' : 'Put on sale'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductEditor({
  product: p,
  isSaved,
  allSlugs,
  photosReady,
  onChange,
  onBack,
  onDelete,
}: {
  product: ProductDoc
  isSaved: boolean
  allSlugs: string[]
  photosReady: boolean
  onChange: (p: ProductDoc) => void
  onBack: () => void
  onDelete: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const set = <K extends keyof ProductDoc>(key: K, value: ProductDoc[K]) => onChange({ ...p, [key]: value })
  const original = ORIGINAL.includes(p.slug)

  // A new product's web address follows its name until it is first saved
  const setName = (name: string) => {
    if (isSaved) return set('name', name)
    let slug = slugify(name) || 'new-product'
    for (let i = 2; allSlugs.includes(slug) && slug !== p.slug; i++) slug = `${slugify(name)}-${i}`
    onChange({ ...p, name, slug })
  }

  const setSize = (i: number, next: Partial<SizeDoc>) => set('sizes', p.sizes.map((s, j) => (j === i ? { ...s, ...next } : s)))

  const upload = async (files: FileList | null, target: 'card' | 'gallery') => {
    if (!files?.length) return
    setUploading(true)
    setUploadError('')
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) urls.push(await uploadPhoto(file))
      if (target === 'card') set('cardImage', urls[0])
      else set('images', [...p.images, ...urls.map(src => ({ src, alt: p.name }))].slice(0, 12))
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'The photo could not be uploaded.')
    }
    setUploading(false)
  }

  const moveImage = (i: number, by: number) => {
    const images = [...p.images]
    const [img] = images.splice(i, 1)
    images.splice(Math.max(0, Math.min(images.length, i + by)), 0, img)
    set('images', images)
  }

  return (
    <div>
      <button type="button" onClick={onBack} className="font-body text-sm text-chocolate/60 hover:text-chocolate mb-5">
        ← All products
      </button>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="font-heading text-2xl font-semibold text-chocolate">{p.name || 'New product'}</h2>
        <label className="flex items-center gap-2 font-body text-sm text-chocolate cursor-pointer">
          <input type="checkbox" checked={p.visible} onChange={e => set('visible', e.target.checked)} className="w-4 h-4 accent-[#3B1F10]" />
          Show on the website
        </label>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
        <div className="space-y-6">
          <Card title="Sizes and prices">
            <p className="font-body text-xs text-chocolate/50 mb-4">Prices are in naira. Untick a size to stop selling it without deleting it.</p>
            <div className="space-y-3">
              {p.sizes.map((s, i) => (
                <div key={s.sku || `new-${i}`} className="grid grid-cols-2 sm:grid-cols-[1fr_1.2fr_auto_auto] gap-2 items-center">
                  <input
                    aria-label="Size"
                    placeholder="e.g. 900g"
                    value={s.label}
                    onChange={e => setSize(i, { label: e.target.value })}
                    className="input-henna text-sm"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-chocolate/50">₦</span>
                    <input
                      aria-label={`Price for ${s.label || 'this size'}`}
                      inputMode="numeric"
                      placeholder="0"
                      value={s.price ? String(s.price) : ''}
                      onChange={e => setSize(i, { price: Number(e.target.value.replace(/\D/g, '')) || 0 })}
                      className="input-henna text-sm pl-7"
                    />
                  </div>
                  <label className="flex items-center gap-1.5 font-body text-xs text-chocolate/70 cursor-pointer">
                    <input type="checkbox" checked={s.available} onChange={e => setSize(i, { available: e.target.checked })} className="accent-[#3B1F10]" />
                    On sale
                  </label>
                  <button
                    type="button"
                    onClick={() => set('sizes', p.sizes.filter((_, j) => j !== i))}
                    disabled={p.sizes.length === 1}
                    className="font-body text-xs text-rose-red disabled:opacity-30 px-1"
                    aria-label={`Remove ${s.label || 'this size'}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => set('sizes', [...p.sizes, { sku: '', label: '', price: 0, available: true }])}
              className="mt-4 font-body text-sm font-semibold text-chocolate underline underline-offset-4 decoration-gold"
            >
              + Add a size
            </button>
          </Card>

          <Card title="Name and wording">
            <div className="space-y-4">
              <Field label="Product name">
                <input value={p.name} onChange={e => setName(e.target.value)} className="input-henna" placeholder="e.g. Henna Coconut Crunch" />
              </Field>
              <Field label="Short name" hint="Used in the basket and order emails.">
                <input value={p.shortName} onChange={e => set('shortName', e.target.value)} className="input-henna" />
              </Field>
              <Field label="Tagline" hint="The short italic line, e.g. Rich. Buttery. Unforgettable.">
                <input value={p.tagline} onChange={e => set('tagline', e.target.value)} className="input-henna" />
              </Field>
              <Field label="Badge" hint="Small label on the photo, e.g. Best Seller or New. Leave blank for none.">
                <input value={p.badge} onChange={e => set('badge', e.target.value)} className="input-henna" />
              </Field>
              <Field label="Card description" hint="Two short sentences shown on the shop and homepage cards.">
                <textarea rows={3} value={p.summary} onChange={e => set('summary', e.target.value)} className="input-henna resize-y" />
              </Field>
              <Field label="Full description" hint="Shown on the product page.">
                <textarea rows={5} value={p.description} onChange={e => set('description', e.target.value)} className="input-henna resize-y" />
              </Field>
              <Field label="Colour style">
                <select value={p.theme} onChange={e => set('theme', e.target.value as Theme)} className="input-henna">
                  {(Object.keys(THEMES) as Theme[]).map(t => (
                    <option key={t} value={t}>{THEMES[t].label}</option>
                  ))}
                </select>
              </Field>
              <div className="font-body text-xs text-chocolate/55">
                Web address: <span className="font-semibold text-chocolate">hennafoods.com{productHref(p.slug)}</span>
                {!isSaved && !original && ' (set from the name; fixed once saved)'}
              </div>
            </div>
          </Card>

          <Card title="Why you'll love it">
            <div className="space-y-2">
              {p.benefits.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={b}
                    onChange={e => set('benefits', p.benefits.map((x, j) => (j === i ? e.target.value : x)))}
                    className="input-henna text-sm"
                    aria-label={`Point ${i + 1}`}
                  />
                  <button type="button" onClick={() => set('benefits', p.benefits.filter((_, j) => j !== i))} className="font-body text-xs text-rose-red px-1">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {p.benefits.length < 8 && (
              <button type="button" onClick={() => set('benefits', [...p.benefits, ''])} className="mt-3 font-body text-sm font-semibold text-chocolate underline underline-offset-4 decoration-gold">
                + Add a point
              </button>
            )}
          </Card>

          <Card title="Ingredients and allergens">
            <textarea rows={4} value={p.ingredients} onChange={e => set('ingredients', e.target.value)} className="input-henna resize-y text-sm" />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Photos">
            {!photosReady && (
              <p className="font-body text-xs text-chocolate/70 bg-[#FBE6C4] rounded-xl px-4 py-3 mb-4">
                Uploading is off until photo storage is connected in Vercel (Storage, then Blob).
              </p>
            )}
            {uploadError && <p className="font-body text-sm text-rose-red mb-3" role="alert">{uploadError}</p>}

            <span className="font-body text-sm font-semibold text-chocolate block mb-2">Shop card photo</span>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-28 h-28 rounded-xl overflow-hidden border border-gold/25 bg-cream flex items-center justify-center">
                {p.cardImage ? <Thumb src={p.cardImage} className="w-full h-full" /> : <span className="font-body text-xs text-chocolate/40">None</span>}
              </div>
              <div className="space-y-2">
                <PhotoButton disabled={!photosReady || uploading} onFiles={f => upload(f, 'card')}>
                  {p.cardImage ? 'Replace photo' : 'Upload photo'}
                </PhotoButton>
                {!p.cardImage && <p className="font-body text-xs text-chocolate/50">Without one, the first gallery photo is used.</p>}
              </div>
            </div>

            <span className="font-body text-sm font-semibold text-chocolate block mb-1">Product page gallery</span>
            <span className="font-body text-xs text-chocolate/50 block mb-3">The first photo shows large. Up to 12 photos.</span>
            <div className="space-y-3">
              {p.images.map((img, i) => (
                <div key={img.src} className="flex gap-3 items-center">
                  <Thumb src={img.src} className="w-16 h-16 rounded-lg border border-gold/25 shrink-0" />
                  <input
                    value={img.alt}
                    onChange={e => set('images', p.images.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                    className="input-henna text-xs"
                    placeholder="Describe the photo"
                    aria-label="Photo description"
                  />
                  <div className="flex flex-col gap-1 shrink-0">
                    <div className="flex gap-1">
                      <button type="button" disabled={i === 0} onClick={() => moveImage(i, -1)} className="w-7 h-7 rounded-md border border-gold/30 text-xs disabled:opacity-30" aria-label="Move up">↑</button>
                      <button type="button" disabled={i === p.images.length - 1} onClick={() => moveImage(i, 1)} className="w-7 h-7 rounded-md border border-gold/30 text-xs disabled:opacity-30" aria-label="Move down">↓</button>
                    </div>
                    <button type="button" onClick={() => set('images', p.images.filter((_, j) => j !== i))} className="font-body text-[11px] text-rose-red">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {p.images.length < 12 && (
              <div className="mt-4">
                <PhotoButton multiple disabled={!photosReady || uploading} onFiles={f => upload(f, 'gallery')}>
                  {uploading ? 'Uploading...' : '+ Add photos'}
                </PhotoButton>
              </div>
            )}
          </Card>

          <Card title={original ? 'Remove from sale' : 'Delete product'}>
            {original ? (
              <p className="font-body text-sm text-chocolate/60">
                Bukkie&apos;s and Richie can be hidden but not deleted. Untick &ldquo;Show on the website&rdquo; above to take it off sale.
              </p>
            ) : (
              <>
                <p className="font-body text-sm text-chocolate/60 mb-4">To pause sales, untick &ldquo;Show on the website&rdquo; instead. Deleting removes the product once you save.</p>
                <button
                  type="button"
                  onClick={() => (confirmDelete ? onDelete() : setConfirmDelete(true))}
                  className="rounded-pill border border-rose-red text-rose-red font-body text-xs font-semibold px-5 py-2.5 hover:bg-rose-red hover:text-white transition-colors"
                >
                  {confirmDelete ? 'Click again to delete' : 'Delete this product'}
                </button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

function PhotoButton({
  children,
  disabled,
  multiple = false,
  onFiles,
}: {
  children: React.ReactNode
  disabled: boolean
  multiple?: boolean
  onFiles: (files: FileList | null) => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <button type="button" disabled={disabled} onClick={() => ref.current?.click()} className="btn-secondary text-xs px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
        {children}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        className="hidden"
        onChange={e => {
          onFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </>
  )
}

// ---------- Delivery ----------

function DeliveryEditor({ areas, onChange }: { areas: DeliveryFee[]; onChange: (a: DeliveryFee[]) => void }) {
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newFee, setNewFee] = useState('')

  const rows = areas
    .map((a, index) => ({ ...a, index }))
    .filter(a => a.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))

  const setArea = (index: number, next: Partial<DeliveryFee>) => onChange(areas.map((a, i) => (i === index ? { ...a, ...next } : a)))
  const parseFee = (v: string) => (v.trim() === '' ? null : Number(v.replace(/\D/g, '')) || 0)

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    onChange([...areas, { name, fee: parseFee(newFee) }])
    setNewName('')
    setNewFee('')
    setQuery(name)
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="bg-ivory rounded-2xl border border-gold/25 shadow-card p-6">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find an area" className="input-henna mb-4" aria-label="Find an area" />
        <div className="divide-y divide-gold/15">
          {rows.map(a => (
            <div key={a.index} className="grid grid-cols-[1fr_140px_auto] gap-3 items-center py-2">
              <input value={a.name} onChange={e => setArea(a.index, { name: e.target.value })} className="input-henna text-sm py-2" aria-label="Area name" />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-chocolate/50">₦</span>
                <input
                  inputMode="numeric"
                  value={a.fee === null ? '' : String(a.fee)}
                  placeholder="Quote"
                  onChange={e => setArea(a.index, { fee: parseFee(e.target.value) })}
                  className="input-henna text-sm py-2 pl-7"
                  aria-label={`Fee for ${a.name}`}
                />
              </div>
              <button type="button" onClick={() => onChange(areas.filter((_, i) => i !== a.index))} className="font-body text-xs text-rose-red px-1">
                Remove
              </button>
            </div>
          ))}
          {rows.length === 0 && <p className="font-body text-sm text-chocolate/50 py-4">No areas match &ldquo;{query}&rdquo;.</p>}
        </div>
      </div>

      <div className="space-y-6 lg:sticky lg:top-6">
        <form onSubmit={add} className="bg-ivory rounded-2xl border border-gold/25 shadow-card p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-chocolate">Add an area</h3>
          <Field label="Area name">
            <input value={newName} onChange={e => setNewName(e.target.value)} className="input-henna" placeholder="e.g. Ikota" />
          </Field>
          <Field label="Fee (₦)" hint="Leave blank to quote it on request.">
            <input inputMode="numeric" value={newFee} onChange={e => setNewFee(e.target.value)} className="input-henna" />
          </Field>
          <button type="submit" disabled={!newName.trim()} className="btn-primary w-full justify-center text-xs disabled:opacity-50">Add area</button>
        </form>
        <p className="font-body text-xs text-chocolate/55 leading-relaxed px-1">
          A blank fee shows &ldquo;quoted on request&rdquo; at checkout, and customers are sent to WhatsApp for a price.
          Remember to press <strong>Save changes</strong>.
        </p>
      </div>
    </div>
  )
}
