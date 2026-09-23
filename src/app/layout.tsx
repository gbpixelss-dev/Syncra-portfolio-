import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CinematicBackground } from "@/components/ui/CinematicBackground";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SYNCra Digital Agency",
  description: "Premium Digital Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${space.variable} ${mono.variable} bg-[#050816] text-white antialiased`}
      >
        <CinematicBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
