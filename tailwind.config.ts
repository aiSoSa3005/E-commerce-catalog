import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        sans: ["Inter", "sans-serif"], // Set Inter as default
      },
    },
  },
  plugins: [],
} satisfies Config;
