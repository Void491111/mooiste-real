"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { SPRING } from "@/config/motion.config";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function GuestSheet({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
          />

        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={SPRING.snappy}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-card"
          >
            <div className="flex shrink-0 justify-center pb-2 pt-2.5">
              <span className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>

            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}