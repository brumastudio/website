interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
}

/**
 * Wraps content in a minimal browser chrome frame.
 * Dark bar with three dots and an optional URL, rounded corners.
 */
export function BrowserFrame({ children, url }: BrowserFrameProps) {
  return (
    <div className="rounded-lg border border-grimoire-border overflow-hidden bg-grimoire-surface">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-grimoire-border bg-grimoire-bg">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-grimoire-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-grimoire-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-grimoire-border" />
        </div>
        {/* URL bar */}
        {url && (
          <div className="ml-3 flex-1 max-w-sm">
            <div className="bg-grimoire-surface/50 rounded px-3 py-1 font-mono text-[11px] text-grimoire-muted truncate">
              {url}
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
