"use client";

import { QueueBoard } from "@/features/queue/components/queue-board";
import { useQueueBoard } from "@/features/queue/hooks/use-queue-board";

export default function QueuePage() {
  const { now, orders, isEmpty } = useQueueBoard();

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-3">
      <header className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold text-foreground">Antrian</h1>
        <p className="text-sm text-muted-foreground">{orders.length} pesanan</p>
      </header>

      {now === null ? (
        <div className="flex-1 rounded-card bg-muted/40" />
      ) : isEmpty ? (
        <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
          Belum ada antrian
        </div>
      ) : (
        <QueueBoard orders={orders} now={now} />
      )}
    </main>
  );
}
