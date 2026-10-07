import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/catalog'

const pages = ['', '/shop', '/cookies', '/chinchin', '/wholesale', '/about', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
