// src/app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Providers from './providers';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering for this locale segment
  setRequestLocale(locale);

  // Server-side message + timezone load (the PDF's `messages` prop never existed)
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <Providers locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </Providers>
  );
}