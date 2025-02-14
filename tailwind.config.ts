import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      keyframes: {
        slideIn: {
          '0%': { top: '-10px', opacity: '0' },
          '50%': { top: '0', opacity: '1' }
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200px 0'
          },
          '100%': {
            backgroundPosition: '200px 0'
          }
        }
      },

      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #eee, #f5f5f5, #eee)'
      }
    }
  },
  plugins: []
} satisfies Config
