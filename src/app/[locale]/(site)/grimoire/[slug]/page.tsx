import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ExternalLink, ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { projectBySlugQuery, projectSlugsQuery, allProjectsQuery } from "@/lib/queries";
import { PortableTextBody } from "@/components/portable-text-body";
import { GoldDivider } from "@/components/gold-divider";
import { routing } from "@/i18n/routing";
import type { Project } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description || `${project.title} — a Bruma Studio project.`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("GrimoireProject");
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  // Find next project for "Next Project" link
  const allProjects = await client.fetch<Project[]>(allProjectsQuery);
  const currentIndex = allProjects.findIndex(
    (p) => p.slug.current === slug
  );
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/grimoire"
            className="font-ui text-sm text-grimoire-muted hover:text-grimoire-gold transition-colors duration-200 mb-6 inline-block"
          >
            {t("backLink")}
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
            {project.title}
          </h1>

          {project.description && (
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
              {project.description}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-grimoire-surface border border-grimoire-border text-grimoire-muted font-ui text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover image */}
      {project.coverImage && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="relative w-full overflow-hidden rounded-lg border border-grimoire-border">
              <Image
                src={urlFor(project.coverImage).width(1400).height(700).url()}
                alt={project.title}
                width={1400}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Overview sidebar + Body */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_280px]">
          {/* Body */}
          <div className="min-w-0">
            {project.body && project.body.length > 0 ? (
              <PortableTextBody value={project.body} />
            ) : (
              <p className="font-body text-lg leading-relaxed text-grimoire-muted italic">
                {t("caseStudyComingSoon")}
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 md:order-last">
            {project.client && (
              <div>
                <h3 className="font-ui text-xs font-medium uppercase tracking-wider text-grimoire-muted mb-1">
                  {t("client")}
                </h3>
                <p className="font-body text-base md:text-lg leading-relaxed text-grimoire-text">
                  {project.client}
                </p>
              </div>
            )}

            {project.timeline && (
              <div>
                <h3 className="font-ui text-xs font-medium uppercase tracking-wider text-grimoire-muted mb-1">
                  {t("timeline")}
                </h3>
                <p className="font-body text-base md:text-lg leading-relaxed text-grimoire-text">
                  {project.timeline}
                </p>
              </div>
            )}

            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h3 className="font-ui text-xs font-medium uppercase tracking-wider text-grimoire-muted mb-2">
                  {t("techStack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-grimoire-surface border border-grimoire-border text-grimoire-text font-ui text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.liveUrl && (
              <div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-ui text-sm font-medium text-grimoire-gold hover:text-grimoire-gold-light transition-colors duration-200"
                >
                  {t("viewLiveSite")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Next project */}
      {nextProject && nextProject.slug.current !== slug && (
        <section className="border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <GoldDivider className="mb-12 mt-0" />
            <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
              {t("nextProject")}
            </p>
            <Link
              href={{ pathname: "/grimoire/[slug]", params: { slug: nextProject.slug.current } }}
              className="group inline-flex items-center gap-3"
            >
              <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide group-hover:text-grimoire-gold-light transition-colors duration-200">
                {nextProject.title}
              </h2>
              <ArrowRight className="h-6 w-6 text-grimoire-gold group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            {nextProject.description && (
              <p className="mt-3 max-w-lg font-body text-base md:text-lg leading-relaxed text-grimoire-text/80">
                {nextProject.description}
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
