"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

/**
 * Route-segment error boundary. Never renders the raw error message
 * or stack to the visitor — that's server-logged only via
 * console.error here, which appears in server/runtime logs, not the
 * client bundle.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary:", error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="annotation">Error</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-prose text-muted">
        Sorry about that — please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded bg-deep-sea px-4 py-2 text-sm font-medium text-steam hover:bg-deep-sea-dark"
      >
        Try again
      </button>
    </Container>
  );
}
