const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              scrollMarginTop: '6rem',
            },
            h3: {
              scrollMarginTop: '6rem',
            },
            code: {
              wordBreak: 'break-all',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
