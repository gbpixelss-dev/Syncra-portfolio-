"use client";

import { useEffect } from "react";

/**
 * Global error boundary — only triggers if the ROOT layout itself
 * throws (vs. error.tsx, which handles errors within a page/segment
 * while the layout keeps working). Next.js requires this file to
 * render its own <html>/<body>, since it replaces the layout
 * entirely, so it intentionally doesn't depend on globals.css or the
 * Header/Footer components in case those are implicated in the
 * failure — plain inline styles only, kept minimal on purpose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#1b2124",
          background: "#ffffff",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Something went wrong
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#6e7a7d", maxWidth: "32rem" }}>
          Sorry about that — please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            borderRadius: "3px",
            border: "none",
            background: "#156874",
            color: "#ede6e6",
            padding: "0.6rem 1.2rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
