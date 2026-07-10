'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="section-padding" style={{ backgroundColor: '#3B1F10' }}>
      <div className="container-henna">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase opacity-60" style={{ color: '#D6A62F' }}>
              Stay Connected
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-semibold leading-tight mb-4" style={{ color: '#FFF4E1' }}>
            Join the Henna Family
          </h2>
          <p className="font-body text-base opacity-65 leading-relaxed mb-10" style={{ color: '#FFF4E1' }}>
            Sweet updates, fresh offers, and joyful moments. Be the first to know about new flavours and exclusive treats.
          </p>

          {submitted ? (
            <div
              className="rounded-2xl px-8 py-6 border"
              style={{ borderColor: 'rgba(214, 166, 47, 0.4)', backgroundColor: 'rgba(214, 166, 47, 0.1)' }}
            >
              <p className="font-heading text-xl font-medium" style={{ color: '#D6A62F' }}>
                Welcome to the family.
              </p>
              <p className="font-body text-sm mt-1 opacity-70" style={{ color: '#FFF4E1' }}>
                Thank you for joining Henna Foods. Something sweet is coming your way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white/10 border border-gold/30 rounded-pill px-5 py-3.5 text-sm font-body placeholder:text-white/35 focus:outline-none focus:border-gold text-white transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-chocolate font-body text-sm font-semibold tracking-wide rounded-pill px-6 py-3.5 hover:bg-golden-yellow transition-colors duration-150 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="font-body text-xs opacity-40 mt-4" style={{ color: '#FFF4E1' }}>
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  )
}
