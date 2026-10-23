import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import QualityIconCard from '@/components/QualityIconCard'
import Newsletter from '@/components/Newsletter'
import KenBurnsShowcase from '@/components/KenBurnsShowcase'
import HeroSection from '@/components/HeroSection'
import { GALLERY } from '@/lib/gallery'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcaseSection />
      <GalleryShowcaseSection />
      <BrandStorySection />
      <QualityPromiseSection />
      <FeaturedProductsSection />
      <Newsletter />
    </>
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
            name="Bukkie's Premium Cookies"
            tagline="Rich. Buttery. Unforgettable."
            description="Golden-baked butter cookies, crafted with premium ingredients for a warm, joyful treat."
            href="/cookies"
            badge="Best Seller"
            variant="cookies"
          />
          <ProductCard
            name="Richie Premium Chinchin"
            tagline="Crunchy. Joyful. Delicious."
            description="A golden crunchy snack made for sharing, celebration, and everyday enjoyment. Pure joy in every bite."
            href="/chinchin"
            badge="New"
            variant="chinchin"
          />
        </div>
      </div>
    </section>
  )
}

function GalleryShowcaseSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFF4E1' }}>
      <div className="container-henna">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
              A Closer Look
            </span>
            <h2 className="section-title">Tied in gold, made to share</h2>
          </div>
          <Link href="/gallery" className="btn-secondary self-start sm:self-auto">
            View the full gallery
          </Link>
        </div>
        <KenBurnsShowcase images={GALLERY} />
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
              <div className="relative w-full aspect-square max-w-md rounded-3xl overflow-hidden bg-cream">
                <Image
                  src="/images/products/gift-tray.jpg"
                  alt="Hands holding a tray with a jar of Bukkie's cookies and a jar of Richie chinchin"
                  fill
                  sizes="(min-width: 1024px) 448px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/10 to-transparent" />
                <div className="absolute inset-0 flex items-end p-8">
                  <blockquote
                    className="font-heading text-white/80 text-2xl font-medium italic leading-snug"
                  >
                    &ldquo;From our kitchen to the world.&rdquo;
                  </blockquote>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-2xl overflow-hidden border-4 border-ivory shadow-card">
                <Image src="/images/products/cookies-closeup.jpg" alt="Golden Bukkie's butter cookies up close" fill sizes="144px" className="object-cover" />
              </div>
              <div
                className="absolute -top-4 -right-4 rounded-xl px-4 py-3 shadow-soft border"
                style={{ backgroundColor: '#FFF9EF', borderColor: 'rgba(214, 166, 47, 0.3)' }}
              >
                <div className="font-heading text-2xl font-semibold text-chocolate leading-none">Gift ready</div>
                <div className="font-body text-xs text-chocolate/50 mt-1">Every jar tied in gold</div>
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
              We believe food is one of life&apos;s greatest pleasures, and we pour that belief into everything we bake. Every bite carries warmth, beauty, and care.
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
            name="Bukkie's Premium Cookies"
            tagline="Rich. Buttery. Unforgettable."
            description="Made with fine ingredients, rich butter goodness, baked to perfection, and perfect for gifting and sharing."
            href="/cookies"
            badge="Best Seller"
            variant="cookies"
          />
          <ProductCard
            name="Richie Premium Chinchin"
            tagline="Crunchy. Joyful. Delicious."
            description="Perfect crunchy texture, joyful snack for every moment, great for gifting and parties, made with care."
            href="/chinchin"
            variant="chinchin"
          />
        </div>
      </div>
    </section>
  )
}

