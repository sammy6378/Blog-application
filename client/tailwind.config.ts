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
      screens: {
        "700": "700px",
        "800": "800px",
        "500": "500px",
        "400": "400px",
        "300px": "300px",
        "200px": "200px",
        "100px": "100px",
      }
    },
  },
  plugins: [],
} satisfies Config;
