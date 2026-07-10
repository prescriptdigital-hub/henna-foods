import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D6A62F',
          dark: '#A87C1B',
        },
        'golden-yellow': '#F4C430',
        cream: '#FFF4E1',
        ivory: '#FFF9EF',
        chocolate: '#3B1F10',
        'rose-red': {
          DEFAULT: '#C41E3A',
          dark: '#8E1220',
        },
        'cookie-brown': '#A65F2B',
        'henna-green': '#4F9B3A',
        'warm-orange': '#F28A2E',
        'toasted-brown': '#8A4B1F',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(59, 31, 16, 0.12)',
        card: '0 8px 24px rgba(59, 31, 16, 0.10)',
        'card-hover': '0 20px 48px rgba(59, 31, 16, 0.18)',
        'gold': '0 0 0 3px rgba(214, 166, 47, 0.25)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      backgroundImage: {
        'cream-gradient': 'linear-gradient(135deg, #FFF4E1 0%, #FBE6C4 50%, #FFF4E1 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D6A62F 0%, #F4C430 100%)',
        'chocolate-gradient': 'linear-gradient(135deg, #3B1F10 0%, #4B2413 100%)',
        'cookies-placeholder': 'linear-gradient(145deg, #FBE6C4 0%, #D4A574 30%, #A65F2B 70%, #4B2413 100%)',
        'chinchin-placeholder': 'linear-gradient(145deg, #FFF3D8 0%, #F4C430 35%, #E8A735 65%, #8A4B1F 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
