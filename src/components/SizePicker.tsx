'use client'

import { PRODUCT_LINES, PRODUCTS, type ProductId, type ProductLine } from '@/lib/catalog'
import { useCurrency } from '@/context/CurrencyContext'

type Props = {
  line: ProductLine
  value: ProductId
  onChange: (id: ProductId) => void
  compact?: boolean
}

// Jar size choice, each option showing its price
export default function SizePicker({ line, value, onChange, compact = false }: Props) {
  const { currency, format } = useCurrency()

  return (
    <div role="radiogroup" aria-label="Jar size" className="flex flex-wrap gap-2">
      {PRODUCT_LINES[line].map(id => {
        const p = PRODUCTS[id]
        const active = id === value
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(id)}
            className={`rounded-pill border font-body transition-colors ${
              compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
            } ${active ? 'bg-chocolate text-ivory border-chocolate' : 'border-gold/40 text-chocolate hover:bg-gold/10'}`}
          >
            <span className="font-semibold">{p.size}</span>
            <span className={active ? 'text-ivory/70' : 'text-chocolate/55'}> · {format(p.prices[currency])}</span>
          </button>
        )
      })}
    </div>
  )
}
