import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: "var(--green)",
        crimson: "var(--crimson)",
      },
      fontFamily: {
        poppins: "var(--poppins)",
        josefin: "var(--josefin)",
      },
    },
  },
  plugins: [],
} satisfies Config;
