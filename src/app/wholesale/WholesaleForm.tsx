'use client'

import { useState } from 'react'

const CONTACT_EMAIL = 'hello@hennafoods.com'
const orderTypes = ['Wedding or event', 'Retail / stockist', 'Corporate gifting', 'Party or celebration', 'Other']

const empty = {
  name: '', business: '', email: '', phone: '', type: orderTypes[0],
  cookies: '', chinchin: '', date: '', location: '', message: '',
}

export default function WholesaleForm() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value })

  const mailtoHref = () => {
    const body = [
      `Name: ${form.name}`,
      form.business && `Business: ${form.business}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `Order type: ${form.type}`,
      form.cookies && `Bukkie's Cookies: ${form.cookies} jars`,
      form.chinchin && `Richie Chinchin: ${form.chinchin} jars`,
      form.date && `Needed by: ${form.date}`,
      form.location && `Delivery location: ${form.location}`,
      form.message && `\n${form.message}`,
    ].filter(Boolean).join('\n')
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Wholesale enquiry: ${form.business || form.name}`)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('sent')
        setForm(empty)
      } else if (data.fallback) {
        setStatus('mailto')
        window.location.href = mailtoHref()
      } else {
        setStatus('error')
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('mailto')
      window.location.href = mailtoHref()
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-ivory rounded-2xl border border-gold/25 shadow-card p-8 lg:p-10 text-center">
        <h3 className="font-heading text-2xl font-semibold text-chocolate mb-3">Thank you, we have your enquiry.</h3>
        <p className="font-body text-sm text-chocolate/65 max-w-sm mx-auto">
          Our team will come back to you within one business day with pricing and delivery options.
        </p>
      </div>
    )
  }

  const label = 'font-body text-xs font-semibold text-chocolate/60 mb-1.5 block'

  return (
    <form onSubmit={handleSubmit} className="bg-ivory rounded-2xl border border-gold/25 shadow-card p-6 lg:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="w-name" className={label}>Your name</label>
          <input id="w-name" value={form.name} onChange={set('name')} className="input-henna" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="w-business" className={label}>Business or event <span className="font-normal text-chocolate/40">(optional)</span></label>
          <input id="w-business" value={form.business} onChange={set('business')} className="input-henna" autoComplete="organization" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="w-email" className={label}>Email</label>
          <input id="w-email" type="email" value={form.email} onChange={set('email')} className="input-henna" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="w-phone" className={label}>Phone / WhatsApp</label>
          <input id="w-phone" type="tel" value={form.phone} onChange={set('phone')} className="input-henna" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="w-type" className={label}>What is the order for?</label>
        <select id="w-type" value={form.type} onChange={set('type')} className="input-henna">
          {orderTypes.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="w-cookies" className={label}>Bukkie&apos;s Cookies (jars)</label>
          <input id="w-cookies" type="number" min="0" inputMode="numeric" value={form.cookies} onChange={set('cookies')} className="input-henna" placeholder="e.g. 40" />
        </div>
        <div>
          <label htmlFor="w-chinchin" className={label}>Richie Chinchin (jars)</label>
          <input id="w-chinchin" type="number" min="0" inputMode="numeric" value={form.chinchin} onChange={set('chinchin')} className="input-henna" placeholder="e.g. 60" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="w-date" className={label}>Needed by</label>
          <input id="w-date" type="date" value={form.date} onChange={set('date')} className="input-henna" />
        </div>
        <div>
          <label htmlFor="w-location" className={label}>Delivery city</label>
          <input id="w-location" value={form.location} onChange={set('location')} className="input-henna" placeholder="e.g. Lagos, Abuja, London" />
        </div>
      </div>
      <div>
        <label htmlFor="w-message" className={label}>Anything else?</label>
        <textarea
          id="w-message"
          rows={4}
          value={form.message}
          onChange={set('message')}
          className="input-henna resize-none"
          placeholder="Custom ribbons, gift tags, branded labels, delivery to several addresses..."
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="font-body text-sm text-rose-red">{error}</p>
      )}
      {status === 'mailto' && (
        <p className="font-body text-sm text-chocolate/70">
          Your email app should open with the details filled in. If it does not, email us at{' '}
          <a href={mailtoHref()} className="text-rose-red font-semibold underline underline-offset-2">{CONTACT_EMAIL}</a>.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Request a quote'}
      </button>
    </form>
  )
}
