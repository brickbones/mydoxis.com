const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      display: ['Hanson Bold', 'sans-serif'],
      body: ['Roboto Slab', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      orange: {
        DEFAULT: '#F6581E',
        50: '#FDDBCF',
        100: '#FCCCBB',
        200: '#FBAF94',
        300: '#F9926C',
        400: '#F87545',
        500: '#F6581E',
        600: '#DD4209',
        700: '#B13507',
        800: '#852805',
        900: '#591A04',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
