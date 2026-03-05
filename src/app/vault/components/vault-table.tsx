interface VaultTableProps {
  headers: string[];
  rows: string[][];
  highlightCol?: number;
}

export function VaultTable({ headers, rows, highlightCol }: VaultTableProps) {
  return (
    <div className="overflow-x-auto mt-4 mb-2 rounded-lg border border-grimoire-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-grimoire-border bg-grimoire-surface-elevated">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-ui text-xs uppercase tracking-wider text-grimoire-gold/80"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-grimoire-border/50 last:border-0"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 font-body text-sm leading-relaxed ${
                    j === 0
                      ? "text-grimoire-text/90 font-semibold"
                      : j === highlightCol
                        ? "text-grimoire-gold font-semibold"
                        : "text-grimoire-text/70"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
