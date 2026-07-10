import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import QualityIconCard from '@/components/QualityIconCard'
import Newsletter from '@/components/Newsletter'
import Badge from '@/components/Badge'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcaseSection />
      <BrandStorySection />
      <QualityPromiseSection />
      <FeaturedProductsSection />
      <Newsletter />
    </>
  )
}

function HeroSection() {
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

      <PetalDecoration className="absolute top-16 right-8 lg:right-20 opacity-40 rotate-12" size={80} />
      <PetalDecoration className="absolute bottom-20 left-8 opacity-25 -rotate-20" size={56} />

      <div className="container-henna relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 lg:py-28">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="gold">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#D6A62F"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Premium Foods
              </Badge>
              <Badge variant="default">Made with Love</Badge>
            </div>

            <h1 className="font-heading font-semibold leading-[1.08] text-chocolate mb-6"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                { value: '100%', label: 'Natural ingredients' },
                { value: '4.9', label: 'Customer rating' },
                { value: '2K+', label: 'Happy customers' },
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
                className="absolute -inset-6 opacity-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 85% 85% at 55% 50%, rgba(214,166,47,0.28) 0%, rgba(196,30,58,0.1) 65%, transparent 100%)',
                }}
              />

              {/* Main product card — Bukkie's Cookies */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-soft"
                style={{
                  width: 'clamp(200px, 22vw, 288px)',
                  aspectRatio: '3/4',
                  background: 'linear-gradient(160deg, #FBE6C4 0%, #C89B2C 35%, #A65F2B 65%, #3B1F10 100%)',
                  border: '1px solid rgba(214, 166, 47, 0.3)',
                }}
              >
                {/* Cookie illustration */}
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] opacity-90"
                  width="160" height="160" viewBox="0 0 160 160"
                  aria-hidden="true"
                >
                  <circle cx="80" cy="80" r="70" fill="#D4A574" opacity="0.45"/>
                  <circle cx="80" cy="80" r="62" fill="#C89B2C" opacity="0.5"/>
                  <circle cx="80" cy="80" r="54" fill="#A65F2B" opacity="0.55"/>
                  <ellipse cx="56" cy="60" rx="8" ry="7" fill="#3B1F10" opacity="0.75"/>
                  <ellipse cx="94" cy="50" rx="7" ry="6" fill="#4B2413" opacity="0.75"/>
                  <ellipse cx="110" cy="78" rx="7" ry="6" fill="#3B1F10" opacity="0.75"/>
                  <ellipse cx="90" cy="102" rx="8" ry="7" fill="#4B2413" opacity="0.75"/>
                  <ellipse cx="54" cy="97" rx="7" ry="6" fill="#3B1F10" opacity="0.75"/>
                  <ellipse cx="76" cy="76" rx="6" ry="5" fill="#4B2413" opacity="0.6"/>
                  <ellipse cx="104" cy="62" rx="5" ry="4" fill="#3B1F10" opacity="0.6"/>
                  <ellipse cx="46" cy="78" rx="5" ry="4" fill="#4B2413" opacity="0.55"/>
                  <ellipse cx="48" cy="52" rx="22" ry="14" fill="white" opacity="0.07" transform="rotate(-35 48 52)"/>
                </svg>

                {/* Premium seal */}
                <div className="absolute top-4 right-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(214,166,47,0.18)', border: '1px solid rgba(214,166,47,0.4)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#D6A62F" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                </div>

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: 'linear-gradient(to top, rgba(59,31,16,0.96) 0%, rgba(59,31,16,0.5) 65%, transparent 100%)' }}
                >
                  <div className="font-heading text-white/95 text-sm lg:text-base font-semibold leading-snug">
                    Bukkie&apos;s<br/>Premium Cookies
                  </div>
                  <div className="font-body text-[11px] mt-1 tracking-wide" style={{ color: '#D6A62F' }}>
                    Rich. Buttery. Unforgettable.
                  </div>
                </div>
              </div>

              {/* Secondary card — Richie Chinchin */}
              <div
                className="absolute -bottom-4 -right-6 lg:-right-8 rounded-2xl overflow-hidden border-4 border-ivory shadow-card"
                style={{
                  width: 'clamp(96px, 10vw, 128px)',
                  aspectRatio: '1',
                  background: 'linear-gradient(145deg, #FFF3D8 0%, #F4C430 45%, #E8A735 75%, #8A4B1F 100%)',
                }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
                  <rect x="24" y="20" width="20" height="13" rx="4" fill="#8A4B1F" opacity="0.55" transform="rotate(-15 34 26)"/>
                  <rect x="54" y="16" width="18" height="12" rx="4" fill="#A65F2B" opacity="0.5" transform="rotate(10 63 22)"/>
                  <rect x="64" y="43" width="19" height="12" rx="4" fill="#8A4B1F" opacity="0.55" transform="rotate(-8 73 49)"/>
                  <rect x="18" y="52" width="20" height="13" rx="4" fill="#A65F2B" opacity="0.5" transform="rotate(12 28 58)"/>
                  <rect x="44" y="58" width="18" height="12" rx="4" fill="#8A4B1F" opacity="0.55" transform="rotate(-20 53 64)"/>
                  <rect x="66" y="67" width="16" height="11" rx="3" fill="#A65F2B" opacity="0.5" transform="rotate(5 74 72)"/>
                  <rect x="28" y="74" width="19" height="12" rx="4" fill="#8A4B1F" opacity="0.5" transform="rotate(15 37 80)"/>
                </svg>
                <div
                  className="absolute bottom-0 left-0 right-0 px-2.5 py-2"
                  style={{ background: 'linear-gradient(to top, rgba(138,75,31,0.95) 0%, transparent 100%)' }}
                >
                  <div className="font-heading text-white/90 text-[9px] lg:text-[10px] font-semibold leading-tight">
                    Richie<br/>Chinchin
                  </div>
                </div>
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

function ProductShowcaseSection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-henna">
        <div className="text-center mb-14">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
            Our Collection
          </span>
          <h2 className="section-title">Our Signature Treats</h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ProductCard
            id="bukkies-cookies"
            name="Bukkie's Premium Cookies"
            tagline="Rich. Buttery. Unforgettable."
            description="Golden-baked cookies with delicious chocolate chips, crafted with premium ingredients for a warm, joyful treat."
            price={12.99}
            weight="250g"
            href="/cookies"
            badge="Best Seller"
            rating={4.9}
            reviewCount={214}
            variant="cookies"
          />
          <ProductCard
            id="richie-chinchin"
            name="Richie Premium Chinchin"
            tagline="Crunchy. Joyful. Delicious."
            description="A golden crunchy snack made for sharing, celebration, and everyday enjoyment. Pure joy in every bite."
            price={9.99}
            weight="300g"
            href="/chinchin"
            badge="New"
            rating={4.8}
            reviewCount={167}
            variant="chinchin"
          />
        </div>
      </div>
    </section>
  )
}

