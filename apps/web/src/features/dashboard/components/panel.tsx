import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  hint?: string;
  children: ReactNode;
};

export function Panel({ title, hint, children }: PanelProps) {
  return (
    <section className="rounded-card border border-border bg-card p-5">
            <header className="mb-4">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        {hint ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}