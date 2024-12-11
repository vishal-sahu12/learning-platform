/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        card: "var(--card-background)",
        text: "var(--text-color)",
        subtext: "var(--subtext-color)",
        highlight: "var(--highlight-color)",
        button: "var(--button-bg)",
        "button-hover": "var(--button-hover-bg)",
        footer: "var(--footer-bg)",
      },
    },
  },
  plugins: [],
}