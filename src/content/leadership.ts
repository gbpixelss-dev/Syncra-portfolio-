/**
 * TEMPORARY DATA BOUNDARY — Phase 6 only.
 *
 * The real, approved CEO identity and biography — not placeholder
 * content. Hardcoded here only because the CMS/database (Phase 7)
 * doesn't exist yet. `photoUrl` is intentionally undefined: no real
 * CEO photograph has been supplied. The shape mirrors the future
 * leadership/profile CMS record (name, title, bio, photo) so
 * swapping this for a real query later doesn't require redesigning
 * the section that consumes it — only supplying a photoUrl.
 */
export type LeadershipProfile = {
  name: string;
  title: string;
  bioParagraphs: readonly string[];
  photoUrl?: string;
  photoAlt?: string;
};

export const CEO: LeadershipProfile = {
  name: "Godwin Bassey Bassey",
  title: "Chief Executive Officer, SYNCra Digital Agency",
  bioParagraphs: [
    "Godwin Bassey Bassey is the Chief Executive Officer of SYNCra Digital Agency, a Lagos-based multidisciplinary digital agency working across technology, design, media, and automation. With over five years of experience in the digital space, he leads the agency's work in bringing different creative and technical disciplines together to build practical digital solutions for businesses.",
    "His approach combines creativity with technology, with a focus on understanding what a project actually needs and delivering the right combination of strategy, design, development, content, and automation. Under his leadership, SYNCra continues to grow as a coordinated digital team built around practical execution and quality work.",
  ],
  // No real photo supplied yet — left undefined rather than pointing
  // at a stock/generated/placeholder image file. The Leadership
  // section renders an honest media-slot state when this is unset.
  photoUrl: undefined,
};
