import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          black: "#0A0A0A",
          coal: "#161616",
          slate: "#2a2a2e",
          bone: "#F5F0E8",
          ash: "#b9b4ab",
          mute: "#6f6f78",
          neon: "#FF1744",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      keyframes: {
        kenburns: {
          from: { transform: "scale(1.04) translate(0,0)" },
          to: { transform: "scale(1.18) translate(-2%,-3%)" },
        },
        glowpulse: {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
        ctaPulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,23,68,.5)" },
          "50%": { boxShadow: "0 0 0 14px rgba(255,23,68,0)" },
        },
        scrollHint: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "70%": { transform: "translateY(9px)", opacity: "0.15" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        kenburns: "kenburns 26s ease-in-out infinite alternate",
        glowpulse: "glowpulse 7s ease-in-out infinite",
        ctaPulse: "ctaPulse 2.6s ease-in-out infinite",
        scrollHint: "scrollHint 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
