import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity";
import { allProjectsQuery } from "@/lib/queries";
import { ProjectGrid } from "@/components/project-grid";
import { BackgroundGlow } from "@/components/background-glow";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Project } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Grimoire.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "grimoire" : "grimorio"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "grimoire" : "grimorio"}`,
      },
    },
  };
}

export default async function GrimoirePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Grimoire");
  const projects = await client.fetch<Project[]>(allProjectsQuery);

  // Sort: featured first, then by order
  const sorted = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  // Collect unique tags across all projects
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags ?? []))
  ).sort();

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <BackgroundGlow color="rune" className="-top-40 -right-40" />
        <ScrollReveal className="mx-auto max-w-6xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            {t("hero.label")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
            {t("hero.heading")}
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
            {t("hero.body")}
          </p>
        </ScrollReveal>
      </section>

      {/* Filter + Grid */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Suspense>
            <ProjectGrid projects={sorted} allTags={allTags} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
