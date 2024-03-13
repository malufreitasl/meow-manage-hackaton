/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "white-background": "#FAFAFA",
      "black": "#000000",
      "dark-blue": "#004156",
      "blue-text": "#00344B",
      "blue-card":"#C6EDFF",
      "pink-card":"#FEEAEA",
      "yellow-card":"#FFEFD1",
      "light-blue": "#ECF3F8",
      "gray-text": "#A0B1B4"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
