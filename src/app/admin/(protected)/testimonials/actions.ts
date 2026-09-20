"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdminSession, UnauthorizedError } from "@/lib/authz";
import { testimonialSchema } from "@/lib/validation/testimonial";
import type { ActionResult } from "@/lib/admin-action-result";

function parseTestimonialForm(formData: FormData) {
  return testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    quote: formData.get("quote"),
    published: formData.get("published") === "on",
  });
}

function revalidatePublicTestimonials() {
  revalidatePath("/");
}

export async function createTestimonial(
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

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.testimonial.create({ data: parsed.data });
    revalidatePublicTestimonials();
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/testimonials");
}

export async function updateTestimonial(
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

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.testimonial.update({ where: { id }, data: parsed.data });
    revalidatePublicTestimonials();
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdminSession();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePublicTestimonials();
  redirect("/admin/testimonials");
}
