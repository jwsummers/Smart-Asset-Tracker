/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        navy: "#14213D",
        orange: "#FCA311",
        lightGray: "#E5E5E5",
        white: "#FFFFFF",
      },
      height: {
        'screen-map': 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
};
