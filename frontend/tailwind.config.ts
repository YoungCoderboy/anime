import { link } from "fs";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        price: "#a3e635",
        discount: "#dc2626",
        stock: "#4B9D71",
        outStock: "#DC2626",
        incdec: "#164e63",
        link: "#3B82F6",
        remove: "#EF4444",
      },
    },
  },
  plugins: [],
};
export default config;
