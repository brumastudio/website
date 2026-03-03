import type { Metadata } from "next";
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Bruma Studio. Web development and design for businesses in English and Spanish.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Direct",
    value: "hello@brumastudio.dev",
    href: "mailto:hello@brumastudio.dev",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Tijuana, MX — serving clients worldwide",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 hours on business days",
  },
];

const socialLinks = [
  { href: "https://github.com/brumastudio", label: "GitHub", icon: Github },
  { href: "https://x.com/brumastudio", label: "X", icon: Twitter },
  { href: "https://linkedin.com/company/brumastudio", label: "LinkedIn", icon: Linkedin },
  { href: "https://instagram.com/brumastudio", label: "Instagram", icon: Instagram },
];

export default function SummonPage() {
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
                    className="font-body text-base text-grimoire-text hover:text-grimoire-gold transition-colors duration-200"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-body text-base text-grimoire-text">
                    {item.value}
                  </p>
                )}
              </div>
            ))}

            {/* Social */}
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
          </aside>
        </div>
      </section>
    </>
  );
}
