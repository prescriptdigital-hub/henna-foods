'use client'

import Link from 'next/link'
import { BULK_TIERS, nextTier, WHOLESALE_MIN_JARS } from '@/lib/catalog'
import { FEATURES } from '@/lib/site'
import { useCart } from '@/context/CartContext'

const OFFER = BULK_TIERS[0]

// Product page panel: the multi-jar offer and progress towards it.
export function BulkTierTable() {
  const { totalItems } = useCart()
  const reached = totalItems >= OFFER.minJars
  const progress = Math.min(1, totalItems / OFFER.minJars)

  return (
    <div className="rounded-xl border border-gold/30 bg-cream p-5">
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-14 h-14 rounded-full border border-gold/50 bg-ivory flex items-center justify-center">
          <span className="font-heading text-lg font-semibold text-chocolate">{OFFER.discount * 100}%</span>
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold text-chocolate">Buy {OFFER.minJars} jars, save {OFFER.discount * 100}%</h3>
          <p className="font-body text-xs text-chocolate/60 mt-0.5">Mix any sizes of cookies and chinchin. The saving applies to your whole order.</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-1.5 rounded-full bg-gold/15 overflow-hidden">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="font-body text-[11px] text-chocolate/55 mt-1.5">
          {reached
            ? `Your basket has ${totalItems} jars, so you're saving ${OFFER.discount * 100}%.`
            : `${totalItems} of ${OFFER.minJars} jars in your basket`}
        </p>
      </div>
      {FEATURES.wholesale && (
        <p className="font-body text-xs text-chocolate/55 mt-4">
          Ordering {WHOLESALE_MIN_JARS}+ jars for an event, shop or office?{' '}
          <Link href="/wholesale" className="text-rose-red font-semibold underline underline-offset-2 hover:text-rose-red-dark">
            Ask for a wholesale quote
          </Link>
        </p>
      )}
    </div>
  )
}

// Cart nudge: how many more jars unlock the saving.
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
        </>
      ) : (
        <>
          You&apos;re saving <strong className="text-chocolate">{discountRate * 100}%</strong> on this order.
          {FEATURES.wholesale && totalItems >= WHOLESALE_MIN_JARS && (
            <>
              {' '}
              <Link href="/wholesale" className="text-rose-red font-semibold underline underline-offset-2">Talk to us about wholesale pricing.</Link>
            </>
          )}
        </>
      )}
    </div>
  )
}
