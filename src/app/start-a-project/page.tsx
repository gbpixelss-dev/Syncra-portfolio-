import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StartProjectHero } from "@/components/start-a-project/StartProjectHero";
import { StartProjectForm } from "@/components/start-a-project/StartProjectForm";
import { prisma } from "@/lib/db";
import { getSiteSettings, getWhatsappUrl, getEmailUrl } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell SYNCra Digital Agency about your project — development, design, video, or automation.",
};

export default async function StartAProjectPage() {
  const contact = await getSiteSettings();

  // The inquiry form needs REAL database service IDs (not the
  // public content layer's slug-only fallback) because the Server
  // Action validates selected services against real Service rows.
  // If the database is unreachable or not yet seeded, the form
  // can't be meaningfully submitted — show a direct-contact state
  // instead of a form that would always reject with a confusing
  // "select a service" error.
  let services: { id: string; name: string }[] = [];
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: { id: true, name: true },
    });
  } catch {
    services = [];
  }

  return (
    <>
      <StartProjectHero />
      <Container className="py-16 sm:py-24">
        {services.length > 0 ? (
          <StartProjectForm services={services} contact={contact} />
        ) : (
          <div className="max-w-2xl rounded border border-rule bg-steam p-8">
            <p className="text-ink">
              The project form isn&apos;t available right now.
            </p>
            <p className="mt-2 text-muted">
              Reach us directly instead — WhatsApp:{" "}
              <a
                href={getWhatsappUrl(contact.whatsapp)}
                className="text-deep-sea hover:text-deep-sea-dark"
              >
                {contact.whatsapp}
              </a>{" "}
              or email:{" "}
              <a
                href={getEmailUrl(contact.email)}
                className="text-deep-sea hover:text-deep-sea-dark"
              >
                {contact.email}
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
