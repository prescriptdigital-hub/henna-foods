import type { MetadataRoute } from 'next'
import { productHref, SITE_URL, visibleProducts } from '@/lib/catalog'
import { getCatalog } from '@/lib/catalog-store'
import { FEATURES } from '@/lib/site'

const pages = ['', '/shop', ...(FEATURES.wholesale ? ['/wholesale'] : []), '/gallery', '/about', '/contact', '/terms', '/privacy', '/refunds']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = visibleProducts(await getCatalog()).map(p => productHref(p.slug))
  return [...pages, ...products].map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : ['/terms', '/privacy', '/refunds'].includes(path) ? 0.3 : 0.8,
  }))
}
