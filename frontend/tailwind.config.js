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
    },
    extend: {
      fontFamily: {
        primary: "lato",
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
      },
    },
  },
  plugins: [],
};
