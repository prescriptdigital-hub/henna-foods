import { NextResponse } from 'next/server'
import { detailsTable, sendEmail, teamInbox, validEmail } from '@/lib/email'

const text = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>
  // Hidden field that people never fill in; bots usually do
  if (text(b.website)) return NextResponse.json({ ok: true })

  const msg = { name: text(b.name, 120), email: text(b.email, 160), subject: text(b.subject, 160), message: text(b.message, 4000) }
  if (!msg.name || !validEmail(msg.email) || !msg.message) {
    return NextResponse.json({ error: 'Please add your name, a valid email and your message.' }, { status: 400 })
  }

  const to = teamInbox()
  if (!to) return NextResponse.json({ fallback: true }, { status: 503 })

  const sent = await sendEmail({
    to,
    replyTo: msg.email,
    subject: `Website message: ${msg.subject || msg.name}`,
    html: `<h2>New message from the website</h2>${detailsTable([
      ['Name', msg.name],
      ['Email', msg.email],
      ['Subject', msg.subject],
      ['Message', msg.message],
    ])}`,
  })
  if (!sent) return NextResponse.json({ fallback: true }, { status: 502 })
  return NextResponse.json({ ok: true })
}
