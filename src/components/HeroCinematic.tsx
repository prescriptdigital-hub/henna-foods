import Image from 'next/image'
import Link from 'next/link'

// Photos used in the hero. Swap these paths to change the jars on show.
const HERO_PHOTOS = {
  main: { width: 833, height: 1254, src: '/images/products/cookies-jar-cutout.png', alt: "Bukkie's Premium Cookies jar tied with gold ribbon" },
  side: { width: 1000, height: 1145, src: '/images/products/chinchin-jar-cutout.png', alt: 'Richie Premium Chinchin jar tied with gold ribbon' },
}

// Fixed positions so the server and browser render the same drifting petals and sparkles
const PETALS = [
  { left: '6%', size: 18, dur: 19, delay: -2, drift: '60px', rot: '320deg', color: '#C41E3A' },
  { left: '18%', size: 12, dur: 24, delay: -11, drift: '-40px', rot: '-260deg', color: '#FFF4E1' },
  { left: '33%', size: 15, dur: 21, delay: -6, drift: '80px', rot: '400deg', color: '#8E1220' },
  { left: '47%', size: 11, dur: 27, delay: -17, drift: '-70px', rot: '-300deg', color: '#C41E3A' },
  { left: '61%', size: 16, dur: 22, delay: -4, drift: '50px', rot: '280deg', color: '#FFF4E1' },
  { left: '74%', size: 13, dur: 25, delay: -14, drift: '-60px', rot: '-360deg', color: '#C41E3A' },
  { left: '88%', size: 17, dur: 20, delay: -9, drift: '40px', rot: '340deg', color: '#8E1220' },
  { left: '95%', size: 10, dur: 28, delay: -20, drift: '-30px', rot: '-240deg', color: '#FFF4E1' },
]

const SPARKLES = [
  { top: '14%', left: '52%', size: 14, delay: 0 },
  { top: '72%', left: '44%', size: 10, delay: 1.6 },
  { top: '22%', left: '90%', size: 12, delay: 0.8 },
  { top: '80%', left: '86%', size: 16, delay: 2.4 },
  { top: '46%', left: '6%', size: 9, delay: 3.1 },
  { top: '8%', left: '24%', size: 8, delay: 1.2 },
]

const LINE_ONE = ['Elegant', 'Taste.']
const LINE_TWO = ['Joyful', 'Moments.']

function Petal({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 20 26" aria-hidden="true">
      <path d="M10 0C17 5 20 14 10 26C0 14 3 5 10 0Z" fill={color} opacity="0.85" />
      <path d="M10 3C12 9 12 16 10 23" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" fill="#F4C430" />
    </svg>
  )
}

