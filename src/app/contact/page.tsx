'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8 lg:pt-10">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-chocolate mb-6">Get in touch</h2>
                <div className="space-y-4">
                  {[
                    { icon: '✉', label: 'Email', value: 'hello@hennafoods.com' },
                    { icon: '📍', label: 'Location', value: 'United Kingdom' },
                    { icon: '🕐', label: 'Response time', value: 'Within 1-2 business days' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-ivory rounded-xl border border-gold/20">
                      <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                      <div>
                        <div className="font-body text-xs font-semibold text-chocolate/60 uppercase tracking-wide mb-0.5">{item.label}</div>
                        <div className="font-body text-sm text-chocolate">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="shipping" className="p-6 bg-ivory rounded-2xl border border-gold/20">
                <h3 className="font-heading text-lg font-semibold text-chocolate mb-3">Shipping</h3>
                <p className="font-body text-sm text-chocolate/65 leading-relaxed">Standard delivery takes 2-3 business days. Free delivery on selected orders. All orders are carefully packed to ensure your treats arrive in perfect condition.</p>
              </div>

              <div id="returns" className="p-6 bg-ivory rounded-2xl border border-gold/20">
                <h3 className="font-heading text-lg font-semibold text-chocolate mb-3">Returns</h3>
                <p className="font-body text-sm text-chocolate/65 leading-relaxed">We want you to love every order. If something is not right, contact us within 7 days and we will make it right.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
