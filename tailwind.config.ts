import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "surface-1": "rgb(var(--surface-1) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",

        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",

        border: "rgb(var(--border) / <alpha-value>)",

        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",

        "accent-alt": "rgb(var(--accent-alt) / <alpha-value>)",
        "accent-alt-soft": "rgb(var(--accent-alt-soft) / <alpha-value>)",

        // States (fixed for now)
        success: "#2ED573",
        warning: "#F7B731",
        danger: "#FF4757",
      },

      boxShadow: {
        soft: "0 0 0 1px rgb(var(--border) / 0.40)",
        accent:
          "0 0 0 1px rgb(var(--accent) / 0.35), 0 18px 50px rgb(var(--accent) / 0.18)",
      },

      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },

  plugins: [],
}

export default config
