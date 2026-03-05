import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "../../lib/auth";
import { VaultHeader } from "../../components/vault-header";
import { VaultToc } from "../../components/vault-toc";
import { VaultTable } from "../../components/vault-table";
import { VaultBarChart } from "../../components/vault-bar-chart";
import { getGuide, salesGuides } from "../../lib/guides";
import { getSectionVisuals } from "../../lib/guide-visuals";

interface Props {
  params: Promise<{ slug: string }>;
}

function toId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return salesGuides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({ params }: Props) {
  if (!(await isAuthenticated())) redirect("/vault");

  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const tocItems = guide.sections.map((s) => ({
    id: toId(s.heading),
    label: s.heading,
  }));

  return (
    <>
      <VaultHeader
        label="Sales"
        heading={guide.title}
        backHref="/vault/sales"
        backLabel="Back to Sales"
      />

      <main className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <VaultToc items={tocItems} />
          </div>

          <div className="space-y-12">
            {guide.sections.map((section, i) => {
              const vis = getSectionVisuals(slug, section.heading);
              const id = toId(section.heading);

              return (
                <section key={i} id={id} className="scroll-mt-8">
                  <a href={`#${id}`} className="group block">
                    <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mb-4 group-hover:underline group-hover:underline-offset-4 group-hover:decoration-grimoire-gold/30">
                      {section.heading}
                    </h2>
                  </a>
                  <div className="font-body text-base leading-relaxed text-grimoire-text/85 whitespace-pre-line">
                    {section.body}
                  </div>
                  {vis?.chart && <VaultBarChart {...vis.chart} />}
                  {vis?.table && <VaultTable {...vis.table} />}
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
