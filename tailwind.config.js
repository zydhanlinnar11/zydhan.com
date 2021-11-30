module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      height: {
        px52: '52px',
      },
      minHeight: {
        px52: '52px',
      },
      backdropBlur: {
        20: '20px',
      },
      saturate: {
        180: '1.80',
      },
      divideColor: {
        main: 'rgba(255,255,255,0.24)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
