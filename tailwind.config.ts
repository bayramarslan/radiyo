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
				background: "rgb(var(--background))",
				foreground: "rgb(var(--foreground))",
				primary: "rgb(var(--color-primary))",
				secondary: "rgb(var(--color-secondary))",
			},
			screens: {
				xs: { max: "380px" },
			},
		},
	},
	plugins: [],
} satisfies Config;
