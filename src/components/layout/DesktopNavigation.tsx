import { NAV_LINKS } from "@/lib/navigation";
import { NavLink } from "./NavLink";
import { StartProjectButton } from "./StartProjectButton";

/**
 * Visible from the `md` breakpoint up — MobileNavigation (with the
 * hamburger trigger) takes over below that. See globals.css / the
 * --gutter system for the shared responsive spacing this sits inside.
 */
export function DesktopNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-8 md:flex"
    >
      {NAV_LINKS.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
      <StartProjectButton />
    </nav>
  );
}
