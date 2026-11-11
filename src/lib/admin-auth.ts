import 'server-only'
import { createHash, createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

// One shared dashboard password, set as ADMIN_PASSWORD in Vercel.
// A signed cookie keeps the admin logged in; changing the password logs everyone out.

export const SESSION_COOKIE = 'henna_admin'
const SESSION_DAYS = 7

export const adminConfigured = () => (process.env.ADMIN_PASSWORD ?? '').length >= 8

const sha256 = (s: string) => createHash('sha256').update(s).digest()

function signingKey() {
  return sha256(`henna-admin:${process.env.ADMIN_PASSWORD}:${process.env.ADMIN_SESSION_SECRET ?? ''}`)
}

const sign = (payload: string) => createHmac('sha256', signingKey()).update(payload).digest('hex')

export function passwordMatches(attempt: unknown) {
  if (!adminConfigured() || typeof attempt !== 'string') return false
  return timingSafeEqual(sha256(attempt), sha256(process.env.ADMIN_PASSWORD!))
}

export function newSession() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  return { value: `${expires}.${sign(String(expires))}`, expires: new Date(expires) }
}

function sessionValid(value: string | undefined) {
  if (!adminConfigured() || !value) return false
  const [expires, signature] = value.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  const expected = Buffer.from(sign(expires))
  const given = Buffer.from(signature)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export async function isAdmin() {
  return sessionValid((await cookies()).get(SESSION_COOKIE)?.value)
}

// Changes must come from this site's own pages
export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).host === new URL(req.url).host || new URL(origin).host === req.headers.get('host')
  } catch {
    return false
  }
}
