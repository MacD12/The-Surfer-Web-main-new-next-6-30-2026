// src/lib/api.ts - replaces the legacy src/config/api.js path.
//
// Reads NEXT_PUBLIC_API_URL from .env.local at build time. Falls back to the
// production API host if the env var is missing (defensive - protects against
// blank-string deploys where the booking flow would silently call '/api/v1').
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.thesurferweligama.com/api/v1';
