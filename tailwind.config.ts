import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    screens: {
      'sm': '400px',
      'md': '769px',
      'lg': '1024px',
      'h-sm': {
        raw: '(max-height: 800px)'
      }
    },
    extend: {
      colors: {
        gray: {
            100: "#fffdfa",
            200: "#eeece9",
            300: "#bbb9b6",
            400: "#999794",
            500: "#777571",
            600: "#555350",
            700: "#333130",
            800: "#111010",
            900: "#000000"
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      'geist': "var(--font-geist-sans)",
      'geist-mono': "var(--font-geist-mono)"
    },
    transitionTimingFunction: {
      expo: 'cubic-bezier(.3, 1, .16, 1)'
    }
  },
  plugins: [],
} satisfies Config;