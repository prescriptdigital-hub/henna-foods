'use client'

import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'

export default function OrderTotals({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { totalItems, subtotal, discount, discountRate, totalPrice } = useCart()
  const { format } = useCurrency()

  return (
    <div>
      <div className="space-y-2.5 mb-4">
        <div className="flex justify-between font-body text-sm text-chocolate/70">
          <span>Subtotal ({totalItems} jar{totalItems !== 1 ? 's' : ''})</span>
          <span>{format(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-body text-sm text-henna-green font-semibold">
            <span>Bulk saving ({discountRate * 100}%)</span>
            <span>-{format(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-body text-sm text-chocolate/70">
          <span>Delivery</span>
          <span className="text-chocolate/55">Confirmed after ordering</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline pt-4 border-t border-gold/20">
        <span className="font-heading text-lg font-semibold text-chocolate">Total</span>
        <span className={`font-heading font-semibold text-chocolate ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>
          {format(totalPrice)}
        </span>
      </div>
    </div>
  )
}
