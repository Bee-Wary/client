const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "petal-white": "var(--petal-white)",
        "pineapple-yellow": "var(--pineapple-yellow)",
        "dusty-green": "var(--dusty-green)",
        "tiki-torch-grey": "var(--tiki-torch-grey)",
        "off-black": "var(--off-black)",
        
        "positive-green": "var(--positive-green)",
        "negative-red": "var(--negative-red)",
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui()
  ]
}

