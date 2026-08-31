"use client";

type ChartTipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number }>;
  formatValue: (value: number) => string;
  formatLabel?: (label: string) => string;
};

export function ChartTip({
  active,
  label,
  payload,
  formatValue,
  formatLabel,
}: ChartTipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0]?.value ?? 0;
  const heading = formatLabel ? formatLabel(String(label)) : String(label);

  return (
    <div className="rounded-card border border-border bg-card px-3 py-2 shadow-sm">
      <p className="text-xs text-note">{heading}</p>
      <p className="mt-0.5 text-sm font-medium tabular-nums text-foreground">
        {formatValue(value)}
      </p>
    </div>
  );
}