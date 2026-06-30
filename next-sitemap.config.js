// next-sitemap.config.js — generates public/sitemap.xml + robots.txt after
// every `npm run build` via the postbuild script.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thesurferweligama.com';

const LOCALES = ['en', 'de'];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,

  // Booking-flow URLs are private/transactional and have no public landing
  // value — keep them out of the sitemap and noindex them via robots.
  exclude: [
    '/camp',
    '/date',
    '/room',
    '/package',
    '/selection',
    '/air-port',
    '/information',
    '/payment-request',
    '/checkout/*',
    '/payment-success',
    '/onlinecheckin',
  ],

  // Per-URL transform: just emit clean entries. Hreflang is already declared
  // in each page's <head> via Next.js Metadata API (alternates.languages set
  // by buildPageMetadata) — duplicating it in the sitemap produces malformed
  // URLs because next-sitemap appends loc paths to alternate href bases.
  transform: async (config, path) => {
    // Tier priority + changefreq so Google understands which URLs to prioritize.
    // path looks like "/en", "/de/beach-camp", "/en/blog/<slug>", "/en/policy" etc.
    const segments = path.split('/').filter(Boolean);
    const tail = segments.slice(1).join('/'); // strip the locale segment

    let priority = 0.5;
    let changefreq = 'monthly';

    if (!tail) {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (
      tail === 'srilanka' ||
      tail === 'morocco' ||
      tail === 'beach-camp' ||
      tail === 'ts2-camp' ||
      tail === 'soul-surfer' ||
      tail === 'style-camp' ||
      tail === 'wave-camp'
    ) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (tail === 'rates' || tail === 'activities') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (tail === 'contact' || tail === 'faq') {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (tail === 'blogs') {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (tail.startsWith('blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (
      tail === 'policy' ||
      tail === 'terms' ||
      tail === 'imprint'
    ) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },

  robotsTxtOptions: {
    additionalSitemaps: [],
    // Single, deduped policy: allow everything public, block API + the
    // transactional booking-flow steps (also excluded from the sitemap).
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/camp',
          '/date',
          '/room',
          '/package',
          '/selection',
          '/air-port',
          '/checkout/',
          '/onlinecheckin/',
          '/information',
          '/payment-request',
          '/payment-success',
        ],
      },
    ],
  },
};