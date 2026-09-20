import { Container } from "@/components/ui/Container";
import type { ProjectSummary } from "@/content/projects";

const SECTIONS: Array<{ key: keyof ProjectSummary; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "process", label: "Process" },
  { key: "results", label: "Results" },
];

/**
 * Renders only the case-study sections that actually have content.
 * A project with none of these fields renders nothing at all — no
 * placeholder headings, no fabricated results.
 */
export function ProjectCaseStudy({ project }: { project: ProjectSummary }) {
  const populated = SECTIONS.filter((section) => project[section.key]);

  if (populated.length === 0) {
    return null;
  }

  return (
    <section>
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2">
        {populated.map((section) => (
          <div key={section.key}>
            <h2 className="annotation uppercase">{section.label}</h2>
            <p className="mt-3 text-ink">{project[section.key] as string}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
