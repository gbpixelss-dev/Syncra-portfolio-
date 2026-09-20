import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * Typography — approved direction:
 *  - Space Grotesk: display + body (geometric sans)
 *  - JetBrains Mono: functional/technical data only (never decorative)
 *
 * next/font self-hosts these at build time (no runtime request to
 * Google Fonts, no layout shift) and exposes them as CSS variables
 * consumed by globals.css / tailwind.config.ts — the token system
 * stays the single source of truth either way.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Homepage identity metadata. Description reuses the locked hero
 * supporting copy verbatim rather than a separately invented summary.
 * Full per-page SEO (Open Graph images, sitemap, robots, structured
 * data) is Phase 10 — this establishes the root identity only.
 */
const SITE_DESCRIPTION =
  "SYNCra is a multidisciplinary digital agency based in Lagos, Nigeria. We design, build, and automate — so the different parts of your project are handled by one coordinated team, instead of being split across vendors who each only see their own piece of it.";

export const metadata: Metadata = {
  // Only set when a real deployment URL is configured — never an
  // invented/placeholder domain. Without it, relative URLs (e.g. in
  // Open Graph tags) simply stay relative, which is fine pre-launch.
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  title: {
    default: "SYNCra Digital Agency",
    template: "%s — SYNCra Digital Agency",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "SYNCra Digital Agency",
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-deep-sea focus:px-4 focus:py-2 focus:text-steam"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
