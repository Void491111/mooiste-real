export const STORAGE_CONFIG = {
    bucket: "menu-images",
    masSizeBytes: 2 * 1024 * 1024,
    allowedTypes: ["images/jpeg", "images/png", "images/webp"],
} as const;