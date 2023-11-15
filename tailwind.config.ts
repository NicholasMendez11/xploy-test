const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkmode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)"],
        monserrat: ["var(--font-monserrat)"],
      },
      colors: {
        primary: "#1a202c",
        secondary: "#e2e8f0",
        accent: "#f56565",
      },
      dark: {
        primary: "#e2e8f0",
        secondary: "#1a202c",
      },
    },
  },
  plugins: [],
});