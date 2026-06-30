// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const ONE_YEAR = 60 * 60 * 24 * 365;
const ONE_MONTH = 60 * 60 * 24 * 31;

// Old (pre-i18n) URLs had NO locale prefix — e.g. /srilanka, /morocco. The site
// now serves every public page under /[locale] (/en/srilanka, /de/srilanka), so
// those old paths 404 and lose their accumulated Google ranking. We 301-redirect
// each to its /en equivalent so the ranking equity transfers to the new
// canonical URL.
//
// IMPORTANT — these are EXACT-page redirects only (no /:path* wildcard).
// Redirects run before static-file serving, and some of these names also exist
// as folders in /public (morocco/, activities/, blogs/). A wildcard would
// hijack asset requests like /morocco/3-bed-1.jpg and 301 them to a
// non-existent /en/morocco/3-bed-1.jpg (404). Blog posts — the only legacy URLs
// with a sub-path — are handled by a separate rule below (there is no /public
// "blog" folder, so that one is collision-free). "blog" is intentionally NOT in
// this list: there is no /[locale]/blog index page, only /blog/[slug] posts.
//
// None of these segments collides with a top-level booking/utility route
// (air-port, book-now, camp, checkout, date, information, onlinecheckin,
// package, payment-request, payment-success, room, selection, api), and /en/*
// and /de/* are never matched as a redirect source.
const LEGACY_LOCALIZED_PATHS = [
  'activities',
  'beach-camp',
  'blogs',
  'careers',
  'contact',
  'faq',
  'imprint',
  'morocco',
  'policy',
  'rates',
  'soul-surfer',
  'srilanka',
  'style-camp',
  'surf-camp-sri-lanka',
  'terms',
  'ts2-camp',
  'wave-camp',
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allowlist quality values — required from Next 16.
    qualities: [60, 70, 75, 85],
    // Keep optimized variants in the CDN for ~31 days instead of 4 hours.
    minimumCacheTTL: ONE_MONTH,
    remotePatterns: [
      { protocol: 'https', hostname: 'api.thesurferweligama.com' },
      // YouTube thumbnail CDN — proxied through Next's image optimizer so the
      // browser sees the image coming from our own origin instead of
      // i.ytimg.com. Edge's Tracking Prevention flags i.ytimg.com as a
      // tracker; routing through /_next/image bypasses the flag.
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  experimental: {
    optimizeCss: true,
    // Tree-shake barrel imports from heavy libs so only the icons/exports
    // actually used ship to the client. framer-motion + lucide-react are
    // imported across dozens of components; this trims the client JS bundle
    // and speeds up hydration (lower TBT).
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Long-lived Cache-Control for /public assets — Amplify's default 5s TTL
  // forces re-fetches of large hero photos and the homepage MP4 on every visit.
  // (Next.js already sets proper immutable headers on /_next/static and uses
  // `minimumCacheTTL` above for /_next/image, so we don't touch those here.)
  async headers() {
    const immutable = [
      { key: 'Cache-Control', value: `public, max-age=${ONE_YEAR}, immutable` },
    ];
    // Baseline security headers applied to every route. (CSP is intentionally
    // omitted here — a strict policy needs per-request nonces for inline
    // scripts/styles + allowances for Google fonts, YouTube embeds and Leaflet
    // tiles, so it's a separate, carefully-tested rollout.)
    const security = [
      // Force HTTPS for 1 year incl. subdomains (api. is already HTTPS).
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      // Block this site from being framed elsewhere (clickjacking).
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Stop MIME-type sniffing.
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Send only the origin on cross-origin requests.
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Disable powerful APIs the site never uses.
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
    ];
    return [
      { source: '/:path*', headers: security },
      { source: '/videos/:path*', headers: immutable },
      { source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|mp4)', headers: immutable },
    ];
  },
  // Preserve SEO equity from the old, non-prefixed URLs. Each legacy page is
  // 301-redirected to its /en equivalent (statusCode 301 — the unambiguous
  // "moved permanently" signal Google uses to transfer ranking). Query strings
  // are preserved automatically. Redirects run before the proxy/middleware, so
  // /en/* and /de/* requests are never affected.
  async redirects() {
    const pageRedirects = LEGACY_LOCALIZED_PATHS.map((p) => ({
      source: `/${p}`,
      destination: `/en/${p}`,
      statusCode: 301,
    }));

    return [
      ...pageRedirects,
      // Blog posts are the only legacy URLs with a sub-path. /public has no
      // "blog" folder, so this wildcard cannot collide with a static asset.
      // Use :slug+ (one OR MORE segments) — NOT :slug* — so bare /blog isn't
      // matched: there is no /[locale]/blog index page (the listing is /blogs),
      // so redirecting /blog would land on a dead /en/blog (404).
      { source: '/blog/:slug+', destination: '/en/blog/:slug+', statusCode: 301 },
    ];
  },
  // The Vite codebase is plain JSX. tsconfig is intentionally loose for the
  // migration; we let Next compile rather than enforce strict types here.
  // Tighten back in a later phase once typing is added pass-by-pass.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);