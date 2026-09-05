export const NOTIFICATION_CONFIG = {
    pollMs: 10_000,
    maxItems: 8,
    chime: { frequencyHz: 880, durationMs: 220, volume: 0.15, repeat: 2 },
} as const;