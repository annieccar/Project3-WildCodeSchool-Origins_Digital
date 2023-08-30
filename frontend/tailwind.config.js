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
    },
    extend: {
      fontFamily: {
        primary: "lato",
      },
    },
  },
  plugins: [],
};
