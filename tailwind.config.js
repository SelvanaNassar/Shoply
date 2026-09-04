/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8FAFC",
        secondary: "#FFFFFF",

        button: "#4F46E5",
        buttonHover: "#4338CA",

        elements: "#EEF2FF",

        success: "#22C55E",

        danger: "#EF4444",
        dangerLight: "#FEE2E2",

        primaryText: "#1F2937",
        secondaryText: "#6B7280",

        navbarText: "#1e3a8a",
        
        border: "#E5E7EB",
        
        rating: "#FBBF24",
        
        boxShadow: "rgba(0,0,0,0.255)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
