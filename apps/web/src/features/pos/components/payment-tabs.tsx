"use client";

import { PAYMENT_METHODS, type PaymentMethod } from "@/config/pos.config";
import { cn } from "@/lib/utils";

type Props = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

export function PaymentTabs({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-card bg-muted p-1">
      {PAYMENT_METHODS.map(function renderTab(method) {
        const isActive = method.value === value;

        return (
          <button
            key={method.value}
            type="button"
            onClick={function selectMethod() {
              onChange(method.value);
            }}
            className={cn(
              "h-9 rounded-card text-sm font-bold transition-colors",
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {method.label}
          </button>
        );
      })}
    </div>
  );
}