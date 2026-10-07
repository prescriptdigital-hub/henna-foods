'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import OrderTotals from '@/components/OrderTotals'
import { cartTotals, chargeCurrencyFor, formatMoney } from '@/lib/catalog'

const USD_ENABLED = process.env.NEXT_PUBLIC_PAYSTACK_USD_ENABLED === 'true'

const countries = ['Nigeria', 'Ghana', 'United Kingdom', 'United States', 'Canada', 'Other']

export default function CheckoutPage() {
  const { state, lines } = useCart()
  const { currency, format } = useCurrency()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', region: '', country: 'Nigeria',
  })
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  const chargeCurrency = chargeCurrencyFor(currency, USD_ENABLED)
  const chargeTotal = cartTotals(state.items, chargeCurrency).total
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPaying(true)
    try {
      const res = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: state.items, currency, customer: form }),
      })
      const data = await res.json()
      if (!res.ok || !data.authorizationUrl) throw new Error(data.error ?? 'Payment could not start.')
      // Hand over to Paystack's secure payment page; it returns to /thank-you.
      window.location.href = data.authorizationUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment could not start.')
      setPaying(false)
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

  const label = 'font-body text-xs font-semibold text-chocolate/60 mb-1.5 block'

  return (
    <section className="section-padding bg-cream">
      <div className="container-henna">
        <div className="mb-8">
          <p className="font-body text-sm text-chocolate/50 italic mb-1">Almost time to enjoy your Henna treats.</p>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-chocolate">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-ivory rounded-2xl border border-gold/20 shadow-card p-6 lg:p-8 space-y-5">
              <h2 className="font-heading text-xl font-semibold text-chocolate mb-6">Delivery details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={label}>First name</label>
                  <input id="firstName" type="text" value={form.firstName} onChange={set('firstName')} className="input-henna" required autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="lastName" className={label}>Last name</label>
                  <input id="lastName" type="text" value={form.lastName} onChange={set('lastName')} className="input-henna" required autoComplete="family-name" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={label}>Email</label>
                  <input id="email" type="email" value={form.email} onChange={set('email')} className="input-henna" required autoComplete="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="phone" className={label}>Phone</label>
                  <input id="phone" type="tel" value={form.phone} onChange={set('phone')} className="input-henna" required autoComplete="tel" placeholder="+234 800 000 0000" />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={label}>Delivery address</label>
                <input id="address" type="text" value={form.address} onChange={set('address')} className="input-henna" required autoComplete="street-address" placeholder="House number and street" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className={label}>City</label>
                  <input id="city" type="text" value={form.city} onChange={set('city')} className="input-henna" required autoComplete="address-level2" />
                </div>
                <div>
                  <label htmlFor="region" className={label}>State / region</label>
                  <input id="region" type="text" value={form.region} onChange={set('region')} className="input-henna" autoComplete="address-level1" />
                </div>
                <div>
                  <label htmlFor="country" className={label}>Country</label>
                  <select id="country" value={form.country} onChange={set('country')} className="input-henna">
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-gold/30 bg-cream p-5 mt-2">
                <div className="flex items-center gap-3 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <h3 className="font-heading text-base font-semibold text-chocolate">Secure payment with Paystack</h3>
                </div>
                <p className="font-body text-xs text-chocolate/60 leading-relaxed">
                  Pay by card, bank transfer, USSD or bank account on Paystack&apos;s secure page. We never see or store your card details.
                </p>
                {chargeCurrency !== currency && (
                  <p className="font-body text-xs text-chocolate/75 mt-3">
                    Paystack will charge this order in naira: <strong className="text-chocolate">{formatMoney(chargeTotal, chargeCurrency)}</strong>.
                  </p>
                )}
              </div>

              {error && (
                <p role="alert" className="font-body text-sm text-rose-red bg-rose-red/5 border border-rose-red/20 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                <Link href="/cart" className="btn-secondary flex-1 justify-center">
                  Back to cart
                </Link>
                <button type="submit" disabled={paying} className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-wait">
                  {paying ? 'Opening Paystack...' : `Pay ${formatMoney(chargeTotal, chargeCurrency)}`}
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="bg-ivory rounded-2xl border border-gold/20 shadow-card p-6 sticky top-28">
              <h2 className="font-heading text-lg font-semibold text-chocolate mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {lines.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-cream">
                        <Image src={item.product.image} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-semibold text-chocolate leading-tight">{item.product.name}</p>
                        <p className="font-body text-xs text-chocolate/40">x{item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-body text-sm font-semibold text-chocolate shrink-0">{format(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gold/20">
                <OrderTotals size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
