/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: '"Pretendard Variable", "Pretendard JP Variable", sans-serif',
      serif: '"Nanum Myeongjo", serif',
    },
    extend: {
      animation: {
        "fade-in-down": "fadeInDown 0.5s ease-out",
      },
      keyframes: {
        fadeInDown: {
          "0%": {
            transform: "translateY(-10px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
