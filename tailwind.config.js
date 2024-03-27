/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        nav: '0px 6px 15px 0px #404F680D'
      },
    },
  },
  plugins: [],
}

