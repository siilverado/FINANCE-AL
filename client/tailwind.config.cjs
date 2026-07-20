/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        segoeScript: ['Segoe Script', 'cursive'],
      },
      backgroundImage: {
        'tenis': "url('/src/assets/home-bg.jpg')",
        'tenis-desktop': "url('/src/assets/desktop.jpg')",
        'home': "url('https://www.rere.jp/beginners/uploads/2019/09/i-471621500-3-1024x667.jpg')"
      }
    },
    colors: {
      "white": "white",
      "primary": "#4CAF50",
      "secondary": "#F5F5F5",
      "gradone": "#E0E0E0",
      "gradtwo": "#72DFC5",
      "bg": '#E8F5E9'
    }
  },
  plugins: [],
};


