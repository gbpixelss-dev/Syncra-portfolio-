/**
 * Single source of truth for the public navigation links, shared by
 * DesktopNavigation and MobileNavigation so the two never drift apart.
 * Routes match the locked public route map exactly — nothing here is
 * invented (no Blog/Pricing/Careers/etc).
 */
export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const START_PROJECT_LINK = {
  label: "Start a Project",
  href: "/start-a-project",
} as const;
