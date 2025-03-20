import type {Config} from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                lato: "var(--font-lato), sans-serif",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            animation: {
                levitate: "levitate 2s infinite ease-in-out",
            },
            keyframes: {
                levitate: {
                    "0%, 100%": {transform: "translateY(0)"},
                    "50%": {transform: "translateY(-15px)"},
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