export default function HeroCinematic() {
  let wordIndex = 0
  const word = (w: string, gold = false) => {
    const delay = 0.15 + wordIndex++ * 0.14
    return (
      <span key={w} className="hero-word-mask">
        <span className={`hero-word ${gold ? 'hero-gold-text' : ''}`} style={{ '--d': `${delay}s` } as React.CSSProperties}>
          {w}
        </span>
      </span>
    )
  }

  return (
    <section className="hero-cine relative overflow-hidden" style={{ minHeight: 'min(94vh, 860px)' }}>
      <div className="hero-sweep" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="hero-petal"
            style={{
              left: p.left,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
              '--drift': p.drift,
              '--rot': p.rot,
            } as React.CSSProperties}
          >
            <Petal color={p.color} size={p.size} />
          </span>
        ))}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="hero-sparkle"
            style={{ top: s.top, left: s.left, '--delay': `${s.delay}s` } as React.CSSProperties}
          >
            <Sparkle size={s.size} />
          </span>
        ))}
      </div>

      <div className="container-henna relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-6 items-center py-16 lg:py-20">
          <div>
            <p className="hero-fade font-body text-xs font-semibold tracking-[0.3em] uppercase mb-7" style={{ color: '#D6A62F', '--d': '0s' } as React.CSSProperties}>
              <span className="inline-block w-10 h-px align-middle mr-3" style={{ background: '#D6A62F' }} />
              Premium Foods, Made with Love
            </p>

            <h1
              className="font-heading font-semibold leading-[0.98] tracking-tight mb-8"
              style={{ fontSize: 'clamp(42px, 5.8vw, 88px)', color: '#FFF4E1' }}
            >
              <span className="block sm:whitespace-nowrap">{LINE_ONE.map(w => word(w))}</span>
              <span className="block sm:whitespace-nowrap">{LINE_TWO.map(w => word(w, true))}</span>
            </h1>

            <p
              className="hero-fade font-body text-base lg:text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: 'rgba(255,244,225,0.72)', '--d': '0.85s' } as React.CSSProperties}
            >
              Discover premium cookies and crunchy chinchin crafted with love, quality ingredients, and unforgettable flavour.
            </p>

            <div className="hero-fade flex flex-wrap gap-4" style={{ '--d': '1s' } as React.CSSProperties}>
              <Link href="/cookies" className="btn-accent gap-2 hero-cta">
                Shop Cookies
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/chinchin"
                className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-body text-sm font-semibold tracking-wide transition-colors duration-200 border hover:bg-gold/15"
                style={{ borderColor: '#D6A62F', color: '#FFF4E1' }}
              >
                Shop Chinchin
              </Link>
            </div>

            <dl className="hero-fade flex flex-wrap gap-x-10 gap-y-4 mt-14 pt-8 border-t" style={{ borderColor: 'rgba(214,166,47,0.22)', '--d': '1.15s' } as React.CSSProperties}>
              {[
                { value: '2 sizes', label: 'For every table' },
                { value: '5% off', label: 'When you buy 5 jars' },
                { value: 'Lagos', label: 'Delivered to your door' },
              ].map(stat => (
                <div key={stat.label}>
                  <dt className="font-heading text-2xl font-semibold" style={{ color: '#F4C430' }}>{stat.value}</dt>
                  <dd className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,244,225,0.55)' }}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative" style={{ width: 'min(100%, clamp(320px, 44vw, 600px))', aspectRatio: '1.3 / 1' }}>
              <div className="hero-glow" aria-hidden="true" />
              <svg className="hero-ring" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="96" fill="none" stroke="#D6A62F" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="2 6" />
                <circle cx="100" cy="100" r="84" fill="none" stroke="#F4C430" strokeOpacity="0.18" strokeWidth="0.4" />
              </svg>

              {/* Both jars at the same height, side by side */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-[7%]">
                <figure className="hero-pop flex flex-col items-center" style={{ width: '34%', '--d': '0.4s' } as React.CSSProperties}>
                  <div className="hero-float w-full" style={{ '--float': '7s', '--float-delay': '0s' } as React.CSSProperties}>
                    <Image src={HERO_PHOTOS.main.src} alt={HERO_PHOTOS.main.alt} width={HERO_PHOTOS.main.width} height={HERO_PHOTOS.main.height} priority sizes="(min-width: 1024px) 240px, 42vw" className="hero-jar w-full h-auto" />
                  </div>
                  <figcaption className="mt-4 text-center whitespace-nowrap">
                    <span className="block font-heading text-sm lg:text-base font-semibold" style={{ color: '#FFF4E1' }}>Bukkie&apos;s Cookies</span>
                    <span className="hidden xl:block font-heading italic text-sm" style={{ color: '#D6A62F' }}>Rich. Buttery. Unforgettable.</span>
                  </figcaption>
                </figure>
                <figure className="hero-pop flex flex-col items-center" style={{ width: '44.7%', '--d': '0.6s' } as React.CSSProperties}>
                  <div className="hero-float w-full" style={{ '--float': '7s', '--float-delay': '-3.5s' } as React.CSSProperties}>
                    <Image src={HERO_PHOTOS.side.src} alt={HERO_PHOTOS.side.alt} width={HERO_PHOTOS.side.width} height={HERO_PHOTOS.side.height} priority sizes="(min-width: 1024px) 240px, 42vw" className="hero-jar w-full h-auto" />
                  </div>
                  <figcaption className="mt-4 text-center whitespace-nowrap">
                    <span className="block font-heading text-sm lg:text-base font-semibold" style={{ color: '#FFF4E1' }}>Richie Chinchin</span>
                    <span className="hidden xl:block font-heading italic text-sm" style={{ color: '#D6A62F' }}>Crunchy. Joyful. Delicious.</span>
                  </figcaption>
                </figure>
              </div>

              {/* Seal */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-[6%] z-10">
                <div className="hero-pop" style={{ '--d': '1s' } as React.CSSProperties}>
                  <div className="hero-seal">
                    <span className="font-heading italic text-[13px] leading-tight text-center" style={{ color: '#3B1F10' }}>
                      Freshly<br />baked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
