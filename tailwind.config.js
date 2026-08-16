/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF8FB",
          100: "#FFF0F5",
          200: "#FFE3EE",
          300: "#FFD6E8",
          400: "#FFC1DB",
          500: "#FFB6C1",
          600: "#FF8FAB",
          700: "#FF6F9C",
          800: "#E85D89",
        },
        cream: "#FFFBF7",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        rounded: ["'Quicksand'", "sans-serif"],
        body: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(255, 143, 171, 0.35)",
        dreamy: "0 8px 24px -8px rgba(232, 93, 137, 0.25)",
      },
      backgroundImage: {
        "blush-gradient": "linear-gradient(135deg, #FFF0F5 0%, #FFE3EE 50%, #FFD6E8 100%)",
        "petal-gradient": "linear-gradient(160deg, #FFFBF7 0%, #FFF0F5 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: 0.3, transform: "scale(0.9)" },
          "50%": { opacity: 1, transform: "scale(1.1)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
