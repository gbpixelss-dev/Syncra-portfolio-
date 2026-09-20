import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getAdjacentProjects } from "@/content/projects";

/**
 * Renders only the links that actually exist — a lone published
 * project shows no previous/next controls at all rather than
 * disabled or fake ones.
 */
export async function ProjectNavigation({ slug }: { slug: string }) {
  const { previous, next } = await getAdjacentProjects(slug);

  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Adjacent projects"
      className="border-t border-rule"
    >
      <Container className="flex justify-between py-8">
        {previous ? (
          <Link
            href={`/portfolio/${previous.slug}`}
            className="text-sm font-medium text-ink hover:text-deep-sea"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/portfolio/${next.slug}`}
            className="text-sm font-medium text-ink hover:text-deep-sea"
          >
            {next.title} →
          </Link>
        )}
      </Container>
    </nav>
  );
}
