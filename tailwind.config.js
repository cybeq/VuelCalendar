/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      fontFamily: {
        mulish: 'Mulish, sans-serif'
      },
      fontSize:{
        'xl-important':['2.25rem',{important:true}]
      },
      minHeight: {
        'screen-minus-navbar': `calc(theme('height.screen') - theme('height.16'))`
      },
      colors: {
        surface: {
          50: '#ececec',
          100: '#cbcfd2',
          200: '#a7adb2',
          300: '#8b929a',
          400: '#767b8d',

        },
        primary: {
          0: '#70b672',
          100: '#5078b4',
          200: '#ac56a3',
          300: '#848388',
          400: '#94a3b8',
          500: '#fc9559',
        }
      }
    }
  },
  plugins: [],
}

