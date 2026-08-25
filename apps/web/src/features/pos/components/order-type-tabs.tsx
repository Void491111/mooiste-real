"use client";

import { motion } from "motion/react";
import { ORDER_TYPES } from "@/config/pos.config"; 
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import type { OrderType } from "../types";

type Props = {
    value: OrderType;
    onChange: (value: OrderType) => void;
};

export function OrderTypeTabs({ value, onChange }: Props) {
    return (
    <div className="flex gap-1 rounded-card bg-neutral-100 p-1">
        {ORDER_TYPES.map(function renderTab(type) {
            const isActive = type.value === value;

            return (
                <motion.button 
                    key={type.value}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    transition={SPRING.crisp}
                    onClick={function selectType () {
                        onChange(type.value);
                    }}
                    className={cn(
                        "relative flex-1 rounded-card py-2 text-sm font-semibold transition-colors duration-150",
                         isActive ? "text-neutral-900" : "text-neutral-500",
                    )}
                >
                    {isActive && (
                        <motion.span 
                            layoutId="order-type-active"
                            transition={SPRING.crisp}
                            className="absolute inset-0 rounded-card bg-white shadow-sm"
                        />
                    )}
                    <span className="relative">{type.label}</span>
                </motion.button>
            );
        })}
    </div>
    );
}