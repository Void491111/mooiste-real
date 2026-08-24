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