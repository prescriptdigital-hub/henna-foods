'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import HennaLogo from './HennaLogo'
import { useCart } from '@/context/CartContext'
import { CONTACT } from '@/lib/site'

const topics = [
  { label: 'Bulk or wholesale order', text: "Hello Henna Foods, I'd like to ask about a bulk order." },
  { label: 'Delivery', text: 'Hello Henna Foods, I have a question about delivery.' },
  { label: 'My order', text: 'Hello Henna Foods, I have a question about my order.' },
  { label: 'Gifting', text: "Hello Henna Foods, I'd love to send Henna treats as a gift." },
]

const TEASER_KEY = 'henna-chat-teaser-seen'

export default function LiveChat() {
  const pathname = usePathname()
  const params = useSearchParams()
  const { lines, state } = useCart()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [teaser, setTeaser] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const preview = params.get('chat') === 'preview'
  const enabled = Boolean(CONTACT.whatsapp) || preview

  // A gentle one-time nudge per visit, a few seconds in
  useEffect(() => {
    if (!enabled) return
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return
    } catch {}
    const t = setTimeout(() => setTeaser(true), 9000)
    return () => clearTimeout(t)
  }, [enabled])

  useEffect(() => {
    if (!open) return
    setTeaser(false)
    try {
      sessionStorage.setItem(TEASER_KEY, '1')
    } catch {}
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Payment pages stay distraction-free
  if (!enabled || pathname === '/checkout' || state.isOpen) return null

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = message.trim()
    if (!text) return
    const basket = lines.length ? `\n\nMy basket: ${lines.map(l => `${l.quantity} x ${l.product.name}`).join(', ')}` : ''
    const full = `${text}${basket}\n\n(Sent from hennafoods.com${pathname !== '/' ? pathname : ''})`
    // Preview mode has no number yet; the box already says so
    if (!CONTACT.whatsapp) return
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(full)}`, '_blank', 'noopener,noreferrer')
    setMessage('')
    setOpen(false)
  }

  return (
    <div className="fixed z-[55] right-4 bottom-4 sm:right-6 sm:bottom-6 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Henna Foods"
          className="w-[calc(100vw-2rem)] max-w-[370px] max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain rounded-3xl bg-ivory border border-gold/40 shadow-soft animate-fade-up"
        >
          <div className="relative bg-chocolate px-5 pt-4 pb-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-ivory/70 hover:text-ivory hover:bg-ivory/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <HennaLogo size="sm" href="" />
            <p className="font-heading text-ivory text-xl mt-3 leading-snug">Hello, how can we help?</p>
            <p className="font-body text-xs text-ivory/60 mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-henna-green" aria-hidden="true" />
              {CONTACT.replyTime}
            </p>
          </div>

          <form onSubmit={send} className="p-5 -mt-3 rounded-t-3xl bg-ivory relative">
            <div className="rounded-2xl rounded-tl-md bg-cream border border-gold/25 px-4 py-3 mb-4 max-w-[90%]">
              <p className="font-body text-sm text-chocolate/80 leading-relaxed">
                Welcome to Henna Foods. Ask us about orders, delivery, gifting or bulk prices and we&apos;ll reply on WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map(t => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => {
                    setMessage(t.text)
                    inputRef.current?.focus()
                  }}
                  className="font-body text-xs rounded-pill border border-gold/40 px-3 py-1.5 text-chocolate hover:bg-gold/10 transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>

            <label htmlFor="chat-message" className="sr-only">Your message</label>
            <textarea
              id="chat-message"
              ref={inputRef}
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) send(e)
              }}
              placeholder="Type your message..."
              className="input-henna resize-none text-sm"
            />

            {!CONTACT.whatsapp && (
              <p className="font-body text-[11px] text-rose-red mt-2">Preview only: the WhatsApp number has not been added yet.</p>
            )}

            <button
              type="submit"
              disabled={!message.trim()}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-pill bg-chocolate text-ivory font-body text-sm font-semibold py-3 hover:bg-[#4B2413] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <WhatsAppIcon />
              Continue on WhatsApp
            </button>
            <p className="font-body text-[11px] text-chocolate/45 text-center mt-2">
              Opens WhatsApp with your message ready to send.
            </p>
          </form>
        </div>
      )}

      {teaser && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="max-w-[240px] text-left rounded-2xl rounded-br-md bg-ivory border border-gold/40 shadow-card px-4 py-3 font-body text-sm text-chocolate animate-fade-up"
        >
          Planning a celebration? Ask us about bulk prices.
        </button>
      )}

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with Henna Foods'}
        className="group flex items-center gap-2 rounded-pill bg-chocolate text-ivory pl-3.5 pr-5 py-3.5 shadow-soft border border-gold/50 hover:bg-[#4B2413] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" />
            <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.4" />
          </svg>
        )}
        <span className="font-body text-sm font-semibold">{open ? 'Close' : 'Chat with us'}</span>
      </button>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#D6A62F" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43M20.08 4a11.3 11.3 0 0 0-8.03-3.33C5.8.67.7 5.76.7 12.02c0 2 .52 3.95 1.52 5.67L.6 23.67l6.12-1.6a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.35A11.28 11.28 0 0 0 20.08 4" />
    </svg>
  )
}
