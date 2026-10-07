'use client'

import Link from 'next/link'
import { BULK_TIERS, nextTier, WHOLESALE_MIN_JARS } from '@/lib/catalog'
import { useCart } from '@/context/CartContext'

// Tier ladder for product pages: shows what each jar count unlocks.
export function BulkTierTable() {
  const { totalItems } = useCart()

  return (
    <div className="rounded-xl border border-gold/30 bg-cream p-5">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="font-heading text-base font-semibold text-chocolate">Buy more, share more</h3>
        <span className="font-body text-[11px] text-chocolate/45">Mix cookies and chinchin</span>
      </div>
      <p className="font-body text-xs text-chocolate/55 mb-4">The more jars in your basket, the more you save on the whole order.</p>
      <div className="grid grid-cols-3 gap-2">
        {BULK_TIERS.map(t => {
          const active = totalItems >= t.minJars
          return (
            <div
              key={t.minJars}
              className={`rounded-lg border px-2 py-3 text-center transition-colors ${
                active ? 'border-gold bg-gold/15' : 'border-gold/25 bg-ivory'
              }`}
            >
              <div className="font-heading text-lg font-semibold text-chocolate leading-none">{t.discount * 100}%</div>
              <div className="font-body text-[11px] text-chocolate/60 mt-1">{t.minJars}+ jars</div>
            </div>
          )
        })}
      </div>
      <p className="font-body text-xs text-chocolate/55 mt-4">
        Ordering {WHOLESALE_MIN_JARS}+ jars for an event, shop or office?{' '}
        <Link href="/wholesale" className="text-rose-red font-semibold underline underline-offset-2 hover:text-rose-red-dark">
          Ask for a wholesale quote
        </Link>
      </p>
    </div>
  )
}

// Short nudge for the cart: progress to the next tier.
export function BulkNudge() {
  const { totalItems, discountRate } = useCart()
  const next = nextTier(totalItems)

  if (totalItems === 0) return null

  return (
    <div className="rounded-xl bg-gold/10 border border-gold/30 px-4 py-3 font-body text-xs text-chocolate/75">
      {next ? (
        <>
          Add <strong className="text-chocolate">{next.minJars - totalItems} more jar{next.minJars - totalItems !== 1 ? 's' : ''}</strong> to save{' '}
          <strong className="text-chocolate">{next.discount * 100}%</strong> on your whole order.
          {discountRate > 0 && <> You&apos;re already saving {discountRate * 100}%.</>}
        </>
      ) : (
        <>
          You&apos;re saving our best bulk rate of <strong className="text-chocolate">{discountRate * 100}%</strong>.{' '}
          {totalItems >= WHOLESALE_MIN_JARS ? (
            <Link href="/wholesale" className="text-rose-red font-semibold underline underline-offset-2">Talk to us about wholesale pricing.</Link>
          ) : (
            <>Need {WHOLESALE_MIN_JARS}+ jars? <Link href="/wholesale" className="text-rose-red font-semibold underline underline-offset-2">Get a wholesale quote.</Link></>
          )}
        </>
      )}
    </div>
  )
}
