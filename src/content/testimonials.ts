import { cache } from "react";
import { prisma } from "@/lib/db";

/**
 * DATA SOURCE — Phase 8. No real testimonials have been supplied
 * yet, so the fallback is empty — never a fabricated quote.
 */
export type TestimonialSummary = {
  id?: string;
  clientName: string;
  companyRole?: string;
  text: string;
};

const FALLBACK_TESTIMONIALS: readonly TestimonialSummary[] = [];

export const getPublishedTestimonials = cache(
  async (): Promise<readonly TestimonialSummary[]> => {
    try {
      const rows = await prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      });
      return rows.map((row) => ({
        id: row.id,
        clientName: row.name,
        companyRole:
          [row.role, row.company].filter(Boolean).join(", ") || undefined,
        text: row.quote,
      }));
    } catch {
      return FALLBACK_TESTIMONIALS;
    }
  }
);
