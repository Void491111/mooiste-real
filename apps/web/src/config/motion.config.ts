import type { TargetAndTransition } from "motion/react";

export const DURATION = {
  instant: 0.12,
  fast: 0.18,
  base: 0.24,
  slow: 0.32,
} as const;

export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const SPRING = {
  snappy: { type: "spring", stiffness: 500, damping: 32, mass: 0.6 },
  soft: { type: "spring", stiffness: 300, damping: 30 },
  crisp: {type: "spring", stiffness: 900, damping: 34, mass: 0.4 }
} as const;

export const TAP = {
  whileTap: { scale: 0.94 },
  transition: SPRING.snappy,
} as const;

export const ICON_HOVER = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.9 },
  transition: SPRING.snappy,
} as const;

export const VARIANTS = {
  page: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  card: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },
  cartRow: {
    initial: { opacity: 0, x: 24, height: 0 },
    animate: { opacity: 1, x: 0, height: "auto" },
    exit: { opacity: 0, x: 24, height: 0 },
  },
  panel: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
  },
} as const;

export const STAGGER = {
  grid: { staggerChildren: 0.02, delayChildren: 0.03 },
} as const;

export const ICON_MOTION = {
  wiggle: { rotate: [0, -14, 12, -8, 0], transition: { duration: 0.45 } },
  bounce: { y: [0, -5, 0], transition: { duration: 0.4, repeat: Infinity, repeatDelay: 0.1 } },
  spin: { rotate: 360, transition: { duration: 0.7, ease: "easeInOut" } },
  swing: { rotate: [0, 16, -10, 6, 0], transition: { duration: 0.5 } },
  pop: { scale: 1.28, transition: SPRING.snappy },
} satisfies Record<string, TargetAndTransition>;

export type IconMotion = keyof typeof ICON_MOTION;



