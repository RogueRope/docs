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
        'cherry-blossom': {
          50: '#fbeff1',
          100: '#f8dfe3',
          200: '#f4d0d5',
          300: '#f1c0c7',
          400: '#de6d7e',
          DEFAULT: '#edafb8',
          500: '#edafb8',
          600: '#edafb8',
          700: '#ca2e45',
          800: '#871f2e',
          900: '#430f17',
        },
        'champagne-pink': {
          50: '#fdf9f7',
          100: '#fcf4f0',
          200: '#faeee8',
          300: '#f9e8e0',
          400: '#e8a98b',
          DEFAULT: '#f7e1d7',
          500: '#f7e1d7',
          600: '#f7e1d7',
          700: '#d96f3e',
          800: '#9b461f',
          900: '#4e230f',
        },
        'timberwolf': {
          50: '#f8f8f6',
          100: '#f2f1ed',
          200: '#ebeae5',
          300: '#e5e3dc',
          400: '#bab4a1',
          DEFAULT: '#dedbd2',
          500: '#dedbd2',
          600: '#dedbd2',
          700: '#958b6f',
          800: '#645d4a',
          900: '#322f25',
        },
        'ash-gray': {
          50: '#eff3ef',
          100: '#e0e7e0',
          200: '#d0dbd0',
          300: '#c0d0c1',
          400: '#86a488',
          DEFAULT: '#b0c4b1',
          500: '#b0c4b1',
          600: '#b0c4b1',
          700: '#607f62',
          800: '#405541',
          900: '#202a21',
        },
        'outer-space': {
          50: '#d9dfdf',
          100: '#b3bec0',
          200: '#8e9ea0',
          300: '#6a7c7f',
          400: '#3b4647',
          DEFAULT: '#4a5759',
          500: '#4a5759',
          600: '#4a5759',
          700: '#2d3435',
          800: '#1e2324',
          900: '#0f1112',
        },
      },
    },
  },
  plugins: [],
  variants: ['group-hover'],
}

