import ProductCard from '@/components/ProductCard'
import Newsletter from '@/components/Newsletter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop',
  description: "Browse all Henna Foods products. Bukkie's Premium Cookies and Richie Premium Chinchin.",
}

export default function ShopPage() {
  return (
    <>
      <section className="py-16 lg:py-20 bg-ivory border-b border-gold/20">
        <div className="container-henna text-center">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
            All Products
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-chocolate mb-4">
            The Henna Collection
          </h1>
          <p className="font-body text-base text-chocolate/60 max-w-lg mx-auto">
            Two premium products, crafted with love and made to be shared.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-henna">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ProductCard
              name="Bukkie's Premium Cookies"
              tagline="Rich. Buttery. Unforgettable."
              description="Golden-baked cookies with delicious chocolate chips, crafted with premium ingredients for a warm, joyful treat. Perfect for gifting and sharing."
              href="/cookies"
              badge="Best Seller"
              variant="cookies"
            />
            <ProductCard
              name="Richie Premium Chinchin"
              tagline="Crunchy. Joyful. Delicious."
              description="A golden crunchy snack made for sharing, celebration, and everyday enjoyment. Joy in every single bite."
              href="/chinchin"
              badge="New"
              variant="chinchin"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
