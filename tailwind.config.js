/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6", // Light background color from the image
        primary: "#0E2B3D", // Dark teal color for text/buttons
        secondary: "#184252", // Lighter teal
        accent1: "#E8EAF6", // Light purple card background
        accent2: "#E0F2F1", // Light teal card background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
