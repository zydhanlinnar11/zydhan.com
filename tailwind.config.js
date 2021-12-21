module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
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
    },
  },
  plugins: [],
}
