import { StartProjectButton } from "@/components/layout/StartProjectButton";

/**
 * Uses the same shared StartProjectButton as the header/homepage so
 * the CTA label/styling never drifts. Query-param service
 * preselection is intentionally not implemented yet — the Start a
 * Project form itself doesn't exist until a later phase.
 */
export function ServiceCta() {
  return <StartProjectButton className="px-5 py-3 text-base" />;
}
