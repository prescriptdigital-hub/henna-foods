import Link from 'next/link'

type HennaLogoProps = {
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export default function HennaLogo({ size = 'md', href = '/' }: HennaLogoProps) {
  const scales = {
    sm: { henna: 'text-xl', foods: 'text-[9px]', petal: 22 },
    md: { henna: 'text-2xl', foods: 'text-[10px]', petal: 26 },
    lg: { henna: 'text-4xl', foods: 'text-[14px]', petal: 38 },
  }
  const s = scales[size]

  const logo = (
    <div className="inline-flex flex-col items-start select-none">
      <div className="relative">
        <span
          className={`font-heading ${s.henna} font-semibold leading-none tracking-wide`}
          style={{ color: '#D6A62F' }}
        >
          Henna
        </span>
        <svg
          width={s.petal}
          height={s.petal}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="absolute"
          style={{ top: `-${s.petal * 0.45}px`, right: `-${s.petal * 0.35}px` }}
        >
          <g transform="translate(16 16)">
            <ellipse cx="0" cy="-7" rx="2.8" ry="5.5" fill="#C41E3A" transform="rotate(-55)" opacity="0.95"/>
            <ellipse cx="0" cy="-7" rx="2.8" ry="5.5" fill="#D6A62F" transform="rotate(-22)" opacity="0.95"/>
            <ellipse cx="0" cy="-7" rx="2.8" ry="5.5" fill="#F4C430" transform="rotate(12)" opacity="0.95"/>
            <ellipse cx="0" cy="-7" rx="2.8" ry="5.5" fill="#F26A3D" transform="rotate(46)" opacity="0.95"/>
            <ellipse cx="0" cy="-7" rx="2.8" ry="5.5" fill="#4F9B3A" transform="rotate(78)" opacity="0.95"/>
            <circle cx="0" cy="0" r="1.8" fill="#FFF9EF"/>
          </g>
        </svg>
      </div>
      <span
        className={`font-body ${s.foods} font-bold tracking-[0.22em] uppercase leading-none -mt-0.5`}
        style={{ color: '#C41E3A' }}
      >
        FOODS
      </span>
    </div>
  )

  if (!href) return logo

  return (
    <Link href={href} className="inline-flex focus:outline-none focus:ring-2 focus:ring-gold rounded-sm">
      {logo}
    </Link>
  )
}
