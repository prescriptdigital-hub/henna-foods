'use client'

import { useState } from 'react'
import Link from 'next/link'
import LineIcon from '@/components/LineIcon'
import DeliveryRates from '@/components/DeliveryRates'
import { CONTACT } from '@/lib/site'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  // Sends through our inbox; if email is not set up yet, hands the message to WhatsApp or the visitor's email app
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSubmitted(true)
      } else if (data.fallback) {
        const body = `${form.message}

${form.name}
${form.email}`
        if (CONTACT.whatsapp) {
          window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(form.subject || 'Hello Henna Foods')}&body=${encodeURIComponent(body)}`
        }
      } else {
        setError(data.error || 'We could not send your message. Please try again.')
      }
    } catch {
      setError('We could not send your message. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="py-20 bg-ivory border-b border-gold/20">
        <div className="container-henna text-center">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-chocolate mb-4">
            Contact Us
          </h1>
          <p className="font-body text-base text-chocolate/60 max-w-md mx-auto">
            We love hearing from our Henna family. Send us a message and we will get back to you soon.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-henna">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-chocolate mb-6">Send a message</h2>

              {submitted ? (
                <div className="rounded-2xl p-8 border border-gold/30 bg-ivory text-center">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-chocolate mb-2">Message sent.</h3>
                  <p className="font-body text-sm text-chocolate/60">Thank you for reaching out. We will be in touch very soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/70 mb-1.5 block">Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="input-henna"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-chocolate/70 mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="input-henna"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-chocolate/70 mb-1.5 block">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this about?"
                      className="input-henna"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-chocolate/70 mb-1.5 block">Message</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      required
                      rows={5}
                      className="input-henna resize-none"
                    />
                  </div>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })}
                    className="hidden"
                  />
                  {error && <p role="alert" className="font-body text-sm text-rose-red">{error}</p>}
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8 lg:pt-10">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-chocolate mb-6">Get in touch</h2>
                <div className="space-y-4">
                  {[
                    { icon: 'mail' as const, label: 'Email', value: CONTACT.email },
                    { icon: 'pin' as const, label: 'Location', value: CONTACT.location },
                    { icon: 'clock' as const, label: 'Response time', value: 'Within 1-2 business days' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-ivory rounded-xl border border-gold/20">
                      <span className="mt-0.5 shrink-0"><LineIcon name={item.icon} /></span>
                      <div>
                        <div className="font-body text-xs font-semibold text-chocolate/60 uppercase tracking-wide mb-0.5">{item.label}</div>
                        <div className="font-body text-sm text-chocolate">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="shipping" className="p-6 bg-ivory rounded-2xl border border-gold/20">
                <h3 className="font-heading text-lg font-semibold text-chocolate mb-3">Delivery areas and fees</h3>
                <p className="font-body text-sm text-chocolate/65 leading-relaxed mb-5">We deliver across Lagos in 2 to 3 business days, with every jar carefully packed so your treats arrive perfect. Your fee is added at checkout once you choose your area.</p>
                <DeliveryRates />
              </div>

              <div id="returns" className="p-6 bg-ivory rounded-2xl border border-gold/20">
                <h3 className="font-heading text-lg font-semibold text-chocolate mb-3">Refunds and returns</h3>
                <p className="font-body text-sm text-chocolate/65 leading-relaxed">We want you to love every jar. If anything arrives damaged or is not what you ordered, tell us within 48 hours of delivery and we will replace it or refund you. <Link href="/refunds" className="underline underline-offset-2 text-chocolate">Read the full policy</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
