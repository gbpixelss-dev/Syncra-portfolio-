import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StartProjectHero } from "@/components/start-a-project/StartProjectHero";
import { StartProjectForm } from "@/components/start-a-project/StartProjectForm";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell SYNCra Digital Agency about your project — development, design, video, or automation.",
};

const FALLBACK_SERVICES = [
  { id: "web-development", name: "Web Development" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "ui-ux-design", name: "UI/UX Design" },
  { id: "brand-identity", name: "Brand Identity" },
  { id: "video-editing", name: "Video Editing" },
  { id: "motion-graphics", name: "Motion Graphics" },
  { id: "social-media-design", name: "Social Media Design" },
  { id: "automation", name: "Automation" },
];

export default async function StartAProjectPage() {
  const contact = await getSiteSettings();

  let services = FALLBACK_SERVICES;

  try {
    const dbServices = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: { id: true, name: true },
    });

    if (dbServices.length > 0) {
      services = dbServices;
    }
  } catch {
    // Keep fallback services so the form always works.
  }

  return (
    <>
      <StartProjectHero />
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-rule bg-surface p-8 shadow-sm sm:p-12">
          <div className="mb-8 text-center">
            <p className="annotation">Start Your Project</p>

            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Let&apos;s build something premium.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted">
              Tell us what you need, choose a service, and we&apos;ll reach out
              through your preferred contact method within 24 hours.
            </p>
          </div>

          <StartProjectForm services={services} contact={contact} />
        </div>
      </Container>
    </>
  );
}                  
