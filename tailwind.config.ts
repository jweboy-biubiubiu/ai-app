import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#00eaff",
        },
        button: "linear-gradient(90deg, #3b82f6, #06b6d4)",
      },
      boxShadow: {
        textarea: "0 4px 15px rgba(0, 200, 255, 0.5)",
        button: "0 4px 10px rgba(0, 200, 255, 0.4)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
