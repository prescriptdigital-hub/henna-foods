import { NextResponse } from 'next/server'
import { addSubscriber, escapeHtml, sendEmail, teamInbox, validEmail } from '@/lib/email'

// Newsletter sign-ups go into the Resend audience when RESEND_AUDIENCE_ID is set,
// otherwise each one is emailed to TEAM_EMAIL.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>
  const email = typeof b.email === 'string' ? b.email.trim().slice(0, 160) : ''
  if (!validEmail(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })

  if (await addSubscriber(email)) return NextResponse.json({ ok: true })

  const to = teamInbox()
  if (!to) return NextResponse.json({ error: 'Sign-ups open very soon. Please try again later.' }, { status: 503 })
  const sent = await sendEmail({
    to,
    subject: 'New newsletter sign-up',
    html: `<p>${escapeHtml(email)} joined the Henna family newsletter from the website.</p>`,
  })
  if (!sent) return NextResponse.json({ error: 'We could not sign you up just now. Please try again.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
