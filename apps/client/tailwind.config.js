import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#398BB8',
        background: colors.gray['50'],
      },
    },
  },
  plugins: [],
}
