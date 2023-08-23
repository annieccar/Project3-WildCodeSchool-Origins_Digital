/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#010D18",
      orange: "#FF680A",
      white: "#FFFFFF",
      gray: "rgb(148 163 184)",
    },
    extend: {
      fontFamily: {
        primary: "lato",
      },
    },
  },
  plugins: [],
};
