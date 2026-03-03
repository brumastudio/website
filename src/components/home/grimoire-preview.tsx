import { SectionHeader } from "@/components/section-header";
import { Sparkles } from "lucide-react";

const projects = [
  {
    title: "Velo",
    description:
      "A premium single-page site for an artisan bicycle shop. Product showcases, CMS-powered content, and a refined dark/light experience.",
    tags: ["Next.js", "Sanity CMS", "Tailwind CSS", "E-commerce"],
  },
  {
    title: "Bufete Reyes",
    description:
      "A bilingual corporate site for a law firm. Clean, authoritative design with attorney profiles and practice area pages.",
    tags: ["Next.js", "Sanity CMS", "Bilingual", "Corporate"],
  },
];

export function GrimoirePreview() {
  return (
    <section id="grimoire" className="px-6 py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Section 02"
          heading="The Grimoire"
          subheading="Selected works and experiments."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-grimoire-surface border border-grimoire-border rounded-lg overflow-hidden hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(201,166,105,0.08)] transition-all duration-300"
            >
              {/* Placeholder image area */}
              <div className="flex h-48 items-center justify-center border-b border-grimoire-border bg-grimoire-bg/50">
                <div className="flex flex-col items-center gap-2 text-grimoire-muted">
                  <Sparkles className="h-6 w-6" />
                  <span className="font-ui text-xs uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl uppercase tracking-wide text-grimoire-gold">
                  {project.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-grimoire-text">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-grimoire-surface border border-grimoire-border text-grimoire-muted font-ui text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
