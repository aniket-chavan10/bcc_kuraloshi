/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        'custom-yellow': '#f9ce34',
        'custom-pink': '#ee2a7b',
        'custom-purple': '#6228d7',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #f9ce34, #ee2a7b, #6228d7)',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
