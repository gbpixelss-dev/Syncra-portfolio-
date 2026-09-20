import { cache } from "react";
import { prisma } from "@/lib/db";

/**
 * DATA SOURCE — Phase 8.
 *
 * The database (Service table) is now the source of truth for
 * name/slug/shortDescription/description/published. `capabilities`
 * and `exampleProjectTypes` are NOT yet fields in the Prisma schema
 * (the CMS doesn't manage them yet), so they remain static
 * supplementary content here, merged in by slug — this is documented
 * clearly so it's never mistaken for a second competing source of
 * the CMS-managed fields.
 *
 * FALLBACK_SERVICES mirrors the exact seeded content (prisma/seed.ts)
 * and is used only if the database is empty or unreachable — the
 * public site must never go blank because of a database hiccup or a
 * not-yet-run migration/seed.
 */
export type ServiceSummary = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  capabilities: readonly string[];
  exampleProjectTypes: readonly string[];
};

const SUPPLEMENTARY: Record<
  string,
  { capabilities: readonly string[]; exampleProjectTypes: readonly string[] }
> = {
  "web-software-development": {
    capabilities: ["Web Development", "Full-Stack Development"],
    exampleProjectTypes: [
      "Business/company websites",
      "E-commerce sites",
      "Admin-driven platforms",
      "Custom web applications",
    ],
  },
  "graphic-design": {
    capabilities: ["Flyers", "Branding collateral", "Campaign graphics"],
    exampleProjectTypes: [
      "Flyers",
      "Promotional graphics",
      "Brand collateral",
      "Social campaign visuals",
    ],
  },
  "ui-ux-design": {
    capabilities: ["Digital product/interface design", "UX design"],
    exampleProjectTypes: [
      "App interface design",
      "Website UX/wireframing",
      "Product design for a client's own dev team to implement",
    ],
  },
  "video-production-editing": {
    capabilities: ["Promotional video", "Social video", "Video editing"],
    exampleProjectTypes: [
      "Promotional videos",
      "Social video content",
      "Edited footage for client campaigns",
    ],
  },
  "ai-automation": {
    capabilities: ["AI Solutions / AI", "AI Automation", "Workflow Automation"],
    exampleProjectTypes: [
      "Automated workflows",
      "AI-assisted tools/integrations built for a client's business process",
    ],
  },
  "social-media-management": {
    capabilities: ["Ongoing social media management", "Content support"],
    exampleProjectTypes: [
      "Ongoing content calendars",
      "Social account management",
      "Campaign support",
    ],
  },
};

const FALLBACK_SERVICES: readonly ServiceSummary[] = [
  {
    name: "Web & Software Development",
    slug: "web-software-development",
    description: "Building websites and web applications, front-end through full-stack.",
    ...SUPPLEMENTARY["web-software-development"]!,
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    description: "Visual design for brands and print/digital materials.",
    ...SUPPLEMENTARY["graphic-design"]!,
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Designing how digital products look and function.",
    ...SUPPLEMENTARY["ui-ux-design"]!,
  },
  {
    name: "Video Production & Editing",
    slug: "video-production-editing",
    description: "Editing and producing video content.",
    ...SUPPLEMENTARY["video-production-editing"]!,
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    description: "Applying AI tools and workflow automation to how a business operates.",
    ...SUPPLEMENTARY["ai-automation"]!,
  },
  {
    name: "Social Media Management",
    slug: "social-media-management",
    description: "Ongoing management and content support for a client's social presence.",
    ...SUPPLEMENTARY["social-media-management"]!,
  },
];

function toSummary(row: {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
}): ServiceSummary {
  const supplementary = SUPPLEMENTARY[row.slug] ?? {
    capabilities: [],
    exampleProjectTypes: [],
  };
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.shortDescription,
    ...supplementary,
  };
}

export const getPublishedServices = cache(
  async (): Promise<readonly ServiceSummary[]> => {
    try {
      const rows = await prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      });
      // DB reachable but not yet seeded — show the real approved six
      // rather than a blank site.
      if (rows.length === 0) return FALLBACK_SERVICES;
      return rows.map(toSummary);
    } catch {
      return FALLBACK_SERVICES;
    }
  }
);

export const getServiceBySlug = cache(
  async (slug: string): Promise<ServiceSummary | undefined> => {
    const services = await getPublishedServices();
    return services.find((service) => service.slug === slug);
  }
);
