import Image from 'next/image'
import Link from 'next/link'
import QualityIconCard from '@/components/QualityIconCard'
import Newsletter from '@/components/Newsletter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Henna Foods',
  description: 'The story behind Henna Foods. Premium treats crafted with love, quality, and joy.',
}

export default function AboutPage() {
  return (
    <>
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFF4E1 0%, #FBE6C4 50%, #FFF4E1 100%)' }}
      >
        <div className="container-henna text-center relative z-10">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
            Our Story
          </span>
          <h1 className="font-heading text-5xl lg:text-6xl font-semibold text-chocolate leading-tight mb-6">
            About Henna Foods
          </h1>
          <p className="font-heading text-xl font-medium italic text-cookie-brown max-w-xl mx-auto">
            Elegant Taste. Joyful Moments.
          </p>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-henna">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-card bg-cream">
              <Image
                src="/images/products/duo.jpg"
                alt="A jar of Bukkie's cookies beside a jar of Richie chinchin"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-chocolate mb-6 leading-tight">
                From Our Kitchen to the World
              </h2>
              <div className="gold-divider mb-6" />
              <p className="font-body text-base text-chocolate/70 leading-relaxed mb-5">
                Henna Foods was born from a simple belief: that food made with love and the finest ingredients can bring genuine joy to any moment. From our very first batch of cookies to our golden chinchin, that belief has never wavered.
              </p>
              <p className="font-body text-base text-chocolate/65 leading-relaxed mb-5">
                We create premium treats for people who appreciate the finer things. Every product is a labour of care, from selecting ingredients to perfecting the recipe and presenting it beautifully to the world.
              </p>
              <p className="font-body text-base text-chocolate/65 leading-relaxed">
                Whether you are treating yourself, sharing with friends, or sending a gift to someone you love, Henna Foods is there for those moments when only something truly special will do.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quality" className="section-padding bg-cream">
        <div className="container-henna">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Quality Promise</h2>
            <div className="gold-divider mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <QualityIconCard icon="heart" title="Made with Love" description="Every batch baked with genuine care and attention." />
            <QualityIconCard icon="leaf" title="Premium Ingredients" description="Only the finest ingredients make it into our recipes." />
            <QualityIconCard icon="star" title="Baked to Perfection" description="Consistent quality and signature taste in every piece." />
            <QualityIconCard icon="gift" title="Joy in Every Bite" description="Made to bring happiness to every moment and every person." />
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-henna text-center max-w-2xl mx-auto">
          <h2 className="section-title mb-6">Ready to taste the difference?</h2>
          <p className="font-body text-base text-chocolate/60 leading-relaxed mb-10">
            Every bite carries warmth, beauty, and care. Come taste what Henna Foods is all about.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/cookies" className="btn-primary">Shop Cookies</Link>
            <Link href="/chinchin" className="btn-secondary">Shop Chinchin</Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
