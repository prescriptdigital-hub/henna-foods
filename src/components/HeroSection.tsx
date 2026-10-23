import Image from 'next/image'
import Link from 'next/link'
import Badge from './Badge'

// Photos used in the hero. Swap these paths to change the jars on show.
const HERO_JARS = [
  {
    src: '/images/products/cookies-jar.jpg',
    alt: "Bukkie's Premium Cookies jar tied with gold ribbon",
    name: "Bukkie's Cookies",
    tagline: 'Rich. Buttery. Unforgettable.',
    href: '/cookies',
  },
  {
    src: '/images/products/chinchin-jar.jpg',
    alt: 'Richie Premium Chinchin jar tied with gold ribbon',
    name: 'Richie Chinchin',
    tagline: 'Crunchy. Joyful. Delicious.',
    href: '/chinchin',
  },
]

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF4E1 0%, #FBE6C4 45%, #FFF4E1 100%)',
        minHeight: 'min(90vh, 760px)',
      }}
    >
      <div
        className="absolute right-0 top-0 w-2/3 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 75% 50%, rgba(244, 196, 48, 0.35) 0%, transparent 70%)',
        }}
      />

      <div className="container-henna relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 lg:py-28">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="gold">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#D6A62F" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Premium Foods
              </Badge>
              <Badge variant="default">Made with Love</Badge>
            </div>

            <h1
              className="font-heading font-semibold leading-[1.08] text-chocolate mb-6"
              style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}
            >
              Elegant Taste.
              <br />
              <span style={{ color: '#D6A62F' }}>Joyful Moments.</span>
            </h1>

            <p className="font-body text-base lg:text-lg text-chocolate/65 leading-relaxed mb-10 max-w-md">
              Discover premium cookies and crunchy chinchin crafted with love, quality ingredients, and unforgettable flavour.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/cookies" className="btn-primary gap-2">
                Shop Cookies
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link href="/chinchin" className="btn-secondary">
                Shop Chinchin
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-gold/20">
              {[
                { value: '2 sizes', label: 'For every table' },
                { value: '5% off', label: 'When you buy 5 jars' },
                { value: 'Lagos', label: 'Delivered to your door' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-semibold text-chocolate">{stat.value}</div>
                  <div className="font-body text-xs text-chocolate/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Ambient glow */}
              <div
                className="absolute -inset-10 rounded-full blur-2xl opacity-50 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 85% 85% at 55% 50%, rgba(214,166,47,0.28) 0%, rgba(196,30,58,0.1) 65%, transparent 100%)',
                }}
              />

              {/* Both jars as equal cards, side by side */}
              <div className="relative flex gap-4 lg:gap-5">
                {HERO_JARS.map((jar, i) => (
                  <Link
                    key={jar.href}
                    href={jar.href}
                    className="group relative block rounded-3xl overflow-hidden shadow-soft transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      width: 'clamp(150px, 20vw, 264px)',
                      aspectRatio: '3/4',
                      border: '1px solid rgba(214, 166, 47, 0.3)',
                    }}
                  >
                    <Image
                      src={jar.src}
                      alt={jar.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 264px, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 lg:px-5 pt-8 pb-3.5"
                      style={{ background: 'linear-gradient(to top, rgba(59,31,16,0.92) 0%, rgba(59,31,16,0.6) 55%, transparent 100%)' }}
                    >
                      <div className="font-heading text-white/95 text-[13px] lg:text-base font-semibold leading-snug">
                        {jar.name}
                      </div>
                      <div className="hidden sm:block font-body text-[11px] mt-0.5 tracking-wide" style={{ color: '#D6A62F' }}>
                        {jar.tagline}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-3 -left-3 rounded-xl px-3 py-2 shadow-card"
                style={{ backgroundColor: '#FFF9EF', border: '1px solid rgba(214, 166, 47, 0.35)' }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #D6A62F 0%, #F4C430 100%)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-body text-[10px] font-semibold text-chocolate leading-none">Freshly Baked</div>
                    <div className="font-body text-[9px] text-chocolate/40 mt-0.5">Every batch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
