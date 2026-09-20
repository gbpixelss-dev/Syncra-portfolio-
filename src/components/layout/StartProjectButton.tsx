import Link from "next/link";
import { START_PROJECT_LINK } from "@/lib/navigation";

/**
 * The single consistent "Start a Project" CTA used in the header and
 * mobile menu (Footer renders its own text link to the same route,
 * per the locked footer structure). One component keeps the label
 * and styling from drifting between the two places it appears here.
 */
export function StartProjectButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href={START_PROJECT_LINK.href}
      className={`inline-flex items-center justify-center rounded bg-deep-sea px-4 py-2 text-sm font-medium text-steam transition-colors hover:bg-deep-sea-dark ${className}`}
    >
      {START_PROJECT_LINK.label}
    </Link>
  );
}
