"use client";

import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";

type StepButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function StepButton({ label, disabled, onClick, children }: StepButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.82 }}
      transition={SPRING.snappy}
      className="grid size-7 place-items-center rounded-full text-neutral-600 disabled:opacity-25"
    >
      {children}
    </motion.button>
  );
}

type Props = {
  qty: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disabled?: boolean;
  canIncrease?: boolean;
};

export function QtyStepper({ qty, onDecrease, onIncrease, disabled = false, canIncrease = true }: Props) {
  return (
    <div className={cn("flex w-fit items-center rounded-full border border-neutral-200 bg-white p-0.5", disabled && "opacity-40")}>
      <StepButton label="Kurangi" disabled={disabled || qty <= 0} onClick={onDecrease}>
        <Minus className="size-3.5" />
      </StepButton>

            {qty > 0 ? (
        <motion.span
          key={qty}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING.snappy}
          className="w-6 text-center text-sm font-semibold tabular-nums"
        >
          {qty}
        </motion.span>
      ) : (
        <span className="w-6 text-center text-sm text-neutral-300">|</span>
      )}

      <StepButton label="Tambah" disabled={disabled || !canIncrease} onClick={onIncrease}>
        <Plus className="size-3.5" />
      </StepButton>
    </div>
  );
}