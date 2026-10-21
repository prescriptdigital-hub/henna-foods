import { createHmac, timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'
import { cartTotals, formatMoney, isProductId, PRODUCTS, type LineInput } from '@/lib/catalog'
import { detailsTable, escapeHtml, sendEmail, teamInbox } from '@/lib/email'

// Paystack calls this after each payment (Paystack dashboard > Settings >
// API Keys & Webhooks > Webhook URL: https://www.hennafoods.com/api/paystack/webhook).
// A successful charge emails an order alert to TEAM_EMAIL.

type Charge = {
  reference: string
  amount: number
  currency: string
  paid_at: string | null
  customer?: { email?: string }
  metadata?: unknown
}

type OrderMeta = {
  items?: { id?: unknown; quantity?: unknown }[]
  delivery_area?: string
  delivery_fee?: number
  display_currency?: string
  customer?: Record<string, string>
}

function signatureValid(raw: string, signature: string | null) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret || !signature) return false
  const expected = Buffer.from(createHmac('sha512', secret).update(raw).digest('hex'))
  const given = Buffer.from(signature)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

// Nigerian numbers written as 080... become 23480... for a WhatsApp link
function whatsappNumber(phone = '') {
  const digits = phone.replace(/\D/g, '')
  if (/^0\d{10}$/.test(digits)) return `234${digits.slice(1)}`
  return digits.length >= 10 ? digits : ''
}

export async function POST(req: Request) {
  const raw = await req.text()
  if (!signatureValid(raw, req.headers.get('x-paystack-signature'))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(raw) as { event?: string; data?: Charge }
  const charge = event.data
  if (event.event !== 'charge.success' || !charge) return NextResponse.json({ ok: true })

  const to = teamInbox(process.env.ORDER_ALERT_EMAIL)
  if (!to) return NextResponse.json({ ok: true, emailed: false })

  const meta = (typeof charge.metadata === 'string' ? JSON.parse(charge.metadata || '{}') : charge.metadata ?? {}) as OrderMeta
  const c = meta.customer ?? {}
  const lines: LineInput[] = (meta.items ?? [])
    .filter(i => isProductId(i.id) && Number.isInteger(i.quantity))
    .map(i => ({ id: i.id as LineInput['id'], quantity: i.quantity as number }))
  const totals = cartTotals(lines)
  const naira = (n: number) => formatMoney(n, 'NGN')
  const paid = charge.amount / 100
  const name = [c.firstName, c.lastName].filter(Boolean).join(' ') || 'A customer'
  const wa = whatsappNumber(c.phone)

  const itemRows = lines
    .map(l => {
      const p = PRODUCTS[l.id]
      return `<tr><td>${l.quantity} x</td><td>${escapeHtml(`${p.name} ${p.size}`)}</td><td align="right">${naira(p.price * l.quantity)}</td></tr>`
    })
    .join('')

  const html = `
<div style="font-family:Arial,sans-serif;color:#3B1F10;max-width:560px">
  <h2 style="font-family:Georgia,serif;color:#3B1F10;margin-bottom:4px">New paid order</h2>
  <p style="margin-top:0;color:#8A4B1F">${escapeHtml(name)} paid ${naira(paid)}. Reference ${escapeHtml(charge.reference)}.</p>
  <h3 style="font-family:Georgia,serif">Jars</h3>
  <table cellpadding="6" style="border-collapse:collapse;font-size:14px;width:100%">${itemRows}
    ${totals.discount > 0 ? `<tr><td></td><td>Bulk saving (${(totals.tier?.discount ?? 0) * 100}%)</td><td align="right">-${naira(totals.discount)}</td></tr>` : ''}
    <tr><td></td><td>Delivery to ${escapeHtml(meta.delivery_area ?? '')}</td><td align="right">${naira(meta.delivery_fee ?? 0)}</td></tr>
    <tr><td></td><td><strong>Total paid</strong></td><td align="right"><strong>${naira(paid)}</strong></td></tr>
  </table>
  <h3 style="font-family:Georgia,serif">Deliver to</h3>
  ${detailsTable([
    ['Name', name],
    ['Phone', c.phone ?? ''],
    ['Email', c.email ?? charge.customer?.email ?? ''],
    ['Address', [c.address, c.city, c.region].filter(Boolean).join(', ')],
    ['Paid at', charge.paid_at ? new Date(charge.paid_at).toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }) : ''],
  ])}
  ${wa ? `<p><a href="https://wa.me/${wa}" style="color:#C41E3A">Message ${escapeHtml(c.firstName || 'the customer')} on WhatsApp</a></p>` : ''}
</div>`

  const sent = await sendEmail({
    to,
    replyTo: c.email || charge.customer?.email,
    subject: `New order ${charge.reference}: ${naira(paid)} from ${name}`,
    html,
  })
  // A failed send returns an error so Paystack retries the alert later
  if (!sent) return NextResponse.json({ error: 'Alert email failed' }, { status: 502 })
  return NextResponse.json({ ok: true, emailed: true })
}
