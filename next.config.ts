import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Product photos uploaded from the admin dashboard live in Vercel Blob storage
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
}

export default nextConfig
