const path = require('path');

// When deploying to production, set the base directory to your Hugo project's root directory.
const baseDir = path.join(__dirname, '..');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    `${baseDir}/themes/**/layouts/**/*.html`,
    `${baseDir}/content/**/layouts/**/*.html`,
    `${baseDir}/layouts/**/*.html`,
    `${baseDir}/content/**/*.html`,
    `${baseDir}/content/**/*.md`,
    `${baseDir}/public/**/*.html`,
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'avenir next', 'avenir', 'segoe ui', 'helvetica neue', 'helvetica', 'Cantarell', 'Ubuntu', 'roboto', 'noto', 'arial', 'sans-serif'],
      },
      colors: {
        'primary': {
          DEFAULT: '#8B1538',
          dark: '#6B0F2A',
          light: '#A31D47',
        },
        'secondary': {
          DEFAULT: '#D4A5A5',
          light: '#E5C5C5',
          dark: '#B38585',
        },
        'accent': {
          DEFAULT: '#C9A961',
          light: '#E0C78A',
          dark: '#A58940',
        },
        'neutral-custom': {
          light: '#F5F1E8',
          dark: '#1a1a1a',
        },
        'warm-grey': '#8B7E74',
      },
    },
  },
  plugins: [],
  variants: ['group-hover'],
}

