import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StartProjectHero } from "@/components/start-a-project/StartProjectHero";
import { StartProjectForm } from "@/components/start-a-project/StartProjectForm";
import { prisma } from "@/lib/db";
import {
  getSiteSettings,
  getWhatsappUrl,
  getEmailUrl,
} from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell SYNCra Digital Agency about your project — development, design, video, or automation.",
};

export default async function StartAProjectPage() {
  const contact = await getSiteSettings();

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
        <div className="mx-auto max-w-3xl">
          {services.length > 0 ? (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                  Let&apos;s Build Something Amazing
                </h2>

                <p className="mt-3 text-muted">
                  Fill the form below and our team will reach out within 24
                  hours.
                </p>
              </div>

              <StartProjectForm services={services} contact={contact} />

              <div className="mt-8 flex justify-center gap-4">
                <a
                  href={getWhatsappUrl(contact.whatsapp)}
                  aria-label="Chat on WhatsApp"
                  className="rounded-full bg-green-500 p-4 text-white transition hover:scale-105 hover:bg-green-600"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 12a8 8 0 1 1-14.6-4.5L4 21l4.7-1.3A8 8 0 0 1 20 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 9.5c.3-.7.7-.8 1-.8.2 0 .4 0 .6.4.2.4.6 1.4.7 1.5.1.2.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.3.3-.1.7.2.4.8 1.3 1.8 2 .8.6 1.4.8 1.7.9.3.1.5 0 .7-.2.2-.2.6-.7.8-.9.2-.2.4-.2.6-.1.2.1 1.3.6 1.5.7.2.1.3.2.3.4 0 .2-.3 1-.9 1.3-.6.3-1.3.4-2.1.2-.8-.2-1.8-.7-2.9-1.6-1.4-1.1-2.3-2.5-2.6-3.3-.3-.8-.3-1.5.1-2.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href={getEmailUrl(contact.email)}
                  aria-label="Send Email"
                  className="rounded-full bg-slate-900 p-4 text-white transition hover:scale-105 hover:bg-black"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6h16v12H4z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-rule bg-surface p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16.5" r="1" fill="currentColor" />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-ink">
                We&apos;re temporarily unavailable
              </h3>

              <p className="mx-auto mt-3 max-w-md text-muted">
                The inquiry form is currently unavailable, but you can still
                reach us directly using the buttons below.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <a
                  href={getWhatsappUrl(contact.whatsapp)}
                  aria-label="Chat on WhatsApp"
                  className="rounded-full bg-green-500 p-4 text-white transition hover:scale-105 hover:bg-green-600"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 12a8 8 0 1 1-14.6-4.5L4 21l4.7-1.3A8 8 0 0 1 20 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 9.5c.3-.7.7-.8 1-.8.2 0 .4 0 .6.4.2.4.6 1.4.7 1.5.1.2.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.3.3-.1.7.2.4.8 1.3 1.8 2 .8.6 1.4.8 1.7.9.3.1.5 0 .7-.2.2-.2.6-.7.8-.9.2-.2.4-.2.6-.1.2.1 1.3.6 1.5.7.2.1.3.2.3.4 0 .2-.3 1-.9 1.3-.6.3-1.3.4-2.1.2-.8-.2-1.8-.7-2.9-1.6-1.4-1.1-2.3-2.5-2.6-3.3-.3-.8-.3-1.5.1-2.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href={getEmailUrl(contact.email)}
                  aria-label="Send Email"
                  className="rounded-full bg-slate-900 p-4 text-white transition hover:scale-105 hover:bg-black"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6h16v12H4z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
