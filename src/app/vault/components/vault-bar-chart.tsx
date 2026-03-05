interface BarItem {
  label: string;
  value: number;
  displayValue: string;
  accent?: boolean;
}

interface VaultBarChartProps {
  items: BarItem[];
  title?: string;
}

export function VaultBarChart({ items, title }: VaultBarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value));

  return (
    <div className="mt-4 mb-2 rounded-lg border border-grimoire-border bg-grimoire-surface p-5">
      {title && (
        <p className="font-ui text-xs uppercase tracking-wider text-grimoire-muted mb-4">
          {title}
        </p>
      )}
      <div className="space-y-3">
        {items.map((item, i) => {
          const widthPercent = Math.max((item.value / maxValue) * 100, 2);
          return (
            <div key={i}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="font-body text-sm text-grimoire-text/80">
                  {item.label}
                </span>
                <span
                  className={`font-ui text-sm font-semibold ${
                    item.accent ? "text-grimoire-gold" : "text-grimoire-text/70"
                  }`}
                >
                  {item.displayValue}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-grimoire-surface-elevated overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.accent
                      ? "bg-gradient-to-r from-grimoire-gold/80 to-grimoire-gold"
                      : "bg-gradient-to-r from-grimoire-gold/30 to-grimoire-gold/50"
                  }`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
