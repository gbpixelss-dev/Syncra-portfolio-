import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SYNCra Digital Agency in Lagos, Nigeria — reach us by WhatsApp or email.",
};

/**
 * Lightweight, separate from the future Start a Project form. Reuses
 * the same approved ClosingCta component/copy as the homepage and
 * About page rather than inventing new CTA copy or building a second
 * contact form.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMethods />
      <ClosingCta />
    </>
  );
}
