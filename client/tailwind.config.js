module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        lexendZetta: ["Lexend Zetta", "sans-serif"],
      },
      colors: {
        blue: "#6CD5F3",
        purple: "#7270C6",
      },
    },
  },
  plugins: [],
};
