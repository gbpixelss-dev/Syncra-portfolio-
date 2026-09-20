import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { getPublishedServices } from "@/content/services";
import { getSiteSettings, getWhatsappUrl, getEmailUrl } from "@/lib/site-settings";

export async function Footer() {
  const year = new Date().getFullYear();
  const [services, contact] = await Promise.all([
    getPublishedServices(),
    getSiteSettings(),
  ]);

  return (
    <footer className="border-t border-rule bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              A multidisciplinary digital agency based in Lagos, Nigeria.
            </p>
          </div>

          <div>
            <h2 className="annotation uppercase">Services</h2>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-ink hover:text-deep-sea"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="annotation uppercase">Company</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/portfolio" className="text-sm text-ink hover:text-deep-sea">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ink hover:text-deep-sea">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink hover:text-deep-sea">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/start-a-project"
                  className="text-sm text-ink hover:text-deep-sea"
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="annotation uppercase">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              <li>{contact.location}</li>
              <li>
                <a href={getWhatsappUrl(contact.whatsapp)} className="hover:text-deep-sea">
                  {contact.whatsapp}
                </a>
              </li>
              <li>
                <a href={getEmailUrl(contact.email)} className="hover:text-deep-sea">
                  {contact.email}
                </a>
              </li>
            </ul>

            {/* Renders nothing until real URLs exist in Site Settings
                — no platform is ever shown without a real, supplied
                link. */}
            {contact.socialLinks.length > 0 && (
              <ul className="mt-4 flex gap-3">
                {contact.socialLinks.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      className="text-sm text-ink hover:text-deep-sea"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr className="rule mt-10" />

        <p className="mt-6 text-sm text-muted">
          © {year} SYNCra Digital Agency
        </p>
      </Container>
    </footer>
  );
}
