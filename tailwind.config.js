module.exports = {
  purge: ['pages/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'line-height': 1.5,
            h1: {
              color: theme('colors.indigo.500'),
              'font-weight': theme('fontWeight.bold'),
              'font-size': theme('fontSize.3xl'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
