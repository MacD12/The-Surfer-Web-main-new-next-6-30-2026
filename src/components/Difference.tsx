'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';

/**
 * Source paragraphs (from i18n) come in this order:
 *   [0] intro line (may hold multiple paragraphs separated by blank lines)
 *   [1] "Beach Camp: ..." description  (kept in i18n for SEO + reuse, not rendered here)
 *   [2] "TS2 Camp: ..." description    (kept in i18n for SEO + reuse, not rendered here)
 *   [3] "Soul Surfer: ..." description (kept in i18n for SEO + reuse, not rendered here)
 *   [4] shared note - where Beach Camp + TS2 activities happen (not rendered here)
 *   [5] shared note - transport compensation between Beach Camp + TS2 (not rendered here)
 *
 * The per-camp mini-cards (1..3) and the shared-notes panel (4..5) used to
 * render here but were removed - the slider cards above and the BOOK NOW
 * "Compare Camps" section cover that ground without duplicate content.
 * Items 1-5 stay in i18n untouched so other pages / SEO can still use them.
 */
const Difference = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const eyebrow = t('ts2Diff.eyebrow');
  const heading = t('ts2Diff.heading');
  const cta = t('ts2Diff.cta');
  const paragraphs =
    (t('ts2Diff.paragraphs', { returnObjects: true }) as string[]) || [];
  const aria = t('ts2Diff.aria', { returnObjects: true }) as {
    section?: string;
    cta?: string;
  };

  // The intro (paragraphs[0]) may hold a lead line + extra paragraphs,
  // separated by blank lines. Split so each renders as its own <p>.
  const introParts = (paragraphs[0] || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section
      className="relative w-full"
      aria-label={aria?.section}
    >
      {/* Heading */}
      <motion.div
        className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
          {eyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          {heading}
        </h2>
        <motion.div
          className="mt-4 mb-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        />
        {introParts.length > 0 && (
          <div className="space-y-3">
            {introParts.map((part, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-base md:text-lg font-bold text-gray-800 leading-relaxed uppercase tracking-[0.12em]'
                    : 'text-sm md:text-base text-gray-600 leading-relaxed'
                }
              >
                {part}
              </p>
            ))}
          </div>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <a
          href={`/${locale}/rates`}
          aria-label={aria?.cta || cta}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-lg shadow-[#0a67b3]/25 hover:shadow-xl hover:shadow-[#0a67b3]/40 hover:scale-105 transition-all duration-300"
        >
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};

export default Difference;
