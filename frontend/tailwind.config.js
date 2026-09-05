/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        ns: {
          black: '#010101',     // Never Settle Jet Black Base
          dark: '#0a2540',      // Never Settle --main-dark Navy
          navy: '#090e18',      // Never Settle Dark Card Container
          slate: '#0f182c',     // Never Settle Elevated Card
          gold: '#b58153',      // Never Settle Warm Gold / Bronze
          champagne: '#ffebbf', // Never Settle Light Gold
          yellow: '#fcd34d',    // Never Settle Highlight Yellow
          white: '#ffffff',     // Never Settle Pure White
        },
        primary: {
          50: '#fffbeb',
          100: '#ffebbf',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#e0b438',
          500: '#b58153', // Never Settle Main Gold
          600: '#966336',
          700: '#754924',
          800: '#543216',
          900: '#38200b',
        },
      },
      backgroundImage: {
        'ns-hero': 'radial-gradient(ellipse at 50% -20%, #0a2540 0%, #090e18 60%, #010101 100%)',
        'ns-gold': 'linear-gradient(135deg, #ffebbf 0%, #b58153 100%)',
        'ns-gold-hover': 'linear-gradient(135deg, #ffffff 0%, #ffebbf 50%, #b58153 100%)',
        'ns-glow': 'radial-gradient(circle, rgba(255,235,191,0.1) 0%, rgba(181,129,83,0.04) 70%, transparent 100%)',
        'ns-card': 'linear-gradient(135deg, rgba(10, 37, 64, 0.4) 0%, rgba(9, 14, 24, 0.9) 100%)',
      },
      boxShadow: {
        'ns-gold': '0 2px 8px rgba(181, 129, 83, 0.25), 0 1px 3px rgba(0, 0, 0, 0.5)',
        'ns-card': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'ns-hover': '0 6px 16px rgba(0, 0, 0, 0.6), 0 0 12px rgba(181, 129, 83, 0.2)',
      },
    },
  },
  plugins: [],
};
