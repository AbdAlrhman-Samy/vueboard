/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-light": "#F7FAFF",
        "bg-dark": "#5840BB",
        "main": "#42427D",
        "main-soft": "#5840BB",
        "secondary": "#7979B2",
        "secondary-soft": "#A0AAC8",
        "light": "#F3F6FF",
        "orders": "#C7F2FF",
        "profit": "#FFE5EE"
      },
      
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
};
