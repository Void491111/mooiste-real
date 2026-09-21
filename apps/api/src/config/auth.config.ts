export const AUTH_CONFIG = {
  cookieName: "shift_session",
  tokenTtl: "12h",
  cookieMaxAgeMs: 12 * 60 * 60 * 1000,
  saltRounds: 10,
} as const;