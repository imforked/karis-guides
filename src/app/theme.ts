/**
 * App color system. Lighter tones (cream, sand) dominate surfaces;
 * darker tones (ink, earth) are for text, borders, and emphasis.
 */
export const palette = {
  ink: "#383323",
  earth: "#504437",
  sand: "#BBA387",
  cream: "#EEDFCD",
} as const;

export type Palette = typeof palette;

const { ink, earth, sand, cream } = palette;

/** Passed to styled-components `ThemeProvider` */
export const appTheme = {
  palette,
  layout: {
    /** Largest common phone logical width; desktop shows gutters outside this column */
    appMaxWidth: "430px",
    /** Vertical space for fixed app bar (padding + title line); keeps main content below header */
    appHeaderOffset: "3.25rem",
  },
  color: {
    background: cream,
    foreground: ink,
    surface: `color-mix(in srgb, white 36%, ${cream})`,
    border: `color-mix(in srgb, ${earth} 28%, transparent)`,
    borderStrong: `color-mix(in srgb, ${earth} 45%, transparent)`,
    shadow: `color-mix(in srgb, ${ink} 8%, transparent)`,
    accent: sand,
    textMuted: `color-mix(in srgb, ${earth} 82%, ${cream})`,
  },
} as const;

export type AppTheme = typeof appTheme;
