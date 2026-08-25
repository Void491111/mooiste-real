"use client";

import { motion } from "motion/react";
import { POS_CONFIG } from "@/config/pos.config";
import { SPRING } from "@/config/motion.config";
import { formatMoney } from "../lib/format";
import type { CartTotals } from "../types";

type Props = {
    totals: CartTotals;
};

export function cartSummary({ totals }: Props) {
    const taxPercent = Math.round(POS_CONFIG.tax.rate * 100);

    return (
        <div className="space-y-1.5 rounded-card bg-neutral-50 p-3">
            <div className="flex justofy-between text-sm text-neutral-500">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatMoney(totals.subtotal)}</span>
            </div>

        <div className="flex justify-between text-sm text-neutral-500">
            <span>
                {POS_CONFIG.tax.label} ({taxPercent}%)
            </span>
            <span className="tabular-nums">{formatMoney(totals.tax)}</span>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 pt-1.5 text-base font-bold text-neutral-900">
            <span>Total</span>
            <motion.span
                key={totals.total}
                initial={{ scale: 0.85, opacity: 0.85 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING.crisp}
                className="tabular-nums"
            >
                {formatMoney(totals.total)}
            </motion.span>
        </div>
    </div>
    );
}