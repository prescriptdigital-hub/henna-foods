// Products, prices and bulk discounts. Product data is edited in the admin
// dashboard and stored in the database (see catalog-store.ts); the built-in
// defaults live in catalog-defaults.ts. Everything here is pure, so the
// browser and the payment API compute the same totals from the same data.

import { toDeliveryAreas, type DeliveryArea, type DeliveryFee } from './delivery'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hennafoods.com').replace(/\/$/, '')

export type Currency = 'NGN' | 'GBP' | 'USD'

export const CURRENCIES: { code: Currency; symbol: string; label: string; locale: string }[] = [
  { code: 'NGN', symbol: '₦', label: 'Naira', locale: 'en-NG' },
  { code: 'GBP', symbol: '£', label: 'Pounds', locale: 'en-GB' },
  { code: 'USD', symbol: '$', label: 'Dollars', locale: 'en-US' },
]

export const DEFAULT_CURRENCY: Currency = 'NGN'

// Page colour themes a product can use
export const THEMES = {
  cookies: { label: "Rose and cookie brown (Bukkie's)", accent: '#A65F2B' },
  chinchin: { label: 'Golden crunch (Richie)', accent: '#E8A735' },
  gold: { label: 'Henna gold', accent: '#A87C1B' },
  rose: { label: 'Rose red', accent: '#C41E3A' },
} as const
export type Theme = keyof typeof THEMES

// One size of a product, sold as its own item (SKU) in the cart.
// The sku stays the same when the price or label changes, so saved baskets keep working.
export type SizeDoc = { sku: string; label: string; price: number; available: boolean }

export type ProductImage = { src: string; alt: string }

// A product as edited in the admin dashboard
export type ProductDoc = {
  slug: string
  name: string
  shortName: string
  tagline: string
  summary: string
  description: string
  theme: Theme
  badge: string
  // Photo on shop and homepage cards; the gallery is shown on the product page
  cardImage: string
  images: ProductImage[]
  sizes: SizeDoc[]
  benefits: string[]
  ingredients: string
  visible: boolean
}

// Everything the dashboard saves
export type StoreData = { products: ProductDoc[]; delivery: DeliveryFee[]; updatedAt: string | null }

export type ProductId = string

// One buyable size, as the cart and checkout see it
export type Product = {
  id: ProductId
  slug: string
  name: string
  shortName: string
  size: string
  weight: string
  href: string
  image: string
  // Price per jar in naira. Pound and dollar prices are converted at the
  // live exchange rate for display; orders are always charged in naira.
  price: number
}

export type Catalog = {
  products: ProductDoc[]
  skus: Record<ProductId, Product>
  delivery: DeliveryArea[]
  updatedAt: string | null
}

// The two original products keep their own addresses; added products live under /products
export const productHref = (slug: string) => (slug === 'cookies' || slug === 'chinchin' ? `/${slug}` : `/products/${slug}`)

export function buildCatalog(data: StoreData): Catalog {
  const skus: Record<ProductId, Product> = {}
  for (const p of data.products) {
    if (!p.visible) continue
    for (const s of p.sizes) {
      if (!s.available) continue
      skus[s.sku] = {
        id: s.sku,
        slug: p.slug,
        name: p.name,
        shortName: p.shortName || p.name,
        size: s.label,
        weight: `${s.label} jar`,
        href: productHref(p.slug),
        image: p.cardImage || p.images[0]?.src || '/images/brand/logo.png',
        price: s.price,
      }
    }
  }
  return { products: data.products, skus, delivery: toDeliveryAreas(data.delivery), updatedAt: data.updatedAt }
}

export const visibleProducts = (c: Catalog) => c.products.filter(p => p.visible && p.sizes.some(s => s.available))
export const findProduct = (c: Catalog, slug: string) => c.products.find(p => p.slug === slug)
export const buyableSizes = (p: ProductDoc) => p.sizes.filter(s => s.available)

export function isProductId(skus: Record<ProductId, Product>, id: unknown): id is ProductId {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(skus, id)
}

export function isCurrency(c: unknown): c is Currency {
  return c === 'NGN' || c === 'GBP' || c === 'USD'
}

// Bulk pricing: the discount applies to the whole order once the total jar
// count (any mix of sizes, cookies and chinchin) reaches a tier.
export const BULK_TIERS = [
  { minJars: 5, discount: 0.05, label: 'Sharing' },
] as const

// Orders above this are best handled as a wholesale quote (when wholesale is on).
export const WHOLESALE_MIN_JARS = 50

export function tierFor(jars: number) {
  return [...BULK_TIERS].reverse().find(t => jars >= t.minJars) ?? null
}

export function nextTier(jars: number) {
  return BULK_TIERS.find(t => jars < t.minJars) ?? null
}

export type LineInput = { id: ProductId; quantity: number }

// Order totals in naira (the currency every order is charged in).
// Lines for products that no longer exist are ignored.
export function cartTotals(lines: LineInput[], skus: Record<ProductId, Product>) {
  const known = lines.filter(l => skus[l.id])
  const jars = known.reduce((n, l) => n + l.quantity, 0)
  const subtotal = known.reduce((sum, l) => sum + skus[l.id].price * l.quantity, 0)
  const tier = tierFor(jars)
  const discount = Math.round(subtotal * (tier?.discount ?? 0))
  return { jars, subtotal, tier, discount, total: subtotal - discount }
}

// What 1 naira is worth in each currency, from the live rates feed
export type Rates = Record<Currency, number>

export function convertFromNaira(naira: number, currency: Currency, rates: Rates) {
  if (currency === 'NGN') return naira
  return Math.round(naira * rates[currency] * 100) / 100
}

export function formatMoney(amount: number, currency: Currency) {
  const meta = CURRENCIES.find(c => c.code === currency)!
  return new Intl.NumberFormat(meta.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'NGN' ? 0 : 2,
    maximumFractionDigits: currency === 'NGN' ? 0 : 2,
  }).format(amount)
}
