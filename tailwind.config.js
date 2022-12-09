/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: '"Pretendard Variable", "Pretendard JP Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Hiragino Sans", "Apple SD Gothic Neo", Meiryo, "Noto Sans JP", "Noto Sans KR", "Malgun Gothic", Osaka, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
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
