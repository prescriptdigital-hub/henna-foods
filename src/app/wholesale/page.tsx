import Image from 'next/image'
import type { Metadata } from 'next'
import { BULK_TIERS, WHOLESALE_MIN_JARS } from '@/lib/catalog'
import WholesaleForm from './WholesaleForm'

export const metadata: Metadata = {
  title: 'Bulk & Wholesale',
  description: "Bulk orders of Bukkie's Premium Cookies and Richie Premium Chinchin for weddings, events, retailers and corporate gifting.",
}

const occasions = [
  {
    title: 'Weddings and owambe',
    body: 'Gold-ribboned jars that sit beautifully on every table and travel home with your guests.',
    icon: (
      <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
    ),
  },
  {
    title: 'Shops and stockists',
    body: 'Stock a premium treat your customers come back for, with trade pricing and steady supply.',
    icon: (
      <>
        <path d="M4 9h16l-1.5 11h-13z" />
        <path d="M8 9V7a4 4 0 0 1 8 0v2" />
      </>
    ),
  },
  {
    title: 'Corporate gifting',
    body: 'Thank clients and staff with something they will actually open. Custom tags available.',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="13" rx="1.5" />
        <path d="M12 8v13M3 12h18" />
        <path d="M12 8c-1.5-3-5-3.5-5-1.2C7 8 9.5 8 12 8zm0 0c1.5-3 5-3.5 5-1.2C17 8 14.5 8 12 8z" />
      </>
    ),
  },
]

export default function WholesalePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ivory border-b border-gold/20">
        <div className="container-henna grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div>
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
              Bulk &amp; Wholesale
            </span>
            <h1 className="font-heading text-4xl lg:text-6xl font-semibold text-chocolate leading-[1.08] mb-6">
              Joy, by the
              <br />
              <span className="italic text-cookie-brown">jarful.</span>
            </h1>
            <p className="font-body text-base lg:text-lg text-chocolate/65 leading-relaxed max-w-md mb-8">
              Filling a hall, a shelf or a hundred gift bags? Bring Bukkie&apos;s and Richie to your occasion with
              bulk savings at checkout, or a personal quote for larger orders.
            </p>
            <a href="#quote" className="btn-primary">Request a quote</a>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft border border-gold/25">
            <Image
              src="/images/products/collection.jpg"
              alt="Multipacks of Bukkie's cookies and Richie chinchin side by side"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-henna">
          <div className="max-w-2xl mb-12">
            <h2 className="section-title mb-4">Savings that grow with your basket</h2>
            <p className="font-body text-base text-chocolate/65">
              Mix cookies and chinchin however you like. Once your basket reaches a tier, the saving applies to the
              whole order, automatically.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BULK_TIERS.map(t => (
              <div key={t.minJars} className="rounded-2xl bg-ivory border border-gold/25 p-6">
                <div className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">{t.label}</div>
                <div className="font-heading text-5xl font-semibold text-chocolate leading-none mb-2">{t.discount * 100}%</div>
                <div className="font-body text-sm text-chocolate/60">off when you order {t.minJars} or more jars</div>
              </div>
            ))}
            <div className="rounded-2xl bg-chocolate text-ivory border border-gold/40 p-6">
              <div className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">Wholesale</div>
              <div className="font-heading text-4xl font-semibold leading-none mb-2">{WHOLESALE_MIN_JARS}+ jars</div>
              <div className="font-body text-sm text-ivory/70">Trade pricing, custom labels and scheduled delivery. Ask us below.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-henna grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="section-title mb-4">Made for big moments</h2>
              <p className="font-body text-base text-chocolate/65">Tell us what you are planning and we will shape the order around it.</p>
            </div>
            {occasions.map(o => (
              <div key={o.title} className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-full border border-gold/40 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D6A62F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {o.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-chocolate mb-1">{o.title}</h3>
                  <p className="font-body text-sm text-chocolate/60 leading-relaxed">{o.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div id="quote" className="lg:col-span-3 scroll-mt-28">
            <h2 className="font-heading text-2xl font-semibold text-chocolate mb-2">Request a wholesale quote</h2>
            <p className="font-body text-sm text-chocolate/55 mb-6">We reply within one business day.</p>
            <WholesaleForm />
          </div>
        </div>
      </section>
    </>
  )
}
