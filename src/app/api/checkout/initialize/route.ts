import { NextResponse } from 'next/server'
import {
  cartTotals,
  chargeCurrencyFor,
  formatMoney,
  isCurrency,
  isProductId,
  PRODUCTS,
  type LineInput,
  type ProductId,
} from '@/lib/catalog'
import { paystackConfigured, paystackRequest, usdEnabled } from '@/lib/paystack'

type Body = {
  items?: unknown
  currency?: unknown
  customer?: Record<string, unknown>
}

const text = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  if (!paystackConfigured()) {
    return NextResponse.json(
      { error: 'Online payment is not switched on yet. Please contact us to complete your order.' },
      { status: 503 }
    )
  }

  const body = (await req.json().catch(() => ({}))) as Body

  // Rebuild the order from the catalog; the browser only tells us ids and quantities.
  const merged = new Map<ProductId, number>()
  if (Array.isArray(body.items)) {
    for (const raw of body.items) {
      const id = raw?.id
      const qty = Number(raw?.quantity)
      if (isProductId(id) && Number.isInteger(qty) && qty > 0 && qty <= 1000) {
        merged.set(id, (merged.get(id) ?? 0) + qty)
      }
    }
  }
  const lines: LineInput[] = [...merged].map(([id, quantity]) => ({ id, quantity }))
  if (lines.length === 0) {
    return NextResponse.json({ error: 'Your basket is empty.' }, { status: 400 })
  }

  const c = body.customer ?? {}
  const customer = {
    firstName: text(c.firstName, 80),
    lastName: text(c.lastName, 80),
    email: text(c.email, 160),
    phone: text(c.phone, 40),
    address: text(c.address),
    city: text(c.city, 80),
    region: text(c.region, 80),
    country: text(c.country, 80),
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) || !customer.firstName || !customer.address || !customer.phone) {
    return NextResponse.json({ error: 'Please complete your name, email, phone and delivery address.' }, { status: 400 })
  }

  const displayCurrency = isCurrency(body.currency) ? body.currency : 'NGN'
  const currency = chargeCurrencyFor(displayCurrency, usdEnabled())
  const totals = cartTotals(lines, currency)
  const reference = `HF-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase()
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin

  const itemSummary = lines.map(l => `${l.quantity} x ${PRODUCTS[l.id].name}`).join(', ')
  const deliveryAddress = [customer.address, customer.city, customer.region, customer.country].filter(Boolean).join(', ')

  try {
    const data = await paystackRequest<{ authorization_url: string; reference: string }>('/transaction/initialize', {
      method: 'POST',
      body: {
        email: customer.email,
        amount: Math.round(totals.total * 100), // kobo / cents
        currency,
        reference,
        callback_url: `${origin}/thank-you`,
        metadata: {
          items: lines,
          display_currency: displayCurrency,
          customer,
          // custom_fields show on the transaction in the Paystack dashboard
          custom_fields: [
            { display_name: 'Customer', variable_name: 'customer_name', value: `${customer.firstName} ${customer.lastName}`.trim() },
            { display_name: 'Phone', variable_name: 'phone', value: customer.phone },
            { display_name: 'Items', variable_name: 'items', value: itemSummary },
            { display_name: 'Delivery address', variable_name: 'delivery_address', value: deliveryAddress },
            {
              display_name: 'Bulk saving',
              variable_name: 'bulk_saving',
              value: totals.discount > 0 ? `${(totals.tier?.discount ?? 0) * 100}% (${formatMoney(totals.discount, currency)})` : 'None',
            },
          ],
        },
      },
    })
    return NextResponse.json({ authorizationUrl: data.authorization_url, reference: data.reference })
  } catch (err) {
    console.error('Paystack initialize failed', err)
    return NextResponse.json({ error: 'We could not start the payment. Please try again in a moment.' }, { status: 502 })
  }
}
