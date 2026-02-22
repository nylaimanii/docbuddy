/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { //Test line 2
    extend: {
      theme: {
  extend: {
    fontFamily: {
      yeseva: ["Yeseva One", "serif"],
    },
  },
},
      colors: {
        primary: "#0F766E",
        primaryLight: "#14B8A6",
        accent: "#5EEAD4",
        warning: "#F59E0B",
        danger: "#EF4444",
        background: "#F8FAF9",
        card: "#FFFFFF",
        textMain: "#1E293B",
        textSubtle: "#64748B",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};