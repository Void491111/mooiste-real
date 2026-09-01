"use client";

import { AnimatePresence, motion } from "motion/react";
import { SPRING } from "@/config/motion.config";
import { CartPanel } from "./cart-panel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCheckoutSuccess?: () => void;
};

export function CartDrawer({ isOpen, onClose, onCheckoutSuccess }: Props) {
  function handleCheckoutSuccess() {
    onCheckoutSuccess?.();
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={SPRING.snappy}
            className="absolute inset-y-0 right-0 w-full max-w-sm"
          >
            <CartPanel
              className="h-full w-full rounded-none shadow-none"
              onCheckoutSuccess={handleCheckoutSuccess}
            />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}