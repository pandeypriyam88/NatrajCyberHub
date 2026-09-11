/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0F2438',
          800: '#16324A',
        },
        brand: {
          50: '#EEF5F5',
          100: '#D7E9E8',
          200: '#A9D0CD',
          300: '#75B3AE',
          400: '#3F8F88',
          500: '#1F6F68',
          600: '#155C57',
          700: '#0F4744',
          800: '#0C3735',
          900: '#082625',
        },
        sun: {
          100: '#FFF3DC',
          300: '#FFD98A',
          500: '#F2A93B',
          600: '#DB8B1D',
        },
        whatsapp: {
          500: '#25D366',
          600: '#1FAF56',
          700: '#178B45',
        },
        paper: '#FBF9F4',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Mukta"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 0 0 rgba(15, 36, 56, 0.06), 0 10px 24px -14px rgba(15, 36, 56, 0.35)',
        pop: '0 8px 24px -8px rgba(15, 36, 56, 0.45)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
