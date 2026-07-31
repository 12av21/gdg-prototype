/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6fe',
          100: '#ddebfd',
          200: '#c2dcfc',
          300: '#99c5fa',
          400: '#68a3f6',
          500: '#437ef1',
          600: '#2b5ee6',
          700: '#2349d4',
          800: '#223cb0',
          900: '#20368c',
          950: '#172355',
        },
        cyber: {
          dark: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          accent: '#00F0FF',
          emerald: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
