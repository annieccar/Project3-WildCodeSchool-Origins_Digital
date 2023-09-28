/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#010D18",
      orange: "#FF680A",
      white: "#FFFFFF",
      blue: "#1446F5",
      gray: "rgb(148 163 184)",
      red: "rgb(248 113 113)",
      black: "#000000",
      gradient: "linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)",
    },
    extend: {
      fontFamily: {
        primary: "lato",
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
        "blue-gradient":
          "linear-gradient(90deg, #0604CC 0%, rgba(63, 190, 167, 0.80) 100%)",
      },
      gridTemplateRows: {
        14: "repeat(14, minmax(0, 1fr))",
      },
    },
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
