"use client";

import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { QtyInput } from "./qty-input";

const SIZES = {
  sm: { button: "size-6", icon: "size-3", qty: "w-5 text-xs" },
  md: { button: "size-7", icon: "size-3.5", qty: "w-6 text-sm" },
} as const;

type StepButtonProps = {
  label: string;
  disabled: boolean;
  sizeClass: string;
  onClick: () => void;
  children: React.ReactNode;
};

function StepButton({ label, disabled, sizeClass, onClick, children }: StepButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.82 }}
      transition={SPRING.snappy}
      className={cn("grid place-items-center rounded-full text-muted-foreground disabled:opacity-25", sizeClass)}
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
  size?: keyof typeof SIZES;
  onQtyChange?: (qty: number) => void;
};

export function QtyStepper({
  qty,
  onDecrease,
  onIncrease,
  onQtyChange,
  disabled = false,
  canIncrease = true,
  size = "md",
}: Props) {
  const style = SIZES[size];

    return (
    <div className={cn("flex w-fit items-center gap-1", disabled && "opacity-40")}>
      <StepButton
        label="Kurangi"
        disabled={disabled || qty <= 0}
        sizeClass={cn(style.button, "border border-border bg-card")}
        onClick={onDecrease}
        
      >
        <Minus className={style.icon} />
      </StepButton>

            {qty > 0 ? (
        onQtyChange ? (
          <QtyInput qty={qty} className={style.qty} onCommit={onQtyChange} />
        ) : (
          <motion.span
            key={qty}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING.snappy}
            className={cn("text-center font-semibold tabular-nums", style.qty)}
          >
            {qty}
          </motion.span>
        )
      ) : (
        <span className={cn("text-center text-muted-foreground/40", style.qty)}>
          |
        </span>
      )}

      <StepButton
        label="Tambah"
        disabled={disabled || !canIncrease}
        sizeClass={cn(style.button, "border border-border bg-card")}
        onClick={onIncrease}
      >
        <Plus className={style.icon} />
      </StepButton>
    </div>
  );
}