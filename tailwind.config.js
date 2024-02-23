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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#f3f3f3',
          500: '#e2e1f1',
          600: '#eaeaea',
          700: '#eee8c7'
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

