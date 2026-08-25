"use client";

import { motion } from "motion/react";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";

type Props = {
    label: string;
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
};

export function IconButton ({ label, onClick, className, children }: Props) {
    return (
        <motion.button
            type="button"
            aria-label={label}
            onClick={onClick}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            transition={SPRING.snappy}
            className={cn("grid size-8 place-items-center rounded-card text-muted-foreground hover:text-foreground", className)}
        >
            {children}
        </motion.button>
    );
}