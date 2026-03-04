import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "../../lib/auth";
import { VaultHeader } from "../../components/vault-header";
import { getGuide, salesGuides } from "../../lib/guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return salesGuides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({ params }: Props) {
  if (!(await isAuthenticated())) redirect("/vault");

  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  return (
    <>
      <VaultHeader
        label="Sales"
        heading={guide.title}
        backHref="/vault/sales"
        backLabel="Back to Sales"
      />

      <main className="px-6 pb-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mb-4">
                {section.heading}
              </h2>
              <div className="font-body text-base leading-relaxed text-grimoire-text/85 whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
