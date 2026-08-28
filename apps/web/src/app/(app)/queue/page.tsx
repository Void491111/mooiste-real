"use client";

import { QueueBoard } from "@/features/queue/components/queue-board";
import { QueueRecent } from "@/features/queue/components/queue-recent";
import { useQueueBoard } from "@/features/queue/hooks/use-queue-board";

export default function QueuePage() {
  const board = useQueueBoard();

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-3">
      <header className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold text-foreground">Antrian</h1>
        <p className="text-sm text-muted-foreground">{board.orders.length} pesanan</p>
      </header>

      {board.error !== null ? (
        <div className="grid flex-1 place-items-center rounded-card border border-danger-soft text-sm text-muted-foreground">
          {board.error}
        </div>
      ) : board.now === null || board.isLoading ? (
        <div className="flex-1 rounded-card bg-muted/40" />
      ) : board.isEmpty ? (
        <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
          Belum ada antrian
        </div>
      ) : (
        <QueueBoard orders={board.orders} now={board.now} onHandedOver={board.refetch} />
      )}

      <QueueRecent orders={board.recent} onRestore={board.restore} />
    </main>
  );
}