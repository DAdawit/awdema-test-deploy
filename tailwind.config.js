/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#113F57",
        secondary: "#CF1523",
        btnPrimary: "#15ADB7",
        textPrimary: "#15ADB7",
        last: "#C87959",
        hoverColor: "#2575a0",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
