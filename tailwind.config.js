/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"], 
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        accent: "#E50914",
        card: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
