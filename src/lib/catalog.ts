// Single source of truth for products, prices and bulk discounts.
// Used by the browser and by the payment API, so totals can never drift.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hennafoods.com').replace(/\/$/, '')

export type Currency = 'NGN' | 'GBP' | 'USD'

export const CURRENCIES: { code: Currency; symbol: string; label: string; locale: string }[] = [
  { code: 'NGN', symbol: '₦', label: 'Naira', locale: 'en-NG' },
  { code: 'GBP', symbol: '£', label: 'Pounds', locale: 'en-GB' },
  { code: 'USD', symbol: '$', label: 'Dollars', locale: 'en-US' },
]

export const DEFAULT_CURRENCY: Currency = 'NGN'

// Each jar size is its own item (SKU) in the cart.
export type ProductId = 'bukkies-cookies-900g' | 'bukkies-cookies-600g' | 'richie-chinchin-750g' | 'richie-chinchin-500g'
export type ProductLine = 'cookies' | 'chinchin'

export type Product = {
  id: ProductId
  line: ProductLine
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

const sku = (
  id: ProductId,
  line: ProductLine,
  size: string,
  price: number
): Product => ({
  id,
  line,
  size,
  weight: `${size} jar`,
  price,
  ...(line === 'cookies'
    ? { name: "Bukkie's Premium Cookies", shortName: "Bukkie's Cookies", href: '/cookies', image: '/images/products/cookies-jar.jpg' }
    : { name: 'Richie Premium Chinchin', shortName: 'Richie Chinchin', href: '/chinchin', image: '/images/products/chinchin-jar.jpg' }),
})

export const PRODUCTS: Record<ProductId, Product> = {
  'bukkies-cookies-900g': sku('bukkies-cookies-900g', 'cookies', '900g', 8500),
  'bukkies-cookies-600g': sku('bukkies-cookies-600g', 'cookies', '600g', 6200),
  'richie-chinchin-750g': sku('richie-chinchin-750g', 'chinchin', '750g', 5800),
  'richie-chinchin-500g': sku('richie-chinchin-500g', 'chinchin', '500g', 4400),
}

// Sizes offered per product, largest first (the default selection)
export const PRODUCT_LINES: Record<ProductLine, ProductId[]> = {
  cookies: ['bukkies-cookies-900g', 'bukkies-cookies-600g'],
  chinchin: ['richie-chinchin-750g', 'richie-chinchin-500g'],
}

export function isProductId(id: unknown): id is ProductId {
  return typeof id === 'string' && id in PRODUCTS
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

// Order totals in naira (the currency every order is charged in)
export function cartTotals(lines: LineInput[]) {
  const jars = lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = lines.reduce((sum, l) => sum + PRODUCTS[l.id].price * l.quantity, 0)
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
