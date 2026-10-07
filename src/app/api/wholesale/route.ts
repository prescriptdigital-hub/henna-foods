import { NextResponse } from 'next/server'

// Wholesale enquiries are emailed through Resend (https://resend.com) when
// RESEND_API_KEY and WHOLESALE_EMAIL_TO are set. Without them the form falls
// back to opening the customer's own email app.

const text = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const escape = (s: string) => s.replace(/[&<>"']/g, ch => `&#${ch.charCodeAt(0)};`)

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>
  const enquiry = {
    name: text(b.name, 120),
    business: text(b.business, 160),
    email: text(b.email, 160),
    phone: text(b.phone, 40),
    type: text(b.type, 60),
    cookies: text(b.cookies, 20),
    chinchin: text(b.chinchin, 20),
    date: text(b.date, 40),
    location: text(b.location, 160),
    message: text(b.message, 3000),
  }
  if (!enquiry.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return NextResponse.json({ error: 'Please add your name and a valid email.' }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.WHOLESALE_EMAIL_TO
  if (!key || !to) {
    return NextResponse.json({ fallback: true }, { status: 503 })
  }

  const rows: [string, string][] = [
    ['Name', enquiry.name],
    ['Business', enquiry.business],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['Order type', enquiry.type],
    ["Bukkie's Cookies (jars)", enquiry.cookies],
    ['Richie Chinchin (jars)', enquiry.chinchin],
    ['Needed by', enquiry.date],
    ['Delivery location', enquiry.location],
    ['Message', enquiry.message],
  ]
  const html = `<h2>New wholesale enquiry</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${escape(k)}</strong></td><td>${escape(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? 'Henna Foods <onboarding@resend.dev>',
      to: to.split(',').map(s => s.trim()),
      reply_to: enquiry.email,
      subject: `Wholesale enquiry: ${enquiry.business || enquiry.name}`,
      html,
    }),
  })
  if (!res.ok) {
    console.error('Resend failed', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ fallback: true }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
