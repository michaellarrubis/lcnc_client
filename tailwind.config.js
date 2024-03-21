/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        stolzlBook: ['Stolzl Book', 'sans-serif'],
        stolzlRegular: ['Stolzl Regular', 'sans-serif'],
        stolzlMedium: ['Stolzl Medium', 'sans-serif'],
        stolzlBold: ['Stolzl Bold', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif']
      }
    },
    colors: {
      white: '#ffffff',
      gray: {
        0: '#A6A6A6',
        50: '#d5d5d5',
        100: '#808182',
        200: '#2b2d2e',
        300: '#36383d',
        400: '#222222',
        500: '#343434',
        600: '#F4F4F4',
        700: '#EEEEEE'
      },
      error: '#E43B26',
      readonly: '#F7F7F7',
      disabled: '#d3d4d6',
      delete: '#E56367',
      input: '#232932',
      formHead: '#222222'
    },
    borderRadius: {
      DEFAULT: '4px',
      default: '4px',
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px'
    }
  },
  plugins: []
};
