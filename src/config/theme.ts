// RhinoGuardians tokens are semantic on purpose so we can evolve the brand
// without rewriting component-level class names later.
export const themeTokens = {
  brand: {
    forest: "139 26% 34%",
    moss: "94 22% 42%",
    sand: "40 22% 92%",
    slate: "206 19% 18%",
    alert: "12 76% 54%",
  },
  semantic: {
    bgCanvas: "40 22% 96%",
    bgSurface: "0 0% 100%",
    bgSurfaceElevated: "44 29% 98%",
    textPrimary: "206 19% 15%",
    textMuted: "206 12% 38%",
    borderSubtle: "120 10% 83%",
    brandPrimary: "139 26% 34%",
    brandSecondary: "94 22% 42%",
    statusDanger: "12 76% 54%",
    statusSuccess: "132 33% 38%",
  },
  dashboard: {
    bgCanvas: "210 22% 8%",
    bgSurface: "210 20% 12%",
    bgSurfaceElevated: "210 18% 16%",
    textPrimary: "48 25% 95%",
    textMuted: "210 12% 72%",
    borderSubtle: "210 14% 22%",
    brandPrimary: "145 38% 42%",
    brandSecondary: "152 24% 59%",
  },
} as const;
