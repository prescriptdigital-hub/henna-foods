import { NextResponse } from 'next/server'
import { FEATURES } from '@/lib/site'
import { detailsTable, sendEmail, teamInbox, validEmail } from '@/lib/email'

// Wholesale enquiries are emailed to WHOLESALE_EMAIL_TO (or TEAM_EMAIL) through
// Resend. Without email set up the form falls back to the customer's email app.

const text = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  if (!FEATURES.wholesale) return NextResponse.json({ error: 'Not found' }, { status: 404 })
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
  if (!enquiry.name || !validEmail(enquiry.email)) {
    return NextResponse.json({ error: 'Please add your name and a valid email.' }, { status: 400 })
  }

  const to = teamInbox(process.env.WHOLESALE_EMAIL_TO)
  if (!to) return NextResponse.json({ fallback: true }, { status: 503 })

  const html = `<h2>New wholesale enquiry</h2>${detailsTable([
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
  ])}`

  const sent = await sendEmail({ to, replyTo: enquiry.email, subject: `Wholesale enquiry: ${enquiry.business || enquiry.name}`, html })
  if (!sent) return NextResponse.json({ fallback: true }, { status: 502 })
  return NextResponse.json({ ok: true })
}
