'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { BulkNudge } from './BulkSavings'

export default function CartSummary() {
  const { state, lines, removeItem, updateQuantity, closeCart, totalItems, totalPrice, discount } = useCart()
  const { format } = useCurrency()

  if (!state.isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
        onClick={closeCart}
      />
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl"
        style={{ backgroundColor: '#FFF9EF' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <div>
            <h2 className="font-heading text-xl font-semibold text-chocolate">Your Cart</h2>
            <p className="font-body text-xs text-chocolate/50 mt-0.5">
              {totalItems === 0 ? 'Empty' : `${totalItems} jar${totalItems !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gold/10 transition-colors"
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B1F10" strokeWidth="1.75" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-12">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.25" className="mb-4 opacity-60">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="font-heading text-lg font-medium text-chocolate mb-1">Your basket is waiting</p>
              <p className="font-body text-sm text-chocolate/50">for something delicious.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-primary mt-6 text-xs px-5 py-2.5"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map(item => (
                <li key={item.id} className="flex gap-4 p-4 bg-cream rounded-xl border border-gold/15">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream shrink-0">
                    <Image src={item.product.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-semibold text-chocolate truncate">{item.product.name}</p>
                    <p className="font-body text-xs text-chocolate/50 mt-0.5">{format(item.unitPrice)} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gold/40 flex items-center justify-center text-chocolate/70 hover:bg-gold/10 text-sm font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="font-body text-sm text-chocolate w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gold/40 flex items-center justify-center text-chocolate/70 hover:bg-gold/10 text-sm font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-chocolate/30 hover:text-rose-red transition-colors"
                      aria-label="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                    <span className="font-heading text-base font-semibold text-chocolate">
                      {format(item.lineTotal)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-gold/20">
            <div className="mb-3"><BulkNudge /></div>
            {discount > 0 && (
              <div className="flex items-center justify-between font-body text-xs text-henna-green font-semibold mb-1">
                <span>Bulk saving</span>
                <span>-{format(discount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-sm text-chocolate/60">Total</span>
              <span className="font-heading text-lg font-semibold text-chocolate">{format(totalPrice)}</span>
            </div>
            <p className="font-body text-xs text-chocolate/40 mb-4">Delivery confirmed after ordering</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-secondary w-full justify-center mt-2"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
