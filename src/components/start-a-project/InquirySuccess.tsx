import Link from "next/link";
import { getWhatsappUrl, getEmailUrl } from "@/lib/site-settings";
import type { SiteContact } from "@/lib/site-settings";

export function InquirySuccess({ contact }: { contact: SiteContact }) {
  return (
    <div className="rounded-3xl border border-rule bg-steam p-8 text-center shadow-sm transition-all duration-500 sm:p-12">
      {/* Animated Success Icon */}
      <div className="mx-auto flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-green-100 text-green-600">
        <svg
          width="40"
          height="40"
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
            d="M8 12.5l2.5 2.5L16.5 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-5 annotation">Request Sent Successfully</p>

      <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
        Thanks! We&apos;ll contact you shortly.
      </h2>

      <p className="mx-auto mt-4 max-w-prose text-muted">
        Your project inquiry has been received. Our team will reach out through
        your preferred contact method within 24 hours.
      </p>

      {/* Contact Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <a
          href={getWhatsappUrl(contact.whatsapp)}
          aria-label="Chat on WhatsApp"
          className="rounded-full bg-green-500 p-4 text-white transition duration-200 hover:scale-105 hover:bg-green-600 active:scale-95"
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
          className="rounded-full bg-slate-900 p-4 text-white transition duration-200 hover:scale-105 hover:bg-black active:scale-95"
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

      <p className="mt-3 text-sm text-muted">
        Need to follow up? Use the buttons above.
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
