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

const fallbackSlugs = ["web-development", "cms-content-architecture", "ui-ux-design"] as const;
const fallbackIcons: Record<string, string> = {
  "web-development": "Code2",
  "cms-content-architecture": "Database",
  "ui-ux-design": "PenTool",
};

interface ServicesPreviewProps {
  services?: Service[];
}

export async function ServicesPreview({ services }: ServicesPreviewProps) {
  const t = await getTranslations("Home.servicesPreview");
  const tc = await getTranslations("Content");

  // Translate Sanity services or build fallback from translations
  const items = services && services.length > 0
    ? services.map((s) => {
        const slug = s.slug?.current || "";
        return {
          ...s,
          title: tc.has(`services.${slug}.title`) ? tc(`services.${slug}.title`) : s.title,
          description: tc.has(`services.${slug}.description`) ? tc(`services.${slug}.description`) : s.description,
        };
      })
    : fallbackSlugs.map((slug) => ({
        title: tc(`services.${slug}.title`),
        description: tc(`services.${slug}.description`),
        icon: fallbackIcons[slug],
        slug: { current: slug },
      }));

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
                <div className="bg-grimoire-surface border border-grimoire-border rounded-lg p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:border-grimoire-gold/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_20px_rgba(201,166,105,0.08)] hover:-translate-y-0.5 transition-all duration-300 h-full">
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
