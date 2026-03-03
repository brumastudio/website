import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Code2, Database, PenTool, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import type { Service } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  PenTool,
};

const fallbackServices = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with Next.js, React, and TypeScript. Fast, accessible, and built to last.",
    icon: "Code2",
    slug: { current: "web-development" },
  },
  {
    title: "CMS & Content Systems",
    description:
      "Content management with Sanity CMS and headless WordPress. Edit your site without touching code.",
    icon: "Database",
    slug: { current: "cms" },
  },
  {
    title: "Design & Strategy",
    description:
      "Brand identity, UI/UX design, and digital strategy. From wireframe to launch, every detail considered.",
    icon: "PenTool",
    slug: { current: "design" },
  },
];

interface ServicesPreviewProps {
  services?: Service[];
}

export async function ServicesPreview({ services }: ServicesPreviewProps) {
  const t = await getTranslations("Home.servicesPreview");
  const items = services && services.length > 0 ? services : fallbackServices;

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeader
            label={t("label")}
            heading={t("heading")}
            subheading={t("subheading")}
          />
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {items.map((service) => {
            const Icon = iconMap[service.icon || ""] || Code2;
            return (
              <StaggerItem key={service.title}>
                <div className="bg-grimoire-surface border border-grimoire-border rounded-lg p-6 md:p-8 hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(201,166,105,0.08)] hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <Icon className="h-8 w-8 text-grimoire-gold" />
                  <h3 className="mt-4 font-display text-lg uppercase tracking-wide text-grimoire-gold">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-body text-base md:text-lg leading-relaxed text-grimoire-text">
                    {service.description}
                  </p>
                  <Link
                    href={{ pathname: "/arts", hash: service.slug?.current || "" }}
                    className="mt-4 inline-block font-ui text-sm font-medium text-grimoire-gold hover:text-grimoire-gold-light transition-colors duration-200"
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
