import type { ReactNode } from "react";

/**
 * Container — the single responsive page-width primitive.
 *
 * Every page-level section should wrap its content in this rather than
 * re-implementing max-width/gutter logic locally. Gutter width scales
 * via the --gutter custom property defined in globals.css (1rem on
 * mobile, 1.5rem from md, 2rem from lg) so responsive spacing changes
 * happen in exactly one place.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-container px-[var(--gutter)] ${className}`}
    >
      {children}
    </div>
  );
}
