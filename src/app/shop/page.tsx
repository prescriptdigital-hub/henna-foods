import ProductGrid from '@/components/ProductGrid'
import { visibleProducts } from '@/lib/catalog'
import { getCatalog } from '@/lib/catalog-store'
import Newsletter from '@/components/Newsletter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop',
  description: "Browse all Henna Foods products. Bukkie's Premium Cookies and Richie Premium Chinchin.",
}

export default async function ShopPage() {
  const products = visibleProducts(await getCatalog())
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
            Premium treats, crafted with love and made to be shared.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-henna">
          <ProductGrid products={products} />
        </div>
      </section>

      <Newsletter />
    </>
  )
}
