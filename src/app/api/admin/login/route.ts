import { NextResponse } from 'next/server'
import { adminConfigured, newSession, passwordMatches, sameOrigin, SESSION_COOKIE } from '@/lib/admin-auth'

// Slow down password guessing: a few tries per address every 15 minutes
const attempts = new Map<string, { count: number; since: number }>()
const WINDOW = 15 * 60 * 1000
const LIMIT = 8

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
  if (!adminConfigured()) {
    return NextResponse.json({ error: 'The dashboard password has not been set up yet.' }, { status: 503 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const entry = attempts.get(ip)
  if (entry && now - entry.since < WINDOW && entry.count >= LIMIT) {
    return NextResponse.json({ error: 'Too many attempts. Please wait 15 minutes and try again.' }, { status: 429 })
  }

  const { password } = (await req.json().catch(() => ({}))) as { password?: unknown }
  if (!passwordMatches(password)) {
    const fresh = !entry || now - entry.since >= WINDOW
    attempts.set(ip, { count: fresh ? 1 : entry.count + 1, since: fresh ? now : entry.since })
    await new Promise(r => setTimeout(r, 600))
    return NextResponse.json({ error: 'That password is not right.' }, { status: 401 })
  }

  attempts.delete(ip)
  const session = newSession()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: session.expires,
  })
  return res
}

export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(SESSION_COOKIE)
  return res
}
