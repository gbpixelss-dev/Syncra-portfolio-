import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { Technologies } from "@/components/home/Technologies";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Homepage — locked section order (Header/Footer render in the root
 * layout, not here):
 * Hero → Services preview → Selected projects → Technologies →
 * Who we are → Testimonials (data-dependent) → Closing CTA
 *
 * SelectedProjects, Technologies, and Testimonials each render
 * nothing when their underlying content array is empty — see the
 * corresponding files in src/content/. Nothing here fabricates data
 * to fill the gap.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <SelectedProjects />
      <Technologies />
      <WhoWeAre />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
