import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Studio palette: ivory / concrete / near-black + single warm accent
        ivory: "#F4F1EA",
        paper: "#EDE9E0",
        concrete: {
          100: "#E4E0D7",
          200: "#CFCABF",
          300: "#A9A399",
          400: "#7C776E",
          500: "#565049",
        },
        ink: "#171614",
        accent: "#B4602F", // terracotta / clay
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
