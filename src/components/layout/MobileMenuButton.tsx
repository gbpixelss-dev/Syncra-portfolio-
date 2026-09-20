import { forwardRef } from "react";

export const MobileMenuButton = forwardRef<
  HTMLButtonElement,
  { isOpen: boolean; onClick: () => void }
>(function MobileMenuButton({ isOpen, onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="rounded p-2 text-ink hover:text-deep-sea md:hidden"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      </svg>
    </button>
  );
});
