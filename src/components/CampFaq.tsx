'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

type FaqItem = { question: string; answer: string };
type Props = {
  /** i18n namespace under `campFaq` - e.g. 'beach' | 'ts2' | 'soul'. */
  campKey: 'beach' | 'ts2' | 'soul';
};

/**
 * Per-camp FAQ section. Reads campFaq.{campKey}.items from i18n, renders an
 * accordion, and pairs visually with the FAQPage JSON-LD emitted on the
 * camp's server page. Schema items MUST mirror what's rendered here - Google
 * penalises FAQ schema that doesn't match visible content.
 */
const CampFaq = ({ campKey }: Props) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = (t(`campFaq.${campKey}.items`, { returnObjects: true }) as FaqItem[]) || [];
  if (!items.length) return null;

  const eyebrow = t('campFaq.eyebrow');
  const heading = t('campFaq.heading');

  return (
    <section
      aria-label={heading}
      className="relative w-full bg-gradient-to-b from-white via-cyan-50/30 to-white py-14 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="flex flex-col items-center mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
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
            className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-cyan-50/40 transition-colors"
                >
                  <span className="text-sm sm:text-[15px] font-semibold text-gray-800 leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-[#0a67b3] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    strokeWidth={2.25}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm sm:text-[15px] text-gray-600 leading-[1.75]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampFaq;
