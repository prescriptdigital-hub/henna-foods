// Server-only helpers for the Paystack REST API.
// Docs: https://paystack.com/docs/api/transaction/

const PAYSTACK_API = 'https://api.paystack.co'

export function paystackConfigured() {
  return Boolean(process.env.PAYSTACK_SECRET_KEY)
}

export function usdEnabled() {
  return process.env.NEXT_PUBLIC_PAYSTACK_USD_ENABLED === 'true'
}

export async function paystackRequest<T>(path: string, init?: { method?: string; body?: unknown }) {
  const res = await fetch(`${PAYSTACK_API}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  })
  const json = (await res.json().catch(() => null)) as { status: boolean; message: string; data: T } | null
  if (!res.ok || !json?.status) {
    throw new Error(json?.message ?? `Paystack request failed (${res.status})`)
  }
  return json.data
}
