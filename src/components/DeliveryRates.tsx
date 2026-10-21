'use client'

import { useMemo, useState } from 'react'
import { formatMoney } from '@/lib/catalog'
import { DELIVERY_AREAS } from '@/lib/delivery'

// Searchable list of delivery areas and fees
export default function DeliveryRates() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? DELIVERY_AREAS.filter(a => a.name.toLowerCase().includes(q)) : DELIVERY_AREAS
  }, [query])

  return (
    <div>
      <label htmlFor="delivery-search" className="sr-only">Find your area</label>
      <div className="relative mb-4">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.5" y2="16.5" />
        </svg>
        <input
          id="delivery-search"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Find your area, e.g. Lekki or Ikeja"
          className="input-henna pl-11"
        />
      </div>

      <ul className="max-h-80 overflow-y-auto overscroll-contain rounded-xl border border-gold/20 divide-y divide-gold/10 bg-white/60">
        {results.map(a => (
          <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-2.5 font-body text-sm">
            <span className="text-chocolate">{a.name}</span>
            <span className={a.fee === null ? 'text-chocolate/50 text-xs' : 'text-chocolate font-semibold tabular-nums'}>
              {a.fee === null ? 'Quote on request' : formatMoney(a.fee, 'NGN')}
            </span>
          </li>
        ))}
        {results.length === 0 && (
          <li className="px-4 py-4 font-body text-sm text-chocolate/60">
            We don&apos;t have a set fee for &ldquo;{query}&rdquo; yet. Message us and we&apos;ll quote your delivery.
          </li>
        )}
      </ul>
      <p className="font-body text-xs text-chocolate/45 mt-2">{DELIVERY_AREAS.length} areas across Lagos. Fees are per order.</p>
    </div>
  )
}
