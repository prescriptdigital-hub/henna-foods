'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { Metadata } from 'next'

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  return (
    <section className="section-padding bg-cream">
      <div className="container-henna">
        <div className="mb-10">
          <h1 className="font-heading text-4xl font-semibold text-chocolate mb-2">Your Cart</h1>
          <p className="font-body text-sm text-chocolate/50">
            {totalItems === 0 ? 'Your basket is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </p>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-20 bg-ivory rounded-3xl border border-gold/20">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.25" className="mx-auto mb-5 opacity-50">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h2 className="font-heading text-2xl font-semibold text-chocolate mb-3">
              Your basket is waiting
            </h2>
            <p className="font-body text-sm text-chocolate/50 mb-8">for something delicious.</p>
            <Link href="/shop" className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {state.items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-5 p-5 bg-ivory rounded-2xl border border-gold/20 shadow-card"
                >
                  <div
                    className="w-24 h-24 rounded-xl shrink-0"
                    style={{
                      background: item.id.includes('chinchin')
                        ? 'linear-gradient(145deg, #FFF3D8, #F4C430, #8A4B1F)'
                        : 'linear-gradient(145deg, #FBE6C4, #D4A574, #4B2413)',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-chocolate">{item.name}</h3>
                    <p className="font-body text-sm text-chocolate/50 mt-0.5">£{item.price.toFixed(2)} each</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-chocolate hover:bg-gold/10 transition-colors text-lg"
                      >
                        -
                      </button>
                      <span className="font-body text-sm text-chocolate font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-chocolate hover:bg-gold/10 transition-colors text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-chocolate/30 hover:text-rose-red transition-colors p-1"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                    <span className="font-heading text-xl font-semibold text-chocolate">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-ivory rounded-2xl border border-gold/20 shadow-card p-6 sticky top-28">
                <h2 className="font-heading text-xl font-semibold text-chocolate mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm text-chocolate/70">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-chocolate/70">
                    <span>Shipping</span>
                    <span className="text-henna-green font-semibold">Calculated at checkout</span>
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t border-gold/20 mb-6">
                  <span className="font-heading text-lg font-semibold text-chocolate">Total</span>
                  <span className="font-heading text-2xl font-semibold text-chocolate">£{totalPrice.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="btn-primary w-full justify-center mb-3">
                  Proceed to Checkout
                </Link>
                <Link href="/shop" className="btn-secondary w-full justify-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
