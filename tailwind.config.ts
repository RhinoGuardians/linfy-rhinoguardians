import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--bg-canvas) / <alpha-value>)",
        surface: "hsl(var(--bg-surface) / <alpha-value>)",
        "surface-elevated": "hsl(var(--bg-surface-elevated) / <alpha-value>)",
        "text-primary": "hsl(var(--text-primary) / <alpha-value>)",
        "text-muted": "hsl(var(--text-muted) / <alpha-value>)",
        "border-subtle": "hsl(var(--border-subtle) / <alpha-value>)",
        "brand-primary": "hsl(var(--brand-primary) / <alpha-value>)",
        "brand-secondary": "hsl(var(--brand-secondary) / <alpha-value>)",
        "status-danger": "hsl(var(--status-danger) / <alpha-value>)",
        "status-success": "hsl(var(--status-success) / <alpha-value>)",
      },
      boxShadow: {
        card: "0 20px 45px -24px rgba(17, 24, 39, 0.22)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(90, 140, 96, 0.18), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
