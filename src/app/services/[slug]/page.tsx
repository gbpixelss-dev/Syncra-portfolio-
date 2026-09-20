import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedServices, getServiceBySlug } from "@/content/services";
import { ServiceDetail } from "@/components/services/ServiceDetail";

type ServicePageParams = { slug: string };

export async function generateStaticParams(): Promise<ServicePageParams[]> {
  const services = await getPublishedServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
