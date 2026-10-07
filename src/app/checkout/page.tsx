'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<'details' | 'payment'>('details')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postcode: '', country: 'United Kingdom',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'details') {
      setStep('payment')
    } else {
      clearCart()
      router.push('/thank-you')
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="section-padding bg-cream text-center">
        <div className="container-henna max-w-md mx-auto">
          <h1 className="font-heading text-3xl font-semibold text-chocolate mb-4">Your cart is empty</h1>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-henna">
        <div className="mb-8">
          <p className="font-body text-sm text-chocolate/50 italic mb-1">Almost time to enjoy your Henna treats.</p>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-chocolate">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              {(['details', 'payment'] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  {i > 0 && <div className="w-12 h-px bg-gold/30" />}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-bold transition-colors ${
                        step === s ? 'bg-chocolate text-white' : step === 'payment' && s === 'details' ? 'bg-gold text-chocolate' : 'bg-gold/20 text-chocolate/50'
                      }`}
                    >
                      {step === 'payment' && s === 'details' ? '✓' : i + 1}
                    </div>
                    <span className={`font-body text-sm capitalize ${step === s ? 'font-semibold text-chocolate' : 'text-chocolate/50'}`}>
                      {s}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-ivory rounded-2xl border border-gold/20 shadow-card p-6 lg:p-8">
              {step === 'details' ? (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-semibold text-chocolate mb-6">Delivery details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">First name</label>
                      <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="input-henna" required placeholder="First name"/>
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Last name</label>
                      <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="input-henna" required placeholder="Last name"/>
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-henna" required placeholder="your@email.com"/>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Address</label>
                    <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-henna" required placeholder="Street address"/>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">City</label>
                      <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="input-henna" required placeholder="City"/>
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Postcode</label>
                      <input type="text" value={form.postcode} onChange={e => setForm({...form, postcode: e.target.value})} className="input-henna" required placeholder="Postcode"/>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center mt-2">
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-semibold text-chocolate mb-6">Payment</h2>
                  <div>
                    <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Card number</label>
                    <input type="text" className="input-henna" placeholder="1234 5678 9012 3456" maxLength={19}/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Expiry</label>
                      <input type="text" className="input-henna" placeholder="MM / YY" maxLength={7}/>
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">CVV</label>
                      <input type="text" className="input-henna" placeholder="123" maxLength={4}/>
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-chocolate/60 mb-1.5 block">Name on card</label>
                    <input type="text" className="input-henna" placeholder="As it appears on your card"/>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep('details')} className="btn-secondary flex-1 justify-center">
                      Back
                    </button>
                    <button type="submit" className="btn-primary flex-1 justify-center">
                      Place Order · £{totalPrice.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div>
            <div className="bg-ivory rounded-2xl border border-gold/20 shadow-card p-6 sticky top-28">
              <h2 className="font-heading text-lg font-semibold text-chocolate mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {state.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg shrink-0"
                        style={{ background: item.id.includes('chinchin') ? 'linear-gradient(145deg, #FFF3D8, #F4C430)' : 'linear-gradient(145deg, #FBE6C4, #A65F2B)' }}
                      />
                      <div>
                        <p className="font-body text-xs font-semibold text-chocolate leading-tight">{item.name}</p>
                        <p className="font-body text-xs text-chocolate/40">x{item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-body text-sm font-semibold text-chocolate shrink-0">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gold/20">
                <div className="flex justify-between font-heading text-lg font-semibold text-chocolate">
                  <span>Total</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
