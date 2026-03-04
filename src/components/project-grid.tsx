"use client";

import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { FadeImage } from "@/components/fade-image";
import { Sparkles } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Project } from "@/lib/types";

interface ProjectGridProps {
  projects: Project[];
  allTags: string[];
}

export function ProjectGrid({ projects, allTags }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("ProjectGrid");

  const activeTag = searchParams.get("tag") || "all";

  const filtered =
    activeTag === "all"
      ? projects
      : projects.filter((p) => p.tags?.includes(activeTag));

  function setTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "all") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setTag("all")}
          className={`font-ui text-sm px-4 py-2 rounded-full border transition-colors duration-200 ${
            activeTag === "all"
              ? "border-grimoire-gold bg-grimoire-gold/10 text-grimoire-gold"
              : "border-grimoire-border text-grimoire-muted hover:border-grimoire-gold/30 hover:text-grimoire-text"
          }`}
        >
          {t("all")}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTag(tag)}
            className={`font-ui text-sm px-4 py-2 rounded-full border transition-colors duration-200 ${
              activeTag === tag
                ? "border-grimoire-gold bg-grimoire-gold/10 text-grimoire-gold"
                : "border-grimoire-border text-grimoire-muted hover:border-grimoire-gold/30 hover:text-grimoire-text"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <Link
            key={project._id}
            href={{ pathname: "/grimoire/[slug]", params: { slug: project.slug.current } }}
            className="group bg-grimoire-surface border border-grimoire-border rounded-lg overflow-hidden hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(201,166,105,0.08)] transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Cover image or placeholder */}
            <div className="relative h-52 border-b border-grimoire-border overflow-hidden">
              {project.coverImage ? (
                <>
                  <FadeImage
                    src={urlFor(project.coverImage).width(800).height(416).url()}
                    alt={project.title}
                    fill
                    className="object-cover transition-[opacity,transform] duration-300 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-grimoire-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-ui text-sm font-medium uppercase tracking-wider text-grimoire-gold">
                      {t("viewTome")}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center bg-grimoire-bg/50">
                  <div className="flex flex-col items-center gap-2 text-grimoire-muted group-hover:text-grimoire-gold transition-colors duration-200">
                    <Sparkles className="h-6 w-6" />
                    <span className="font-ui text-xs uppercase tracking-wider">
                      {t("viewTome")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="font-display text-xl uppercase tracking-wide text-grimoire-gold">
                {project.title}
              </h3>
              {project.description && (
                <p className="mt-3 font-body text-base md:text-lg leading-relaxed text-grimoire-text">
                  {project.description}
                </p>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-grimoire-bg border border-grimoire-border text-grimoire-muted font-ui text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Sparkles className="h-8 w-8 text-grimoire-muted mx-auto mb-4" />
          <p className="font-body text-lg text-grimoire-muted">
            {t("emptyState")}
          </p>
        </div>
      )}

      {/* Footer note if few projects */}
      {projects.length < 4 && projects.length > 0 && (
        <p className="mt-12 text-center font-body text-sm italic text-grimoire-muted">
          {t("moreComingSoon")}
        </p>
      )}
    </>
  );
}
