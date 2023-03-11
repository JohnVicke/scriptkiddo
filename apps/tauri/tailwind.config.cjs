/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  darkMode: true,
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
