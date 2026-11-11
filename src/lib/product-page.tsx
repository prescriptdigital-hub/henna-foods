import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductView from '@/components/ProductView'
import { buyableSizes, findProduct, productHref } from '@/lib/catalog'
import { getCatalog } from '@/lib/catalog-store'

// Shared by /cookies, /chinchin and /products/[slug]
export async function productMetadata(slug: string): Promise<Metadata> {
  const product = findProduct(await getCatalog(), slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.summary || product.tagline,
    alternates: { canonical: productHref(product.slug) },
    openGraph: product.images[0] ? { images: [{ url: product.images[0].src, alt: product.images[0].alt }] } : undefined,
  }
}

export async function ProductPage({ slug }: { slug: string }) {
  const product = findProduct(await getCatalog(), slug)
  if (!product || !product.visible || buyableSizes(product).length === 0) notFound()
  return <ProductView product={product} />
}
