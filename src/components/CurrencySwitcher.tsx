'use client'

import { CURRENCIES } from '@/lib/catalog'
import { useCurrency } from '@/context/CurrencyContext'

export default function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency()

  return (
    <div
      role="radiogroup"
      aria-label="Currency"
      className={`inline-flex items-center rounded-pill border border-gold/40 p-0.5 ${className}`}
    >
      {CURRENCIES.map(c => (
        <button
          key={c.code}
          role="radio"
          aria-checked={currency === c.code}
          title={c.label}
          onClick={() => setCurrency(c.code)}
          className={`font-body text-xs font-semibold rounded-pill px-2.5 py-1 transition-colors duration-150 ${
            currency === c.code ? 'bg-chocolate text-ivory' : 'text-chocolate/60 hover:text-chocolate'
          }`}
        >
          {c.symbol}
          <span className="sr-only"> {c.label}</span>
        </button>
      ))}
    </div>
  )
}
