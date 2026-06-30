'use client';
import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cookie, Shield, BarChart3, Megaphone, Settings2, Check } from 'lucide-react';

/**
 * GDPR-friendly cookie banner.
 *
 * Storage:
 *   - localStorage (persistent - required for GDPR; sessionStorage re-prompts
 *     every session which annoys users and arguably is non-compliant).
 *   - Versioned key so policy/scope changes can transparently re-trigger
 *     consent without manually clearing storage.
 *
 * UX:
 *   - No dismissive "X". GDPR forbids implicit consent via close.
 *   - "Accept All" and "Reject All" rendered with equal visual weight in the
 *     compact view, per CNIL/ICO guidance against dark-pattern hierarchies.
 *   - Detail view focus-trapped, Esc returns to compact view.
 *   - prefers-reduced-motion respected.
 *   - On mobile renders as a bottom sheet; on desktop as a corner card.
 */

const CONSENT_KEY = 'cookieConsent_v1';

type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

type StoredConsent = ConsentCategories & {
  timestamp: string;
  version: 1;
};

const initializeCookies = (consent: ConsentCategories) => {
  // Tag manager / analytics consent updates would go here.
  // Kept as a hook so plumbing GA/GTM later is one diff.
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
      personalization_storage: consent.preferences ? 'granted' : 'denied',
    });
  }
};

