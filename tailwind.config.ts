import type { Config } from "tailwindcss";

export default {
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
        borderBrand: "var(--borderBrand)",
        backgroundBrand: "var(--backgroundBrand)",
        textBrand: "var(--textBrand)",
      },
    },
  },
  plugins: [],
} satisfies Config;
