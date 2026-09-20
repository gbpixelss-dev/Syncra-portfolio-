import Link from "next/link";
import { getWhatsappUrl, getEmailUrl } from "@/lib/site-settings";
import type { SiteContact } from "@/lib/site-settings";

export function InquirySuccess({ contact }: { contact: SiteContact }) {
  return (
    <div className="rounded border border-rule bg-steam p-8 text-center sm:p-12">
      <p className="annotation">Received</p>
      <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
        Project inquiry received.
      </h2>
      <p className="mx-auto mt-4 max-w-prose text-muted">
        We&apos;ve got your details and will be in touch. In the meantime,
        you can reach us directly.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <a
          href={getWhatsappUrl(contact.whatsapp)}
          className="text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
        >
          WhatsApp: {contact.whatsapp}
        </a>
        <a
          href={getEmailUrl(contact.email)}
          className="text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
        >
          {contact.email}
        </a>
      </div>
      <Link
        href="/portfolio"
        className="mt-8 inline-block text-sm font-medium text-ink underline decoration-rule underline-offset-4 hover:text-deep-sea hover:decoration-deep-sea"
      >
        View our work
      </Link>
    </div>
  );
}
