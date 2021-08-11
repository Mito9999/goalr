module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      inter: ["Inter, Helvetica, sans-serif"],
    },
    extend: {
      colors: {},
      width: {
        container: "1010px",
      },
      height: {
        hero: "540px",
        min: "min-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
