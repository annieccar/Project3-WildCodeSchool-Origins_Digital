/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#010D18",
      orange: "#FF680A",
      white: "#FFFFFF",
      gradientOrange: "[linear-gradient(90deg, #FF8200 0%, #FF2415 100%))]",
    },
    extend: {
      fontFamily: {
        primary: "lato",
      },
    },
  },
  plugins: [],
};
