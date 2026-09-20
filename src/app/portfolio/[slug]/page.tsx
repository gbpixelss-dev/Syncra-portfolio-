import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProjects, getProjectBySlug } from "@/content/projects";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";

type ProjectPageParams = { slug: string };

export async function generateStaticParams(): Promise<ProjectPageParams[]> {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<ProjectPageParams>;
}) {
  const { slug } = await params;
  // getProjectBySlug only resolves published projects — a draft or
  // unknown slug both fall through to notFound() identically, so a
  // project like an unconfirmed reference can never leak publicly.
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
