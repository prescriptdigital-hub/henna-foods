import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/catalog'
import { FEATURES } from '@/lib/site'

const pages = ['', '/shop', '/cookies', '/chinchin', ...(FEATURES.wholesale ? ['/wholesale'] : []), '/gallery', '/about', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
