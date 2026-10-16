import Image from 'next/image'
import Link from 'next/link'

// Official Henna Foods logo artwork (source file: assets/brand-source/).
const LOGO = { src: '/images/brand/logo.png', width: 912, height: 466 }

type HennaLogoProps = {
  size?: 'sm' | 'md' | 'lg'
  href?: string
  priority?: boolean
}

const heights = { sm: 44, md: 64, lg: 104 }

export default function HennaLogo({ size = 'md', href = '/', priority = false }: HennaLogoProps) {
  const height = heights[size]
  const width = Math.round((LOGO.width / LOGO.height) * height)

  const logo = (
    <Image
      src={LOGO.src}
      alt="Henna Foods"
      width={width}
      height={height}
      priority={priority}
      className="block select-none"
      style={{ width, height }}
    />
  )

  if (!href) return logo

  return (
    <Link href={href} aria-label="Henna Foods home" className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
      {logo}
    </Link>
  )
}
