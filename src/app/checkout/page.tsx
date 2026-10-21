'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import OrderTotals from '@/components/OrderTotals'
import { cartTotals, formatMoney } from '@/lib/catalog'
import { DELIVERY_AREAS, DELIVERY_COUNTRY, NOT_LISTED, deliveryAreaById } from '@/lib/delivery'
import { CONTACT } from '@/lib/site'

const countries = [DELIVERY_COUNTRY, 'Ghana', 'United Kingdom', 'United States', 'Canada', 'Other']

export default function CheckoutPage() {
  const { state, lines } = useCart()
  const { currency } = useCurrency()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    country: DELIVERY_COUNTRY, area: '', address: '', city: '', region: '',
  })
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value })

  // Delivery: a listed Lagos area with a fee can pay online; anything else gets a quote
  const inNigeria = form.country === DELIVERY_COUNTRY
  const area = inNigeria ? deliveryAreaById(form.area) : undefined
  const needsQuote = !inNigeria || form.area === NOT_LISTED || (area !== undefined && area.fee === null)
  const deliveryFee = needsQuote ? null : area?.fee
  const canPay = !needsQuote && typeof deliveryFee === 'number'
  const orderTotal = cartTotals(state.items).total + (typeof deliveryFee === 'number' ? deliveryFee : 0)

  const quotePlace = !inNigeria
    ? [form.city, form.country].filter(Boolean).join(', ')
    : area?.name ?? 'an area not on your list'
  const quoteText = `Hello Henna Foods, I'd like a delivery quote to ${quotePlace} for: ${lines
    .map(l => `${l.quantity} x ${l.product.name}`)
    .join(', ')}.`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canPay) return
    setError('')
    setPaying(true)
    try {
      const res = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          currency,
          deliveryAreaId: form.area,
          customer: { ...form, city: area?.name ?? form.city, region: 'Lagos' },
        }),
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className={label}>Country</label>
                  <select id="country" value={form.country} onChange={set('country')} className="input-henna" autoComplete="country-name">
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {inNigeria ? (
                  <div>
                    <label htmlFor="area" className={label}>Delivery area</label>
                    <select id="area" value={form.area} onChange={set('area')} className="input-henna" required>
                      <option value="" disabled>Choose your area</option>
                      {DELIVERY_AREAS.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.name} · {a.fee === null ? 'quote on request' : formatMoney(a.fee, 'NGN')}
                        </option>
                      ))}
                      <option value={NOT_LISTED}>My area is not listed</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="city" className={label}>City</label>
                    <input id="city" type="text" value={form.city} onChange={set('city')} className="input-henna" autoComplete="address-level2" />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="address" className={label}>Delivery address</label>
                <input id="address" type="text" value={form.address} onChange={set('address')} className="input-henna" required autoComplete="street-address" placeholder="House number, street and nearest landmark" />
              </div>

              {needsQuote && (form.area || !inNigeria) ? (
                <div className="rounded-xl border border-gold/40 bg-gold/10 p-5">
                  <h3 className="font-heading text-base font-semibold text-chocolate mb-1.5">
                    {inNigeria ? "We'll quote your delivery" : 'Ordering from outside Nigeria?'}
                  </h3>
                  <p className="font-body text-sm text-chocolate/70 leading-relaxed mb-4">
                    {inNigeria
                      ? `Delivery to ${area?.name ?? 'your area'} is priced on request. Send us your order and we'll reply with the delivery fee and a payment link.`
                      : "We deliver across Lagos today. Tell us where you are and we'll arrange international delivery with you directly."}
                  </p>
                  {CONTACT.whatsapp ? (
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(quoteText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Get a quote on WhatsApp
                    </a>
                  ) : (
                    <Link href="/contact" className="btn-primary">Ask us for a quote</Link>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-gold/30 bg-cream p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <h3 className="font-heading text-base font-semibold text-chocolate">Secure payment with Paystack</h3>
                  </div>
                  <p className="font-body text-xs text-chocolate/60 leading-relaxed">
                    Pay by card, bank transfer, USSD or bank account on Paystack&apos;s secure page. We never see or store your card details.
                    {currency !== 'NGN' && ' Your order is charged in naira.'}
                  </p>
                </div>
              )}

              {error && (
                <p role="alert" className="font-body text-sm text-rose-red bg-rose-red/5 border border-rose-red/20 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                <Link href="/cart" className="btn-secondary flex-1 justify-center">
                  Back to cart
                </Link>
                <button
                  type="submit"
                  disabled={paying || !canPay}
                  className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paying
                    ? 'Opening Paystack...'
                    : canPay
                      ? `Pay ${formatMoney(orderTotal, 'NGN')}`
                      : needsQuote && (form.area || !inNigeria)
                        ? 'Delivery quote needed'
                        : 'Choose your delivery area'}
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
                    <span className="font-body text-sm font-semibold text-chocolate shrink-0">
                      {formatMoney(item.product.price * item.quantity, 'NGN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gold/20">
                <OrderTotals
                  size="sm"
                  currency="NGN"
                  deliveryFee={needsQuote && (form.area || !inNigeria) ? null : (deliveryFee ?? undefined)}
                  deliveryLabel={area?.name}
                  pendingText="Choose your area"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
