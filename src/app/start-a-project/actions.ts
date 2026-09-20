"use server";

import { prisma } from "@/lib/db";
import { inquirySchema } from "@/lib/validation/inquiry";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/client-ip";
import { sendInquiryNotification } from "@/lib/email";

export type InquiryFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredContact: string;
  description: string;
  budget: string;
  timeline: string;
  currentWebsite: string;
  serviceIds: string[];
};

export type InquiryActionState = {
  status: "idle" | "error" | "success";
  error?: string;
  fieldErrors?: Record<string, string[]>;
  values?: InquiryFormValues;
};

function valuesFromFormData(formData: FormData): InquiryFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    preferredContact: String(formData.get("preferredContact") ?? ""),
    description: String(formData.get("description") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    currentWebsite: String(formData.get("currentWebsite") ?? ""),
    serviceIds: formData.getAll("serviceIds").map(String),
  };
}

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const values = valuesFromFormData(formData);

  // Honeypot: a real visitor never fills this in (it's hidden from
  // sighted and keyboard/screen-reader users alike). A bot that fills
  // every field will trip it. Reject quietly with a generic error —
  // never reveal that a honeypot was the reason.
  const honeypot = String(formData.get("website_url") ?? "");
  if (honeypot.trim() !== "") {
    return {
      status: "error",
      error: "Something went wrong. Please try again.",
      values,
    };
  }

  const ip = await getClientIp();
  const { allowed } = checkRateLimit(`inquiry:${ip}`);
  if (!allowed) {
    return {
      status: "error",
      error: "Too many submissions. Please wait a minute and try again.",
      values,
    };
  }

  const parsed = inquirySchema.safeParse({
    name: values.name,
    company: values.company,
    email: values.email,
    phone: values.phone,
    preferredContact: values.preferredContact,
    description: values.description,
    budget: values.budget,
    timeline: values.timeline,
    currentWebsite: values.currentWebsite,
    serviceIds: values.serviceIds,
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  // Never trust client-supplied service IDs — verify each one is a
  // real, published service before it can be attached to an inquiry.
  const validServices = await prisma.service.findMany({
    where: { id: { in: parsed.data.serviceIds }, published: true },
    select: { id: true, name: true },
  });

  if (validServices.length === 0) {
    return {
      status: "error",
      fieldErrors: { serviceIds: ["Select at least one service"] },
      values,
    };
  }

  let inquiryId: string;
  try {
    const inquiry = await prisma.$transaction(async (tx) => {
      const created = await tx.inquiry.create({
        data: {
          name: parsed.data.name,
          company: parsed.data.company,
          email: parsed.data.email,
          phone: parsed.data.phone,
          preferredContact: parsed.data.preferredContact,
          description: parsed.data.description,
          budget: parsed.data.budget,
          timeline: parsed.data.timeline,
          currentWebsite: parsed.data.currentWebsite,
          status: "NEW",
        },
      });

      await tx.inquiryService.createMany({
        data: validServices.map((service) => ({
          inquiryId: created.id,
          serviceId: service.id,
        })),
      });

      return created;
    });
    inquiryId = inquiry.id;
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return {
      status: "error",
      error: "Something went wrong saving your inquiry. Please try again.",
      values,
    };
  }

  // Email is best-effort — a failed send never undoes the inquiry
  // that's already safely in the database, and never blocks the
  // success response the visitor sees.
  try {
    await sendInquiryNotification({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      phone: parsed.data.phone,
      preferredContact: parsed.data.preferredContact,
      serviceNames: validServices.map((s) => s.name),
      budget: parsed.data.budget,
      timeline: parsed.data.timeline,
      currentWebsite: parsed.data.currentWebsite,
      description: parsed.data.description,
      submittedAt: new Date(),
    });
  } catch (error) {
    console.error(`Notification email failed for inquiry ${inquiryId}:`, error);
  }

  return { status: "success" };
}
