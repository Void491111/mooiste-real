export const STORAGE_CONFIG = {
  bucket: "menu-images",

  /** 2MB. Foto menu dari HP biasanya di bawah ini setelah dikompres. */
  maxSizeBytes: 2 * 1024 * 1024,

  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
} as const;