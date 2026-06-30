// src/app/[locale]/providers.tsx
'use client';

import { useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import CookieBanner from '@/components/CookieBannerWrapper';

export default function Providers({
  locale,
  messages,
  timeZone,
  children,
}: {
  locale: string;
  messages: Record<string, unknown>;
  timeZone: string;
  children: ReactNode;
}) {
  // Keep <html lang> in sync with the active URL locale without forcing
  // the entire layout chain into dynamic mode (which would break SSG).
  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
      {/* Mounted globally so the footer "Cookie settings" link works from any page. */}
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
