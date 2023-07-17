import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#6D3EF4',
        background: colors.white,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
