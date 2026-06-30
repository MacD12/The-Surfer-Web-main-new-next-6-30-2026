// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import './globals.css';

// Lock weights to what's actually rendered. `preload: false` on both fonts
// silences Edge's dev-mode "preloaded but not used in time" warnings - the
// swap-from-fallback is barely visible thanks to `display: 'swap'`.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

// Inter is the body font; it's used everywhere but rarely above the fold
// before the Montserrat headline, so skip preloading and let it swap when
// ready (system fallback covers the first paint via globals.css).
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { default: 'The Surfer', template: '%s | The Surfer' },
  description: 'Premier surf camp in Sri Lanka and Morocco.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a67b3' },
  ],
  colorScheme: 'light',
};

// Root <html lang> stays at the default locale to keep SSG intact (calling
// next/headers here would force every route into dynamic rendering, which
// breaks sitemap generation and hurts cache hit rate).
//
// The [locale]/ provider tree updates document.documentElement.lang after
// mount when the URL locale differs - see Providers.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get MPGS configuration from environment variables
  const apiVersion = process.env.NEXT_PUBLIC_MPGS_API_VERSION || '61';
  
  const mpgsUrl = `https://cbcmpgs.gateway.mastercard.com/checkout/version/${apiVersion}/checkout.js`

  return (
    <html lang={routing.defaultLocale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Mastercard Payment Gateway Services SDK */}
        <script
          src={mpgsUrl}
          strategy="beforeInteractive"
          async
        />
      </head>
      <body className={`${montserrat.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}