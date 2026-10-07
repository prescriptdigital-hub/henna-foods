import { NextResponse } from 'next/server'
import { paystackConfigured, paystackRequest } from '@/lib/paystack'

type Transaction = {
  status: string
  reference: string
  amount: number
  currency: string
  paid_at: string | null
  customer: { email: string }
}

export async function GET(req: Request) {
  const reference = new URL(req.url).searchParams.get('reference') ?? ''
  if (!/^[A-Za-z0-9._=-]{1,100}$/.test(reference)) {
    return NextResponse.json({ error: 'Invalid payment reference.' }, { status: 400 })
  }
  if (!paystackConfigured()) {
    return NextResponse.json({ error: 'Online payment is not switched on yet.' }, { status: 503 })
  }

  try {
    const tx = await paystackRequest<Transaction>(`/transaction/verify/${encodeURIComponent(reference)}`)
    return NextResponse.json({
      status: tx.status, // 'success' | 'failed' | 'abandoned' | ...
      reference: tx.reference,
      amount: tx.amount / 100,
      currency: tx.currency,
      paidAt: tx.paid_at,
      email: tx.customer?.email,
    })
  } catch (err) {
    console.error('Paystack verify failed', err)
    return NextResponse.json({ error: 'We could not confirm this payment yet.' }, { status: 502 })
  }
}
