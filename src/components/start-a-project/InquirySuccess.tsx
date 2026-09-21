import Link from "next/link";
import { Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { getWhatsappUrl, getEmailUrl } from "@/lib/site-settings";
import type { SiteContact } from "@/lib/site-settings";

export function InquirySuccess({ contact }: { contact: SiteContact }) {
  return (
    <div className="rounded-3xl border border-rule bg-steam p-8 text-center shadow-sm sm:p-12">
      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

      <p className="mt-4 annotation">Request Sent Successfully</p>

      <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
        Thanks! We'll contact you shortly.
      </h2>

      <p className="mx-auto mt-4 max-w-prose text-muted">
        Your project inquiry has been received. Our team will reach out through
        your preferred contact method as soon as possible.
      </p>

      <div className="mt-8 flex justify-center gap-5">
        <a
          href={getWhatsappUrl(contact.whatsapp)}
          aria-label="Chat on WhatsApp"
          className="rounded-full bg-green-500 p-4 text-white transition hover:scale-105 hover:bg-green-600"
        >
          <MessageCircle size={24} />
        </a>

        <a
          href={getEmailUrl(contact.email)}
          aria-label="Send Email"
          className="rounded-full bg-slate-900 p-4 text-white transition hover:scale-105 hover:bg-black"
        >
          <Mail size={24} />
        </a>
      </div>

      <p className="mt-3 text-sm text-muted">
        Prefer direct contact? Tap an icon above.
      </p>

      <Link
        href="/portfolio"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-rule px-6 py-3 text-sm font-medium text-ink transition hover:border-deep-sea hover:text-deep-sea"
      >
        Explore Our Portfolio
      </Link>
    </div>
  );
}
