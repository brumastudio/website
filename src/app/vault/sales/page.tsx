import { redirect } from "next/navigation";
import { isAuthenticated } from "../lib/auth";
import { VaultHeader } from "../components/vault-header";
import { salesGuides } from "../lib/guides";

export default async function SalesPage() {
  if (!(await isAuthenticated())) redirect("/vault");

  return (
    <>
      <VaultHeader
        label="The Vault"
        heading="Sales"
        backHref="/vault"
        backLabel="Back to The Vault"
      />

      <main className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            {salesGuides.map((guide) => (
              <a
                key={guide.slug}
                href={`/vault/sales/${guide.slug}`}
                className="group rounded-lg border border-grimoire-border bg-grimoire-surface p-6 transition-all duration-300 hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.06)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block font-ui text-[10px] uppercase tracking-wider text-grimoire-muted border border-grimoire-border rounded px-2 py-0.5">
                    {guide.lang.toUpperCase()}
                  </span>
                </div>
                <h2 className="font-display text-lg text-grimoire-gold uppercase tracking-wide">
                  {guide.title}
                </h2>
                <p className="mt-2 font-body text-sm text-grimoire-text/70 leading-relaxed">
                  {guide.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