function BrandStorySection() {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FFF4E1' }}>
      <div className="container-henna">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div
                className="w-full aspect-square max-w-md rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #FBE6C4 0%, #D4A574 40%, #A65F2B 70%, #3B1F10 100%)' }}
              >
                <div className="absolute inset-0 flex items-end p-8">
                  <blockquote
                    className="font-heading text-white/80 text-2xl font-medium italic leading-snug"
                  >
                    "From our kitchen to the world."
                  </blockquote>
                </div>
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-36 h-36 rounded-2xl overflow-hidden border-4 border-ivory shadow-card"
                style={{ background: 'linear-gradient(145deg, #FFF3D8 0%, #F4C430 60%, #8A4B1F 100%)' }}
              />
              <div
                className="absolute -top-4 -right-4 rounded-xl px-4 py-3 shadow-soft border"
                style={{ backgroundColor: '#FFF9EF', borderColor: 'rgba(214, 166, 47, 0.3)' }}
              >
                <div className="font-heading text-3xl font-semibold text-chocolate leading-none">2K+</div>
                <div className="font-body text-xs text-chocolate/50 mt-1">Joyful customers</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
              Our Story
            </span>
            <h2 className="section-title mb-6">
              From Our Kitchen<br />to the World
            </h2>
            <div className="gold-divider mb-6" />
            <p className="font-body text-base lg:text-lg text-chocolate/70 leading-relaxed mb-6">
              Henna Foods creates premium treats made to bring joy, love, and elegance to everyday moments. From buttery cookies to crunchy chinchin, every product is crafted with care and made to be shared.
            </p>
            <p className="font-body text-base text-chocolate/60 leading-relaxed mb-8">
              We believe food is one of life's greatest pleasures, and we pour that belief into everything we bake. Every bite carries warmth, beauty, and care.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Premium Ingredients', 'Made with Love', 'Freshly Baked', 'Giftable'].map(tag => (
                <span
                  key={tag}
                  className="font-body text-xs font-medium border border-gold/40 text-chocolate/70 rounded-pill px-4 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-secondary inline-flex">
              Our Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function QualityPromiseSection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-henna">
        <div className="text-center mb-14">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
            Our Promise
          </span>
          <h2 className="section-title">Quality in Every Bite</h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QualityIconCard
            icon="heart"
            title="Made with Love"
            description="Every batch is baked with genuine care and attention, from the very first ingredient to the last golden edge."
          />
          <QualityIconCard
            icon="leaf"
            title="Premium Ingredients"
            description="We select only the finest ingredients, because our treats deserve nothing less than the best."
          />
          <QualityIconCard
            icon="star"
            title="Baked to Perfection"
            description="Precise baking, consistent texture, and that signature Henna taste in every single piece."
          />
          <QualityIconCard
            icon="gift"
            title="Joy in Every Bite"
            description="Whether shared or savoured alone, every Henna treat is made to bring a genuine moment of happiness."
          />
        </div>
      </div>
    </section>
  )
}

function FeaturedProductsSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFF4E1' }}>
      <div className="container-henna">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
              Featured
            </span>
            <h2 className="section-title">Treat Yourself Today</h2>
          </div>
          <Link href="/shop" className="btn-secondary shrink-0">
            View All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <ProductCard
            id="bukkies-cookies-feat"
            name="Bukkie's Premium Cookies"
            tagline="Rich. Buttery. Unforgettable."
            description="Made with fine ingredients, rich butter goodness, baked to perfection, and perfect for gifting and sharing."
            price={12.99}
            weight="250g"
            href="/cookies"
            badge="Best Seller"
            rating={4.9}
            reviewCount={214}
            variant="cookies"
          />
          <ProductCard
            id="richie-chinchin-feat"
            name="Richie Premium Chinchin"
            tagline="Crunchy. Joyful. Delicious."
            description="Perfect crunchy texture, joyful snack for every moment, great for gifting and parties, made with care."
            price={9.99}
            weight="300g"
            href="/chinchin"
            rating={4.8}
            reviewCount={167}
            variant="chinchin"
          />
        </div>
      </div>
    </section>
  )
}

function PetalDecoration({ className, size }: { className?: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(40 40)">
        <ellipse cx="0" cy="-16" rx="6" ry="13" fill="#C41E3A" transform="rotate(-55)" opacity="0.7"/>
        <ellipse cx="0" cy="-16" rx="6" ry="13" fill="#D6A62F" transform="rotate(-22)" opacity="0.7"/>
        <ellipse cx="0" cy="-16" rx="6" ry="13" fill="#F4C430" transform="rotate(12)" opacity="0.7"/>
        <ellipse cx="0" cy="-16" rx="6" ry="13" fill="#F26A3D" transform="rotate(46)" opacity="0.7"/>
        <ellipse cx="0" cy="-16" rx="6" ry="13" fill="#4F9B3A" transform="rotate(78)" opacity="0.7"/>
        <circle cx="0" cy="0" r="4" fill="#FFF4E1" opacity="0.8"/>
      </g>
    </svg>
  )
}
