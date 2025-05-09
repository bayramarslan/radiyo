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
				background: "var(--color-background)",
				foreground: "var(--color-foreground)",
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
			},
		},
	},
	plugins: [],
} satisfies Config;
