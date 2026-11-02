/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FAF8F5",
          dark: "#121418"
        },
        navy: {
          900: "#141F36",
          800: "#1F2F4F",
          700: "#2B3F68"
        },
        terracotta: {
          DEFAULT: "#C4623A",
          dark: "#A84E29",
          light: "#E37E55"
        },
        neutralCard: {
          light: "#F3EEE8",
          dark: "#1B1F27"
        }
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"]
      },
      fontSize: {
        display: ["28px", { lineHeight: "34px", fontWeight: "600" }],
        title: ["20px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        supporting: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "500" }]
      },
      minHeight: { touch: "44px" },
      minWidth: { touch: "44px" }
    }
  },
  plugins: []
};
