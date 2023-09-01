/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#010D18",
      orange: "#FF680A",
      white: "#FFFFFF",
      blue: "#031E37",
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
        "orange-gradient": "linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)",
      },
    },
  },
  plugins: [],
};
