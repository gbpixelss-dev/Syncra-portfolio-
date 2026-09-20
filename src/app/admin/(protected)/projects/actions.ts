"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdminSession, UnauthorizedError } from "@/lib/authz";
import { projectSchema, type ProjectMediaRowInput } from "@/lib/validation/project";
import type { ActionResult } from "@/lib/admin-action-result";

function parseProjectForm(formData: FormData) {
  const mediaRows: ProjectMediaRowInput[] = [];
  const mediaCount = Number(formData.get("mediaCount") ?? 0);
  for (let i = 0; i < mediaCount; i++) {
    const url = formData.get(`media[${i}].url`);
    // Skip rows the admin left completely empty (added then not used).
    if (!url || String(url).trim() === "") continue;
    mediaRows.push({
      type: (formData.get(`media[${i}].type`) as "IMAGE" | "VIDEO" | "EMBED") ?? "IMAGE",
      url: String(url),
      thumbnailUrl: String(formData.get(`media[${i}].thumbnailUrl`) ?? ""),
      alt: String(formData.get(`media[${i}].alt`) ?? ""),
      caption: String(formData.get(`media[${i}].caption`) ?? ""),
      order: Number(formData.get(`media[${i}].order`) ?? i),
      isHero: formData.get(`media[${i}].isHero`) === "on",
    });
  }

  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    client: formData.get("client"),
    summary: formData.get("summary"),
    overview: formData.get("overview"),
    challenge: formData.get("challenge"),
    solution: formData.get("solution"),
    process: formData.get("process"),
    results: formData.get("results"),
    liveUrl: formData.get("liveUrl"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    serviceIds: formData.getAll("serviceIds"),
    technologyIds: formData.getAll("technologyIds"),
    media: mediaRows,
  });
}

function revalidatePublicProjectPages(slug?: string, serviceSlugs: string[] = []) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  if (slug) revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/portfolio/[slug]", "page");
  for (const serviceSlug of serviceSlugs) {
    revalidatePath(`/services/${serviceSlug}`);
  }
}

async function serviceSlugsFor(serviceIds: string[]): Promise<string[]> {
  if (serviceIds.length === 0) return [];
  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds } },
    select: { slug: true },
  });
  return services.map((s) => s.slug);
}

export async function createProject(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, error: "You must be signed in." };
    }
    throw error;
  }

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { serviceIds, technologyIds, media, ...projectFields } = parsed.data;

  try {
    const project = await prisma.project.create({
      data: {
        ...projectFields,
        services: { create: serviceIds.map((serviceId) => ({ serviceId })) },
        technologies: {
          create: technologyIds.map((technologyId) => ({ technologyId })),
        },
        media: {
          create: media.map((m) => ({
            type: m.type,
            url: m.url,
            thumbnailUrl: m.thumbnailUrl,
            alt: m.alt,
            caption: m.caption,
            order: m.order,
            isHero: m.isHero,
          })),
        },
      },
    });
    revalidatePublicProjectPages(project.slug, await serviceSlugsFor(serviceIds));
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { slug: ["A project with this slug already exists."] },
      };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, error: "You must be signed in." };
    }
    throw error;
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Project not found." };
  }

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { serviceIds, technologyIds, media, ...projectFields } = parsed.data;

  // Same safer rule as Services: a published project's slug is locked
  // once published, enforced server-side regardless of form input.
  const nextSlug = existing.published ? existing.slug : parsed.data.slug;

  try {
    await prisma.$transaction([
      prisma.project.update({
        where: { id },
        data: { ...projectFields, slug: nextSlug },
      }),
      prisma.projectService.deleteMany({ where: { projectId: id } }),
      prisma.projectTechnology.deleteMany({ where: { projectId: id } }),
      prisma.projectMedia.deleteMany({ where: { projectId: id } }),
      ...(serviceIds.length
        ? [
            prisma.projectService.createMany({
              data: serviceIds.map((serviceId) => ({ projectId: id, serviceId })),
            }),
          ]
        : []),
      ...(technologyIds.length
        ? [
            prisma.projectTechnology.createMany({
              data: technologyIds.map((technologyId) => ({
                projectId: id,
                technologyId,
              })),
            }),
          ]
        : []),
      ...(media.length
        ? [
            prisma.projectMedia.createMany({
              data: media.map((m) => ({
                projectId: id,
                type: m.type,
                url: m.url,
                thumbnailUrl: m.thumbnailUrl,
                alt: m.alt,
                caption: m.caption,
                order: m.order,
                isHero: m.isHero,
              })),
            }),
          ]
        : []),
    ]);

    const allServiceSlugs = new Set([
      ...(await serviceSlugsFor(serviceIds)),
    ]);
    revalidatePublicProjectPages(existing.slug, [...allServiceSlugs]);
    if (nextSlug !== existing.slug) revalidatePublicProjectPages(nextSlug);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { slug: ["A project with this slug already exists."] },
      };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdminSession();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.project.delete({ where: { id } });
  revalidatePublicProjectPages(existing.slug);
  redirect("/admin/projects");
}
