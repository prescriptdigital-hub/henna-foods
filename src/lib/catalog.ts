// Single source of truth for products, prices and bulk discounts.
// Used by the browser and by the payment API, so totals can never drift.

export type Currency = 'NGN' | 'GBP' | 'USD'

export const CURRENCIES: { code: Currency; symbol: string; label: string; locale: string }[] = [
  { code: 'NGN', symbol: '₦', label: 'Naira', locale: 'en-NG' },
  { code: 'GBP', symbol: '£', label: 'Pounds', locale: 'en-GB' },
  { code: 'USD', symbol: '$', label: 'Dollars', locale: 'en-US' },
]

export const DEFAULT_CURRENCY: Currency = 'NGN'

export type ProductId = 'bukkies-cookies' | 'richie-chinchin'

export type Product = {
  id: ProductId
  name: string
  shortName: string
  weight: string
  href: string
  image: string
  // Placeholder prices per jar. Replace with real prices before launch.
  prices: Record<Currency, number>
}

export const PRODUCTS: Record<ProductId, Product> = {
  'bukkies-cookies': {
    id: 'bukkies-cookies',
    name: "Bukkie's Premium Cookies",
    shortName: "Bukkie's Cookies",
    weight: '950g jar',
    href: '/cookies',
    image: '/images/products/cookies-label.jpg',
    prices: { NGN: 12500, GBP: 12.99, USD: 15.99 },
  },
  'richie-chinchin': {
    id: 'richie-chinchin',
    name: 'Richie Premium Chinchin',
    shortName: 'Richie Chinchin',
    weight: '500g jar',
    href: '/chinchin',
    image: '/images/products/chinchin-label.jpg',
    prices: { NGN: 7500, GBP: 9.99, USD: 11.99 },
  },
}

export function isProductId(id: unknown): id is ProductId {
  return typeof id === 'string' && id in PRODUCTS
}

export function isCurrency(c: unknown): c is Currency {
  return c === 'NGN' || c === 'GBP' || c === 'USD'
}

// Bulk pricing: the discount applies to the whole order once the total jar
// count (any mix of cookies and chinchin) reaches a tier.
export const BULK_TIERS = [
  { minJars: 6, discount: 0.1, label: 'Sharing' },
  { minJars: 12, discount: 0.15, label: 'Celebration' },
  { minJars: 24, discount: 0.2, label: 'Party' },
] as const

// Orders above this are best handled as a wholesale quote.
export const WHOLESALE_MIN_JARS = 50

export function tierFor(jars: number) {
  return [...BULK_TIERS].reverse().find(t => jars >= t.minJars) ?? null
}

export function nextTier(jars: number) {
  return BULK_TIERS.find(t => jars < t.minJars) ?? null
}

export type LineInput = { id: ProductId; quantity: number }

export function cartTotals(lines: LineInput[], currency: Currency) {
  const jars = lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = lines.reduce((sum, l) => sum + PRODUCTS[l.id].prices[currency] * l.quantity, 0)
  const tier = tierFor(jars)
  const discount = roundMoney(subtotal * (tier?.discount ?? 0), currency)
  return { jars, subtotal, tier, discount, total: roundMoney(subtotal - discount, currency) }
}

function roundMoney(amount: number, currency: Currency) {
  // Naira is shown in whole units; pounds and dollars to the penny/cent.
  return currency === 'NGN' ? Math.round(amount) : Math.round(amount * 100) / 100
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

// Paystack can always charge naira. Dollars only work once Paystack has
// enabled USD on the merchant account. Pounds are display-only.
export function chargeCurrencyFor(display: Currency, usdEnabled: boolean): Currency {
  return display === 'USD' && usdEnabled ? 'USD' : 'NGN'
}
