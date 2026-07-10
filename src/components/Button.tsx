import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'accent'

type ButtonProps = {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 font-body text-sm font-semibold tracking-wide rounded-pill transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`

  const variants = {
    primary: 'bg-chocolate text-white px-7 py-3.5 hover:bg-[#5a3020] hover:shadow-gold focus:ring-gold',
    secondary: 'bg-transparent border border-gold text-chocolate px-7 py-3.5 hover:bg-gold/10 focus:ring-gold',
    accent: 'bg-rose-red text-white px-7 py-3.5 hover:bg-rose-red-dark focus:ring-rose-red',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
