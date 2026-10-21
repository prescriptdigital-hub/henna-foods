'use client'

import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { cartTotals, formatMoney, type Currency } from '@/lib/catalog'

type Props = {
  size?: 'sm' | 'md'
  // Show totals in a specific currency instead of the visitor's choice (checkout uses naira).
  currency?: Currency
  // undefined: not chosen yet (cart). null: needs a quote. number: fee in naira.
  deliveryFee?: number | null
  deliveryLabel?: string
  // Text while no delivery option has been chosen yet
  pendingText?: string
}

export default function OrderTotals({ size = 'md', currency: override, deliveryFee, deliveryLabel, pendingText = 'Calculated at checkout' }: Props) {
  const { state } = useCart()
  const { currency: display } = useCurrency()
  const currency = override ?? display
  const { jars, subtotal, discount, tier, total } = cartTotals(state.items, currency)
  const fee = typeof deliveryFee === 'number' && currency === 'NGN' ? deliveryFee : 0
  const format = (n: number) => formatMoney(n, currency)

  return (
    <div>
      <div className="space-y-2.5 mb-4">
        <div className="flex justify-between font-body text-sm text-chocolate/70">
          <span>Subtotal ({jars} jar{jars !== 1 ? 's' : ''})</span>
          <span>{format(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-body text-sm text-henna-green font-semibold">
            <span>Bulk saving ({(tier?.discount ?? 0) * 100}%)</span>
            <span>-{format(discount)}</span>
          </div>
        )}
        <div className="flex justify-between gap-3 font-body text-sm text-chocolate/70">
          <span>Delivery{deliveryLabel ? <span className="text-chocolate/45"> · {deliveryLabel}</span> : null}</span>
          <span className="shrink-0">
            {deliveryFee === undefined
              ? <span className="text-chocolate/55">{pendingText}</span>
              : deliveryFee === null
                ? <span className="text-chocolate/55">Quote on request</span>
                : format(fee)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-baseline pt-4 border-t border-gold/20">
        <span className="font-heading text-lg font-semibold text-chocolate">Total</span>
        <span className={`font-heading font-semibold text-chocolate ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>
          {format(total + fee)}
        </span>
      </div>
    </div>
  )
}
