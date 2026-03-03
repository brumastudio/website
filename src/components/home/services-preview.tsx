import Link from "next/link";
import { Code2, Database, PenTool } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    body: "Custom websites and web applications built with Next.js, React, and TypeScript. Fast, accessible, and built to last.",
    href: "/arts#web-development",
  },
  {
    icon: Database,
    title: "CMS & Content Systems",
    body: "Content management with Sanity CMS and headless WordPress. Edit your site without touching code.",
    href: "/arts#cms",
  },
  {
    icon: PenTool,
    title: "Design & Strategy",
    body: "Brand identity, UI/UX design, and digital strategy. From wireframe to launch, every detail considered.",
    href: "/arts#design",
  },
];

export function ServicesPreview() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Section 01"
          heading="The Arts"
          subheading="What we practice."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-grimoire-surface border border-grimoire-border rounded-lg p-6 md:p-8 hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(201,166,105,0.08)] transition-all duration-300"
            >
              <service.icon className="h-8 w-8 text-grimoire-gold" />
              <h3 className="mt-4 font-display text-lg uppercase tracking-wide text-grimoire-gold">
                {service.title}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-grimoire-text">
                {service.body}
              </p>
              <Link
                href={service.href}
                className="mt-4 inline-block font-ui text-sm font-medium text-grimoire-gold hover:text-grimoire-gold-light transition-colors duration-200"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
