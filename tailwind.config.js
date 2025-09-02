/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        veeraBlue: "#0077B6",
        veeraYellow: "#FFD166",
        veeraCoral: "#EF476F",
        veeraGreen: "#06D6A0"
      },
    },
  },
  plugins: [],
};
