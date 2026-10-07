'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatMoney, isCurrency } from '@/lib/catalog'

type Result =
  | { kind: 'none' }
  | { kind: 'checking' }
  | { kind: 'paid'; reference: string; amount: number; currency: string; email?: string }
  | { kind: 'unpaid'; reference: string; message: string }

export default function OrderStatus() {
  const params = useSearchParams()
  // Paystack returns with ?reference=...&trxref=...
  const reference = params.get('reference') ?? params.get('trxref')
  const { clearCart } = useCart()
  const [result, setResult] = useState<Result>(reference ? { kind: 'checking' } : { kind: 'none' })

  useEffect(() => {
    if (!reference) return
    let cancelled = false
    fetch(`/api/checkout/verify?reference=${encodeURIComponent(reference)}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        if (data.status === 'success') {
          clearCart()
          setResult({ kind: 'paid', reference, amount: data.amount, currency: data.currency, email: data.email })
        } else {
          setResult({
            kind: 'unpaid',
            reference,
            message: data.error ?? 'This payment was not completed. Your basket is saved, so you can try again.',
          })
        }
      })
      .catch(() => {
        if (!cancelled) setResult({ kind: 'unpaid', reference, message: 'We could not confirm this payment yet. Please contact us with your reference.' })
      })
    return () => {
      cancelled = true
    }
    // clearCart is stable in behaviour; run once per reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference])

  if (result.kind === 'checking') {
    return (
      <div className="py-6">
        <div className="w-10 h-10 mx-auto mb-5 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        <p className="font-heading text-xl text-chocolate">Confirming your payment...</p>
      </div>
    )
  }

  if (result.kind === 'unpaid') {
    return (
      <>
        <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-chocolate leading-tight mb-4">
          Payment not completed
        </h1>
        <p className="font-body text-base text-chocolate/65 leading-relaxed mb-3 max-w-md mx-auto">{result.message}</p>
        <p className="font-body text-xs text-chocolate/45 mb-10">Reference: {result.reference}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/checkout" className="btn-primary">Try again</Link>
          <Link href="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-chocolate leading-tight mb-4">
        Order Confirmed.
      </h1>
      <p className="font-heading text-xl font-medium italic mb-6" style={{ color: '#A65F2B' }}>
        Thank you for choosing Henna Foods.
      </p>
      <p className="font-body text-base text-chocolate/65 leading-relaxed mb-4 max-w-md mx-auto">
        Your order was made with love. We are preparing your treats with the same care that goes into every Henna Foods product.
      </p>
      {result.kind === 'paid' && (
        <div className="inline-block text-left rounded-xl border border-gold/30 bg-ivory px-6 py-4 mb-6">
          <p className="font-body text-sm text-chocolate">
            Paid: <strong>{isCurrency(result.currency) ? formatMoney(result.amount, result.currency) : `${result.amount} ${result.currency}`}</strong>
          </p>
          <p className="font-body text-xs text-chocolate/50 mt-1">Reference: {result.reference}</p>
        </div>
      )}
      <p className="font-body text-sm text-chocolate/50 mb-10">
        {result.kind === 'paid' && result.email
          ? `A receipt is on its way to ${result.email}. We'll be in touch to arrange delivery.`
          : "We'll be in touch shortly to arrange delivery."}
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/shop" className="btn-primary">Shop Again</Link>
        <Link href="/" className="btn-secondary">Return Home</Link>
      </div>
    </>
  )
}
