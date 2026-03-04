"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export function VaultLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/vault/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid password.");
        setPassword("");
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-grimoire-gold/30 mb-6">
            <Lock className="w-7 h-7 text-grimoire-gold" />
          </div>
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            Restricted Access
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
            The Vault
          </h1>
          <div className="mt-4 mx-auto h-px max-w-[120px] bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoFocus
              className="w-full rounded-md border border-grimoire-border bg-grimoire-surface-elevated px-4 py-3 font-body text-sm text-grimoire-text placeholder:text-grimoire-muted/50 focus:border-grimoire-gold/50 focus:outline-none focus:ring-1 focus:ring-grimoire-gold/30 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-body text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-grimoire-gold px-6 py-3 font-ui text-sm font-medium uppercase tracking-wider text-grimoire-bg hover:bg-grimoire-gold-light active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
