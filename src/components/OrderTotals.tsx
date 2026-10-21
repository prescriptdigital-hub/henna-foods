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
  const { format: formatShown, currency: shown } = useCurrency()
  const { jars, subtotal, discount, tier, total } = cartTotals(state.items)
  const fee = typeof deliveryFee === 'number' ? deliveryFee : 0
  // Amounts are naira; show them in naira when forced (checkout), otherwise in the visitor's currency
  const format = (naira: number) => (override === 'NGN' ? formatMoney(naira, 'NGN') : formatShown(naira))

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
      {override !== 'NGN' && shown !== 'NGN' && (
        <p className="font-body text-[11px] text-chocolate/45 mt-2">
          Converted at today&apos;s exchange rate. Orders are paid in naira: {formatMoney(total + fee, 'NGN')}.
        </p>
      )}
    </div>
  )
}
