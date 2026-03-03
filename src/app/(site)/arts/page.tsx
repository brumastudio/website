import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Database, PenTool, type LucideIcon } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { SectionHeader } from "@/components/section-header";
import { GoldDivider } from "@/components/gold-divider";
import { client } from "@/lib/sanity";
import { allServicesQuery } from "@/lib/queries";
import type { Service } from "@/lib/types";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, CMS solutions, and design strategy. We build with Next.js, Sanity CMS, and headless WordPress.",
};

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  PenTool,
};

const fallbackServices: Service[] = [
  {
    _id: "fallback-1",
    title: "Web Development",
    slug: { current: "web-development" },
    subtitle: "The Core Discipline",
    icon: "Code2",
    features: [
      "Custom Next.js development",
      "Responsive design (mobile-first)",
      "Performance optimization",
      "SEO best practices baked in",
      "API integrations",
      "Vercel deployment & hosting",
      "Accessibility (WCAG 2.2 AA)",
      "Post-launch support available",
    ],
    order: 1,
  },
  {
    _id: "fallback-2",
    title: "CMS & Content Systems",
    slug: { current: "cms" },
    subtitle: "The Living Architecture",
    icon: "Database",
    features: [
      "Sanity Studio setup & customization",
      "Headless WordPress development",
      "Custom content schemas",
      "Visual editing & live preview",
      "Content migration from existing sites",
      "Team training & documentation",
      "Multi-language content support",
      "Structured content modeling",
    ],
    order: 2,
  },
  {
    _id: "fallback-3",
    title: "Design & Strategy",
    slug: { current: "design" },
    subtitle: "The Blueprint",
    icon: "PenTool",
    features: [
      "UI/UX design (Figma)",
      "Brand identity & visual systems",
      "Wireframing & prototyping",
      "Design system creation",
      "Competitive analysis",
      "Digital strategy & roadmapping",
      "Content strategy",
      "Conversion optimization guidance",
    ],
    order: 3,
  },
];

const fallbackBodies: Record<string, string[]> = {
  "Web Development": [
    "We build fast, accessible, custom websites and web applications — from marketing sites and landing pages to complex platforms and dashboards.",
    "Our stack is Next.js, React, and TypeScript, deployed on Vercel for speed and reliability. Every project is hand-crafted. We don't use page builders or drag-and-drop tools. The result is cleaner code, faster load times, and a site that scales with your business.",
  ],
  "CMS & Content Systems": [
    "A website is only as powerful as its content system. We build with Sanity CMS and headless WordPress — modern content platforms that give you full control over every page, post, and product without needing a developer for every update.",
    "Headless CMS means your content is separate from your design. Update text, swap images, publish blog posts — all from an intuitive editing interface. We set it up so your team can manage it independently.",
  ],
  "Design & Strategy": [
    "Great development starts with great design and a clear plan. We offer UI/UX design, brand identity, and digital strategy as standalone services or as part of a full-build project.",
    "Whether you need a complete visual identity, a set of Figma mockups before development begins, or strategic guidance on your digital presence, we approach every project with intention and restraint.",
  ],
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    body: "We listen first. Understand your goals, audience, and constraints. Every project begins with clarity.",
  },
  {
    number: "02",
    title: "Design",
    body: "Wireframes, mockups, and prototypes in Figma. You see the vision before a single line of code is written.",
  },
  {
    number: "03",
    title: "Development",
    body: "Clean, hand-crafted code. Regular check-ins and staging previews so you're never in the dark.",
  },
  {
    number: "04",
    title: "Delivery",
    body: "Launch, testing, and handoff. Documentation for your team. Optional ongoing support to keep things running.",
  },
];

export default async function ArtsPage() {
  const sanityServices = await client.fetch<Service[]>(allServicesQuery);
  const services =
    sanityServices && sanityServices.length > 0
      ? sanityServices
      : fallbackServices;

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            The Arts
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide">
            What We Practice
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
            We specialize in a focused set of disciplines — modern web
            development, content management systems, and design strategy. Every
            service is delivered with the same standard: hand-crafted,
            performance-first, and built to evolve.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => {
        const Icon = iconMap[service.icon || ""] || Code2;
        const anchorId = service.slug?.current || service.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <section
            key={service._id}
            id={anchorId}
            className="px-6 py-24 md:py-32 scroll-mt-24"
          >
            <div className="mx-auto max-w-6xl">
              {i > 0 && <GoldDivider className="mb-16 mt-0" />}

              <div className="flex items-start gap-4 mb-8">
                <Icon className="h-8 w-8 text-grimoire-gold shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide">
                    {service.title}
                  </h2>
                  {service.subtitle && (
                    <p className="mt-1 font-body text-lg italic text-grimoire-gold-light">
                      {service.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="max-w-3xl space-y-4">
                {service.body && service.body.length > 0 ? (
                  <div className="prose-grimoire">
                    <PortableText
                      value={service.body}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="font-body text-base md:text-lg leading-relaxed text-grimoire-text mb-4">
                              {children}
                            </p>
                          ),
                        },
                      }}
                    />
                  </div>
                ) : (
                  fallbackBodies[service.title]?.map((paragraph, j) => (
                    <p
                      key={j}
                      className="font-body text-base md:text-lg leading-relaxed text-grimoire-text"
                    >
                      {paragraph}
                    </p>
                  ))
                )}
              </div>

              {service.features && service.features.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 max-w-3xl">
                  {service.features.map((feature) => (
                    <p
                      key={feature}
                      className="font-ui text-sm text-grimoire-text/80 before:content-['·'] before:mr-2 before:text-grimoire-gold"
                    >
                      {feature}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Process: The Ritual */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            heading="The Ritual"
            subheading="How we work."
          />

          <div className="relative ml-4 mt-12 border-l border-grimoire-gold/30 pl-10 md:ml-8 md:pl-14 space-y-16">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                {/* Gold dot on the line */}
                <div className="absolute -left-[calc(2.5rem+5.5px)] top-2 h-2.5 w-2.5 rotate-45 bg-grimoire-gold md:-left-[calc(3.5rem+5.5px)]" />

                <span className="font-display text-4xl text-grimoire-gold/40">
                  {step.number}
                </span>
                <h3 className="mt-1 font-ui text-sm font-medium uppercase tracking-wider text-grimoire-text">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg font-body text-base md:text-lg leading-relaxed text-grimoire-text/80">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
            Start a Conversation
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-grimoire-text">
            Tell us about your project and we&rsquo;ll take it from there.
          </p>
          <Link
            href="/summon"
            className="mt-8 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200"
          >
            Summon Us
          </Link>
        </div>
      </section>
    </>
  );
}
