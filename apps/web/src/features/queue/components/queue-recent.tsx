"use client";

import { AnimatePresence, motion } from "motion/react";
import { Undo2 } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import type { QueueOrder } from "../types";

type Props = {
    orders: QueueOrder[],
    onRestore: (orderId: string) => void;
};

export function QueueRecent({ orders, onRestore }: Props) {
    if (orders.length === 0) return null;

    return (
        <footer className="shrink-0 border-t border-border pt-3 ">
            <p className="mb-2 text-xs text-muted-foreground">Baru Diserahkan</p>

            <div className="flex flex-wrap-gap-2">
                <AnimatePresence>
                    {orders.map(function renderRecent(order) {
                        return (
                            <motion.button
                                key={order.id}
                                layout
                                type="button"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity:0, scale: 0.9 }}
                                transition={SPRING.snappy}
                                onClick={function handleNoteChange() {
                                    onRestore(order.id)
                                }}
                                    className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                            >
                                {order.number}
                                <Undo2 className="size-3"/>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>
        </footer>
    );
}

