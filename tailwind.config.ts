import type { Config } from "tailwindcss";

/**
 * SYNCra Digital Agency — Tailwind configuration.
 *
 * Colors and fonts are read from the CSS custom properties defined in
 * src/app/globals.css (the single authoritative token source), so the
 * token VALUES only ever live in one place. Changing a brand color
 * means editing globals.css — never a component, never this file.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-sea": "var(--color-deep-sea)",
        "deep-sea-dark": "var(--color-deep-sea-dark)",
        steam: "var(--color-steam)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        rule: "var(--color-rule)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "var(--container-max-width)",
      },
      spacing: {
        gutter: "var(--gutter)",
      },
      borderRadius: {
        // Deliberately restrained per the approved Blueprint direction —
        // sharp/minimal radius, not the soft rounded-everything look.
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
