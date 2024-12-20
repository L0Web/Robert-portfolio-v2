import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
