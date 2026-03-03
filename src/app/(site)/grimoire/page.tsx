import type { Metadata } from "next";
import { Suspense } from "react";
import { client } from "@/lib/sanity";
import { allProjectsQuery } from "@/lib/queries";
import { ProjectGrid } from "@/components/project-grid";
import type { Project } from "@/lib/types";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected works and experiments from Bruma Studio. Web development, CMS solutions, and design projects built with Next.js, Sanity CMS, and modern tools.",
};

export default async function GrimoirePage() {
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
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            The Grimoire
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide">
            Our Work
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
            Every project is a spell cast with intention — built from modern
            code, shaped by design, and delivered with craft.
          </p>
        </div>
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
