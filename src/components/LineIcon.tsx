type LineIconProps = {
  name: 'mail' | 'pin' | 'clock' | 'truck' | 'return'
  size?: number
  color?: string
}

export default function LineIcon({ name, size = 20, color = '#D6A62F' }: LineIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'mail' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5 12 13l8.5-6.5" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
          <circle cx="12" cy="10" r="2.4" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </>
      )}
      {name === 'truck' && (
        <>
          <path d="M2.5 6.5h11v9h-11z" />
          <path d="M13.5 9.5h4l3 3v3h-7" />
          <circle cx="6.5" cy="17.5" r="1.8" />
          <circle cx="17" cy="17.5" r="1.8" />
        </>
      )}
      {name === 'return' && (
        <>
          <path d="M4 12a8 8 0 1 0 2.4-5.7" />
          <path d="M4 4v4.5h4.5" />
        </>
      )}
    </svg>
  )
}
