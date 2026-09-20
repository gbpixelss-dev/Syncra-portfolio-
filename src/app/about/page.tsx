import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutProseSection } from "@/components/about/AboutProseSection";
import { WhatWeDoSection } from "@/components/about/WhatWeDoSection";
import { LeadershipSection } from "@/components/about/LeadershipSection";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "SYNCra is a multidisciplinary digital agency based in Lagos, Nigeria, working across development, design, video, and AI-driven automation as one coordinated team.",
};

/**
 * Locked section order: About SYNCra → Who We Are → What We Do →
 * How We Work → Why SYNCra → Leadership → Experience → Closing CTA
 * (Footer renders globally in the root layout). ClosingCta is the
 * same approved component/copy used on the homepage — reused rather
 * than duplicated.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <AboutProseSection heading="Who We Are">
        <p>
          SYNCra is a multidisciplinary digital agency based in Lagos,
          Nigeria, operating for over five years. We work across
          development, design, video, and AI-driven automation — building
          the digital pieces businesses need, under one team.
        </p>
      </AboutProseSection>

      <WhatWeDoSection />

      <AboutProseSection heading="How We Work" tinted>
        <p>
          Projects are handled by the same team across disciplines, rather
          than being handed off between departments or outsourced
          piecemeal. The person designing a page understands how it will be
          built. The team automating a workflow understands the business
          it&apos;s built for.
        </p>
      </AboutProseSection>

      <AboutProseSection heading="Why SYNCra">
        <p>
          Clients work with SYNCra because the work is handled by one team
          with real, delivered experience — not a network of freelancers
          assembled per project. Over five years of operating across
          multiple disciplines means the different parts of a project are
          coordinated from the start, not reconciled after the fact.
        </p>
      </AboutProseSection>

      <LeadershipSection />

      <AboutProseSection heading="Experience">
        <p>
          Over five-plus years, SYNCra has delivered more than a dozen
          website projects and completed over 800 graphic design projects,
          alongside a growing body of video and AI/automation work.
        </p>
      </AboutProseSection>

      <ClosingCta />
    </>
  );
}
