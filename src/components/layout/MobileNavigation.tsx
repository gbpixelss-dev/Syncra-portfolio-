"use client";

import { useEffect, useRef } from "react";
import { NAV_LINKS, START_PROJECT_LINK } from "@/lib/navigation";
import { NavLink } from "./NavLink";

/**
 * Full-screen mobile navigation panel.
 *
 * Behavior implemented here:
 *  - focus moves into the panel (to its close button) when opened
 *  - Tab/Shift+Tab is trapped within the panel while open
 *  - Escape closes the panel
 *  - background scroll is locked while open
 *  - focus restoration to the trigger button is the caller's
 *    responsibility (handled in Header, which owns the trigger)
 *  - motion is a simple opacity/transform transition only, and is
 *    skipped entirely under prefers-reduced-motion via CSS
 */
export function MobileNavigation({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      hidden={!isOpen}
      className="fixed inset-0 z-50 flex flex-col bg-surface motion-safe:transition-opacity motion-safe:duration-150 md:hidden"
    >
      <div className="flex items-center justify-end px-[var(--gutter)] py-4">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="rounded p-2 text-ink hover:text-deep-sea"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>

      <nav
        aria-label="Mobile primary"
        className="flex flex-1 flex-col justify-center gap-6 px-[var(--gutter)] pb-16"
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-2xl font-medium"
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink
          href={START_PROJECT_LINK.href}
          onClick={onClose}
          className="mt-4 inline-flex w-fit rounded bg-deep-sea px-5 py-3 text-lg font-medium text-steam hover:text-steam"
        >
          {START_PROJECT_LINK.label}
        </NavLink>
      </nav>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