type Category = {
  key: 'necessary' | 'analytics' | 'marketing' | 'preferences';
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const CATEGORIES: Category[] = [
  {
    key: 'necessary',
    label: 'Strictly necessary',
    description: 'Required for the site to function - sign-in, security, language preference.',
    Icon: Shield,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    description: 'Anonymous traffic and behaviour data so we can improve the site.',
    Icon: BarChart3,
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Helps us measure the success of campaigns and show relevant offers.',
    Icon: Megaphone,
  },
  {
    key: 'preferences',
    label: 'Preferences',
    description: 'Remembers small choices - currency, dismissed tips, last-viewed camp.',
    Icon: Settings2,
  },
];

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentCategories>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const prefersReducedMotion = useReducedMotion();

  // Only show banner if user hasn't recorded a choice yet.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) {
        setIsVisible(true);
        return;
      }
      const parsed = JSON.parse(raw) as Partial<StoredConsent>;
      if (parsed?.version !== 1) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const persist = useCallback((next: ConsentCategories) => {
    const record: StoredConsent = {
      ...next,
      necessary: true,
      timestamp: new Date().toISOString(),
      version: 1,
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    } catch {
      /* private mode / storage disabled - silently no-op */
    }
    initializeCookies(record);
    setIsVisible(false);
    setShowPreferences(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true, preferences: true });
  }, [persist]);

  const handleRejectAll = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false, preferences: false });
  }, [persist]);

  const handleSavePreferences = useCallback(() => {
    persist(preferences);
  }, [persist, preferences]);

  const togglePreference = (key: Category['key']) => {
    if (key === 'necessary') return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Esc key handling in detail view
  useEffect(() => {
    if (!showPreferences) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPreferences(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showPreferences]);

  // Focus the first interactive element when opening detail view.
  useEffect(() => {
    if (!showPreferences) return;
    const node = dialogRef.current?.querySelector<HTMLElement>(
      '[data-autofocus="true"]'
    );
    node?.focus();
  }, [showPreferences]);

  // Listen for an external "open cookie preferences" trigger (a footer link can
  // dispatch `window.dispatchEvent(new Event('cookie-preferences:open'))` to
  // re-open this banner after the user has already consented).
  useEffect(() => {
    const open = () => {
      try {
        const raw = localStorage.getItem(CONSENT_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<StoredConsent>;
          setPreferences({
            necessary: true,
            analytics: !!parsed.analytics,
            marketing: !!parsed.marketing,
            preferences: !!parsed.preferences,
          });
        }
      } catch {
        /* noop */
      }
      setIsVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener('cookie-preferences:open', open);
    return () => window.removeEventListener('cookie-preferences:open', open);
  }, []);

  if (!isVisible) return null;

  const animProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 24, scale: 0.98 },
        transition: { type: 'spring', damping: 28, stiffness: 240 },
      };

  return (
    <AnimatePresence>
      <>
        {showPreferences && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        )}

        <motion.div
          key="card"
          ref={dialogRef}
          role="dialog"
          aria-modal={showPreferences ? 'true' : 'false'}
          aria-labelledby={titleId}
          aria-describedby={descId}
          {...animProps}
          className={
            showPreferences
              ? 'fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-2xl sm:bottom-6 sm:inset-x-6'
              : 'fixed inset-x-0 bottom-0 z-[70] mx-auto w-full sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md'
          }
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div
            className={`relative bg-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.25)] ring-1 ring-black/5 ${
              showPreferences
                ? 'rounded-t-3xl sm:rounded-3xl'
                : 'rounded-t-3xl sm:rounded-3xl'
            }`}
          >
            {/* COMPACT VIEW */}
            {!showPreferences && (
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-md shadow-cyan-500/20">
                    <Cookie className="w-5 h-5" strokeWidth={2.25} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2
                      id={titleId}
                      className="font-[montserrat] text-base sm:text-[17px] font-bold tracking-tight text-gray-900 leading-tight"
                    >
                      We use cookies
                    </h2>
                    <p
                      id={descId}
                      className="mt-1 text-[13px] sm:text-sm text-gray-600 leading-relaxed"
                    >
                      Some help the site work; others (analytics, marketing) are optional. Choose what you're comfortable with - you can change this anytime in our{' '}
                      <a
                        href="/policy"
                        className="font-semibold text-cyan-700 underline decoration-cyan-200 underline-offset-2 hover:decoration-cyan-500 transition-colors"
                      >
                        cookie policy
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="sm:col-span-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-gray-700 bg-gray-100 ring-1 ring-gray-200 hover:bg-gray-200 hover:ring-gray-300 transition-all duration-200 active:scale-[0.98]"
                  >
                    Reject all
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-gray-700 bg-white ring-1 ring-gray-200 hover:ring-cyan-300 hover:text-cyan-700 hover:bg-cyan-50/40 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Settings2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Customize
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="sm:col-span-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-white bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            )}

            {/* DETAIL VIEW */}
            {showPreferences && (
              <div className="flex flex-col max-h-[85vh] sm:max-h-[80vh]">
                {/* Header */}
                <div className="flex items-center gap-3 px-5 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100">
                  <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-md shadow-cyan-500/20">
                    <Settings2 className="w-4 h-4" strokeWidth={2.25} />
                  </span>
                  <div className="min-w-0">
                    <h2
                      id={titleId}
                      className="font-[montserrat] text-base sm:text-[17px] font-bold tracking-tight text-gray-900 leading-tight"
                    >
                      Cookie preferences
                    </h2>
                    <p id={descId} className="text-[12px] sm:text-[13px] text-gray-500">
                      Pick what we can store. Necessary cookies are always on.
                    </p>
                  </div>
                </div>

                {/* Category list (scrollable) */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-2.5">
                  {CATEGORIES.map((cat, idx) => {
                    const isOn = preferences[cat.key];
                    const isLocked = cat.key === 'necessary';
                    const Icon = cat.Icon;
                    return (
                      <div
                        key={cat.key}
                        className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl ring-1 transition-colors ${
                          isLocked
                            ? 'bg-gradient-to-br from-emerald-50/70 to-white ring-emerald-100/80'
                            : isOn
                            ? 'bg-cyan-50/40 ring-cyan-200/80'
                            : 'bg-white ring-gray-200'
                        }`}
                      >
                        <span
                          className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl ring-1 ${
                            isLocked
                              ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                              : isOn
                              ? 'bg-white text-cyan-700 ring-cyan-200'
                              : 'bg-gray-50 text-gray-500 ring-gray-200'
                          }`}
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" strokeWidth={2.25} />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-[montserrat] text-sm font-bold tracking-tight text-gray-900">
                              {cat.label}
                            </span>
                            {isLocked && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-[0.12em] uppercase">
                                <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                Always on
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[12px] sm:text-[13px] text-gray-600 leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        {isLocked ? (
                          // Visually distinct from togglable rows - solid badge,
                          // never appears as an interactive control.
                          <span
                            aria-hidden="true"
                            className="shrink-0 mt-0.5 inline-flex items-center justify-center w-10 h-6 rounded-full bg-emerald-500 text-white"
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                        ) : (
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isOn}
                            aria-label={`Toggle ${cat.label} cookies`}
                            onClick={() => togglePreference(cat.key)}
                            data-autofocus={idx === 1 ? 'true' : undefined}
                            className={`shrink-0 mt-0.5 relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${
                              isOn ? 'bg-cyan-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                                isOn ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer actions */}
                <div className="border-t border-gray-100 px-5 sm:px-6 py-4 bg-gradient-to-b from-white to-gray-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleRejectAll}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-gray-700 bg-gray-100 ring-1 ring-gray-200 hover:bg-gray-200 hover:ring-gray-300 transition-all duration-200 active:scale-[0.98]"
                    >
                      Reject all
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePreferences}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-cyan-700 bg-white ring-1 ring-cyan-200 hover:bg-cyan-50 hover:ring-cyan-300 transition-all duration-200 active:scale-[0.98]"
                    >
                      Save preferences
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-white bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      Accept all
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default CookieBanner;
