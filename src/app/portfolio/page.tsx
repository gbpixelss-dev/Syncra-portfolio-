import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioBrowser } from "@/components/portfolio/PortfolioBrowser";
import { getPublishedProjects, getTechnologiesInUse } from "@/content/projects";
import { getPublishedServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work from SYNCra Digital Agency.",
};

type SearchParams = {
  service?: string;
  technology?: string;
  q?: string;
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [projects, services, technologiesInUse] = await Promise.all([
    getPublishedProjects(),
    getPublishedServices(),
    getTechnologiesInUse(),
  ]);

  return (
    <>
      <PortfolioHero />
      <Container className="py-8 sm:py-12">
        <PortfolioBrowser
          projects={projects}
          services={services}
          technologiesInUse={technologiesInUse}
          initialService={params.service ?? ""}
          initialTechnology={params.technology ?? ""}
          initialQuery={params.q ?? ""}
        />
      </Container>
    </>
  );
}
