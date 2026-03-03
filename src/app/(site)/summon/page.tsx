import type { Metadata } from "next";
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import type { SiteSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Bruma Studio. Web development and design for businesses in English and Spanish.",
};

const fallbackSettings: SiteSettings = {
  contactEmail: "hello@brumastudio.dev",
  location: "Tijuana, MX — serving clients worldwide",
  responseTime: "Within 24 hours on business days",
  socialLinks: {
    github: "https://github.com/brumastudio",
    twitter: "https://x.com/brumastudio",
    linkedin: "https://linkedin.com/company/brumastudio",
    instagram: "https://instagram.com/brumastudio",
  },
};

export default async function SummonPage() {
  const sanitySettings = await client.fetch<SiteSettings | null>(siteSettingsQuery);
  const settings = sanitySettings || fallbackSettings;

  const contactInfo = [
    {
      icon: Mail,
      label: "Direct",
      value: settings.contactEmail || fallbackSettings.contactEmail!,
      href: `mailto:${settings.contactEmail || fallbackSettings.contactEmail}`,
    },
    {
      icon: MapPin,
      label: "Based in",
      value: settings.location || fallbackSettings.location!,
    },
    {
      icon: Clock,
      label: "Response time",
      value: settings.responseTime || fallbackSettings.responseTime!,
    },
  ];

  const social = settings.socialLinks || fallbackSettings.socialLinks!;
  const socialLinks = [
    social.github && { href: social.github, label: "GitHub", icon: Github },
    social.twitter && { href: social.twitter, label: "X", icon: Twitter },
    social.linkedin && { href: social.linkedin, label: "LinkedIn", icon: Linkedin },
    social.instagram && { href: social.instagram, label: "Instagram", icon: Instagram },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            Summon
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide">
            Let&rsquo;s Begin
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
            Every great project starts with a conversation. Tell us about your
            vision and we&rsquo;ll take it from there.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <aside className="space-y-10">
            {contactInfo.map((item) => (
              <div key={item.label}>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-grimoire-gold" />
                  <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-grimoire-muted">
                    {item.label}
                  </h3>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-body text-base md:text-lg leading-relaxed text-grimoire-text hover:text-grimoire-gold transition-colors duration-200"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-body text-base md:text-lg leading-relaxed text-grimoire-text">
                    {item.value}
                  </p>
                )}
              </div>
            ))}

            {/* Social */}
            {socialLinks.length > 0 && (
              <div>
                <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-grimoire-muted mb-3">
                  Social
                </h3>
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-grimoire-muted hover:text-grimoire-gold transition-colors duration-200"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
