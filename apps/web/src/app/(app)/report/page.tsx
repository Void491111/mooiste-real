"use client";

import { ReportDailyTable } from "@/features/report/components/report-daily";
import { ReportMenuTable } from "@/features/report/components/report-menus";
import { ReportRange } from "@/features/report/components/report-range";
import { ReportSummary } from "@/features/report/components/report-summary";
import { useReport } from "@/features/report/hooks/use-report";

export default function ReportPage() {
  const page = useReport();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
      <header>
        <h1 className="text-lg font-medium text-foreground">Laporan</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Pilih rentang tanggal, lalu unduh kalau perlu dibawa ke luar.
        </p>
      </header>

      <ReportRange
        from={page.from}
        to={page.to}
        canDownload={page.report !== null}
        onFromChange={page.setFrom}
        onToChange={page.setTo}
        onDownloadDaily={page.downloadDaily}
        onDownloadMenus={page.downloadMenus}
      />

      {page.error !== null ? (
        <p className="text-sm text-danger-soft">{page.error}</p>
      ) : page.isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat…</p>
      ) : page.report === null ? null : (
        <>
          <ReportSummary totals={page.report.totals} />
          <ReportDailyTable rows={page.report.daily} />
          <ReportMenuTable rows={page.report.menus} />
        </>
      )}
    </div>
  );
}