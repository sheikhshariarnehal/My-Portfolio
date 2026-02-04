/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary colors from original CSS
        primary: {
          DEFAULT: '#2b3dda',
          dark: '#1a047e',
          light: '#2506ad',
        },
        accent: {
          DEFAULT: '#fc8c05',
          orange: '#ff7b00',
          yellow: '#ffd900',
          gold: '#ffae00',
        },
        navy: {
          DEFAULT: '#0e2431',
          dark: '#02094b',
          deeper: '#000031',
          deepest: '#00002b',
        },
        purple: {
          brand: '#7303a7',
          dark: '#420177',
          gradient: {
            start: '#57059e',
            end: '#4a00e0',
          },
        },
        blue: {
          link: '#011aff',
          info: '#00d9ff',
          hover: '#0685da',
        },
        gray: {
          light: '#f7f7f7',
          bg: '#e5ecfb',
          text: '#333333',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'Poppins-fallback', 'sans-serif'],
        nunito: ['Nunito', 'Nunito-fallback', 'sans-serif'],
      },
      fontSize: {
        // Base 62.5% = 10px, so rem values match original
        'xs': ['1.2rem', { lineHeight: '1.5' }],
        'sm': ['1.4rem', { lineHeight: '1.5' }],
        'base': ['1.6rem', { lineHeight: '1.5' }],
        'lg': ['1.8rem', { lineHeight: '1.5' }],
        'xl': ['2rem', { lineHeight: '1.4' }],
        '2xl': ['2.5rem', { lineHeight: '1.3' }],
        '3xl': ['3rem', { lineHeight: '1.2' }],
        '4xl': ['3.5rem', { lineHeight: '1.1' }],
        '5xl': ['5rem', { lineHeight: '1.1' }],
      },
      spacing: {
        // Percentage-based paddings
        'section': '9%',
        'header': '10%',
      },
      animation: {
        'spin-slow': 'spin 0.8s linear infinite',
        'pound': 'pound 0.35s infinite alternate',
      },
      keyframes: {
        pound: {
          to: { transform: 'scale(1.1)' },
        },
      },
      boxShadow: {
        'btn': '0px 5px 18px rgba(48, 68, 247, 0.6)',
        'btn-sm': '0px 5px 10px rgba(48, 68, 247, 0.6)',
        'card': '0.2rem 0.5rem 1rem rgba(0, 0, 0, 0.2)',
        'card-hover': '1rem 0.5rem 1.2rem rgba(0, 0, 0, 0.3)',
        'header': '0 1px 4px rgba(146, 161, 176, 0.3)',
        'skill': '0 4px 10px rgba(0, 0, 0, 0.2)',
        'skill-hover': '0 8px 10px rgba(0, 2, 68, 0.8)',
      },
      borderRadius: {
        'pill': '4em',
      },
      zIndex: {
        'header': '1000',
        'loader': '10000',
      },
    },
  },
  plugins: [],
  // Important: Keep existing classes working
  corePlugins: {
    preflight: false, // Don't reset base styles - keeps original CSS working
  },
}
