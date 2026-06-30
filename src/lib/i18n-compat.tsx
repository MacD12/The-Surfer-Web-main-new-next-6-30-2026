// src/lib/i18n-compat.tsx
//
// Drop-in compatibility shim that lets components written for react-i18next
// keep their existing call patterns while running on top of next-intl.
//
// What it covers (the only react-i18next surface used in this codebase):
//   const { t, i18n } = useTranslation();
//   t('a.b.c')                                    -> string
//   t('a.b.c', { returnObjects: true })           -> array | object
//   i18n.language                                 -> 'en' | 'de'
//   i18n.changeLanguage(next)                     -> changes URL locale segment
//   <Trans i18nKey="a.b" components={{ br: <br /> }}> ... </Trans>
//
// We DO NOT install react-i18next. Components only need to switch their import
// path from 'react-i18next' to '@/lib/i18n-compat'. Everything else is unchanged.

'use client';

import { useMemo, type ReactNode, type ReactElement, isValidElement, cloneElement, Children } from 'react';
import {
  useTranslations,
  useMessages,
  useLocale,
} from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

type TranslateFn = {
  (key: string): string;
  (key: string, options: { returnObjects: true }): unknown;
  (key: string, options: Record<string, unknown>): string;
};

type I18nLike = {
  language: string;
  changeLanguage: (next: string) => void;
  /** react-i18next compat: returns the writing direction for a locale. */
  dir: (locale?: string) => 'ltr' | 'rtl';
};

const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur']);
function dirFor(locale?: string): 'ltr' | 'rtl' {
  return locale && RTL_LOCALES.has(locale.toLowerCase().split(/[-_]/)[0]) ? 'rtl' : 'ltr';
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj);
}

export function useTranslation() {
  const intlT = useTranslations();
  const messages = useMessages();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() ?? '/';

  const t = useMemo<TranslateFn>(() => {
    const fn = ((key: string, options?: Record<string, unknown>) => {
      // Array / object lookups (react-i18next's returnObjects: true)
      if (options && options.returnObjects === true) {
        const value = getByPath(messages, key);
        return value === undefined ? key : value;
      }

      // Plain string translation. If the raw message uses i18next-style
      // {{var}} placeholders, next-intl would log an INVALID_MESSAGE error
      // and return a fallback - so handle that syntax ourselves and only
      // defer to next-intl for ICU-formatted messages.
      const raw = getByPath(messages, key);
      if (typeof raw === 'string' && /\{\{\s*\w+\s*\}\}/.test(raw)) {
        if (options && typeof options === 'object') {
          return raw.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => {
            const v = (options as Record<string, unknown>)[name];
            return v === undefined ? `{{${name}}}` : String(v);
          });
        }
        return raw;
      }
      try {
        return intlT(key, options as never);
      } catch {
        return typeof raw === 'string' ? raw : key;
      }
    }) as TranslateFn;
    return fn;
  }, [intlT, messages]);

  const i18n = useMemo<I18nLike>(
    () => ({
      language: locale,
      changeLanguage: (next: string) => {
        const localeRegex = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`);
        const stripped = pathname.replace(localeRegex, '') || '/';
        router.push(`/${next}${stripped === '/' ? '' : stripped}`);
      },
      dir: (l?: string) => dirFor(l ?? locale),
    }),
    [locale, pathname, router],
  );

  return { t, i18n };
}

// <Trans i18nKey="..." components={{ br: <br />, strong: <strong /> }}>fallback</Trans>
//
// Supports the {{ br: <br /> }} component-replacement pattern that the source
// codebase uses. Splits the translated string on {/word} pairs and substitutes
// them with the matching React element.
export function Trans({
  i18nKey,
  components,
  children,
}: {
  i18nKey: string;
  components?: Record<string, ReactElement>;
  children?: ReactNode;
}): ReactElement {
  const { t } = useTranslation();
  const raw = t(i18nKey);
  const text = typeof raw === 'string' ? raw : (children as string) || i18nKey;

  if (!components || Object.keys(components).length === 0) {
    return <>{text}</> as ReactElement;
  }

  // Build a regex that matches <tag/>, <tag>...</tag>, and {{var}} placeholders
  const tagNames = Object.keys(components).join('|');
  const pattern = new RegExp(`<(${tagNames})\\s*/>|<(${tagNames})>([\\s\\S]*?)</\\2>`, 'g');

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const selfClosing = match[1];
    const wrapName = match[2];
    if (selfClosing) {
      const el = components[selfClosing];
      nodes.push(cloneElement(el, { key: `tk-${key++}` }));
    } else if (wrapName) {
      const inner = match[3];
      const el = components[wrapName];
      nodes.push(
        cloneElement(
          el,
          { key: `tk-${key++}` },
          ...Children.toArray(<>{inner}</>),
        ),
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  // Validate that components are valid React elements (silences TS noUnused)
  void isValidElement;

  return <>{nodes}</> as ReactElement;
}

export default useTranslation;
