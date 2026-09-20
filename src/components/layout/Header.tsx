"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { MobileMenuButton } from "./MobileMenuButton";
import { StartProjectButton } from "./StartProjectButton";

/**
 * Global header. Owns the mobile menu open state so it can restore
 * focus to the trigger button when the panel closes (whether closed
 * via the close button, a nav link, or Escape).
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-surface">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Logo />
        <DesktopNavigation />

        {/* Mobile: persistent CTA stays visible next to the trigger,
            per the locked spec — it is never hidden inside the menu. */}
        <div className="flex items-center gap-2 md:hidden">
          <StartProjectButton className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" />
          <MobileMenuButton
            ref={triggerRef}
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          />
        </div>
      </Container>

      <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
