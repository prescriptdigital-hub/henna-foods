'use client'

import type { ProductId, SizeDoc } from '@/lib/catalog'
import { useCurrency } from '@/context/CurrencyContext'

type Props = {
  sizes: SizeDoc[]
  value: ProductId
  onChange: (id: ProductId) => void
  compact?: boolean
}

// Jar size choice, each option showing its price
export default function SizePicker({ sizes, value, onChange, compact = false }: Props) {
  const { format } = useCurrency()

  return (
    <div role="radiogroup" aria-label="Jar size" className="flex flex-wrap gap-2">
      {sizes.map(s => {
        const active = s.sku === value
        return (
          <button
            key={s.sku}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s.sku)}
            className={`rounded-pill border font-body transition-colors ${
              compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
            } ${active ? 'bg-chocolate text-ivory border-chocolate' : 'border-gold/40 text-chocolate hover:bg-gold/10'}`}
          >
            <span className="font-semibold">{s.label}</span>
            <span className={active ? 'text-ivory/70' : 'text-chocolate/55'}> · {format(s.price)}</span>
          </button>
        )
      })}
    </div>
  )
}
