"use client";

import { useEffect, useState } from "react";
import { QUEUE_CONFIG } from "@/config/queue.config";

export function useNow() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(function startClock() {
    function tick() {
      setNow(Date.now());
    }

    tick();
    const timer = window.setInterval(tick, QUEUE_CONFIG.tick.intervalMs);

    return function stopClock() {
      window.clearInterval(timer);
    };
  }, []);

  return now;
}