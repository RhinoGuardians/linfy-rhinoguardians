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
} as const;

