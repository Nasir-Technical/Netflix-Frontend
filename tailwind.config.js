/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React components ke liye paths
  ],
  theme: {
    extend: {
      colors: {
        netflixRed: '#E50914',
        netflixDark: '#141414',
        netflixLight: '#B3B3B3',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};
