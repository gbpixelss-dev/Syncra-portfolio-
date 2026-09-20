import { Container } from "@/components/ui/Container";
import { getSiteSettings, getWhatsappUrl, getEmailUrl } from "@/lib/site-settings";

export async function ContactMethods() {
  const contact = await getSiteSettings();

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="annotation uppercase">Location</h2>
            <p className="mt-2 text-lg text-ink">{contact.location}</p>
          </div>

          <div>
            <h2 className="annotation uppercase">WhatsApp</h2>
            <a
              href={getWhatsappUrl(contact.whatsapp)}
              className="mt-2 block text-lg text-ink hover:text-deep-sea"
            >
              {contact.whatsapp}
            </a>
          </div>

          <div>
            <h2 className="annotation uppercase">Email</h2>
            <a
              href={getEmailUrl(contact.email)}
              className="mt-2 block break-all text-lg text-ink hover:text-deep-sea"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {contact.socialLinks.length > 0 && (
          <div className="mt-10">
            <h2 className="annotation uppercase">Social</h2>
            <ul className="mt-2 flex gap-4">
              {contact.socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    className="text-ink hover:text-deep-sea"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
