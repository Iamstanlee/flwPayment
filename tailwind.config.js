const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      "1/4": "27%",
    },
    minWidth: {
      sm: "25%",
    },
    extend: {
      fontFamily: {
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        flw: "#f5a623",
      },
      letterSpacing: {
        widest: "0.5em",
      },
    },
    screens: {
      xsm: "375px",
      sm: "660px",
      // => @media (min-width: 660px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      mx: "900px",
      // => @media (min-width: 900px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {},
  },
};
