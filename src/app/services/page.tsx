import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesList } from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SYNCra's six disciplines — web and software development, graphic design, UI/UX design, video production and editing, AI and automation, and social media management — coordinated by one team.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
    </>
  );
}
