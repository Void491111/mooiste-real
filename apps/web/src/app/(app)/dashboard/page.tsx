"use client";

import { DashboardBody } from "@/features/dashboard/components/dashboard-body";
import { RangePicker } from "@/features/dashboard/components/range-picker";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";

export default function DashboardPage() {
  const { days, setDays, data, isLoading, error } = useDashboard();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-medium text-foreground">Dasbor</h1>
        <RangePicker days={days} onChange={setDays} />
      </header>

      {error ? <p className="text-sm text-danger-soft">{error}</p> : null}
      {isLoading && !data ? <p className="text-sm text-note">Memuat…</p> : null}
      {data ? <DashboardBody summary={data} /> : null}
    </div>
  );
}