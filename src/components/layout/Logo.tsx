import Image from "next/image";
import Link from "next/link";

/**
 * Renders the authoritative SYNCra logo asset exactly as supplied —
 * no recreation, no SVG approximation, no recoloring. Sized via CSS
 * only; the source pixels are untouched.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline-none ${className}`}
      aria-label="SYNCra Digital Agency — home"
    >
      <Image
        src="/brand/syncra-logo.png"
        alt="SYNCra Digital Agency"
        width={160}
        height={160}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
