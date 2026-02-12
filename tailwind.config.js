/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      
        'earth': 'var(--color-earth)',
        'wheat': 'var(--color-wheat)',
        'fresh': 'var(--color-fresh)',
        'fresh-light': 'var(--color-fresh-light)',
        'pink-red': 'var(--color-pink-red)',
        'cream': 'var(--bg-secondary)',
        'main-text': 'var(--text-main)',
      },fontFamily: {
        'poppins': ['var(--font-main)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

