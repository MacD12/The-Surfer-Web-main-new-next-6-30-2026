// src/proxy.ts  (place in src/ root, NOT in app/)
// Renamed from middleware.ts in Next.js 16: the "middleware" file
// convention is deprecated in favor of "proxy". The next-intl library
// still publishes its helper under `next-intl/middleware`.
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(de|en)/:path*'],
};
