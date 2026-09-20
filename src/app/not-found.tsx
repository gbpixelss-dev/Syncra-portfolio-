import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="annotation">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-prose text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded bg-deep-sea px-4 py-2 text-sm font-medium text-steam hover:bg-deep-sea-dark"
        >
          Go home
        </Link>
        <Link
          href="/portfolio"
          className="text-sm font-medium text-ink underline decoration-rule underline-offset-4 hover:text-deep-sea hover:decoration-deep-sea"
        >
          View our work
        </Link>
        <Link
          href="/services"
          className="text-sm font-medium text-ink underline decoration-rule underline-offset-4 hover:text-deep-sea hover:decoration-deep-sea"
        >
          Explore services
        </Link>
      </div>
    </Container>
  );
}
