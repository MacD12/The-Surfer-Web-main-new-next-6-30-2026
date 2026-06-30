'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, HelpCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';

type FAQItem = { question: string; answer: string };

const FAQ = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = (t('faq.items', { returnObjects: true }) as FAQItem[]) || [];
  const eyebrow = t('faq.eyebrow');
  const heading = t('faq.heading');
  const subtitle = t('faq.subtitle');
  const helpText = t('faq.helpText');
  const contactCta = t('footer.links.contact');

  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start max-w-7xl mx-auto">
          {/* LEFT - heading + subtitle + help CTA. Sticky on lg+ so it stays
             visible while the user scrolls through the accordion. */}
          <motion.aside
            className="lg:col-span-5 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              {heading}
            </h2>
            <motion.div
              className="mt-4 mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            />
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-7 max-w-md">
              {subtitle}
            </p>

            {/* Help CTA card */}
            <div className="inline-flex flex-col gap-3 p-5 sm:p-6 max-w-md bg-white/70 backdrop-blur-sm rounded-2xl ring-1 ring-[#0a67b3]/10 shadow-sm">
              <div className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                <HelpCircle className="w-4 h-4 text-[#0a67b3]" />
                {helpText}
              </div>
              <a
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-[#0a67b3] hover:text-[#094f86] transition-colors"
              >
                <span className="relative">
                  {contactCta}
                  <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 group-hover:w-full bg-[#0a67b3] transition-all duration-500 ease-out" />
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.aside>

          {/* RIGHT - accordion list */}
          <div className="lg:col-span-7 space-y-3 min-w-0">
            {faqData.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`group relative overflow-hidden rounded-2xl bg-white ring-1 transition-all duration-300 ${
                    isOpen
                      ? 'ring-[#0a67b3]/30 shadow-xl shadow-[#0a67b3]/10'
                      : 'ring-black/5 shadow-md hover:shadow-lg hover:ring-[#0a67b3]/20'
                  }`}
                >
                  {/* Active-state accent: brand-blue bar on the left edge */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-top transition-transform duration-500 ease-out ${
                      isOpen ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a67b3]/40"
                  >
                    <span
                      className={`text-sm sm:text-base md:text-[17px] font-bold leading-snug min-w-0 transition-colors duration-300 ${
                        isOpen ? 'text-[#0a67b3]' : 'text-gray-800'
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#0a67b3] text-white rotate-45 shadow-md shadow-[#0a67b3]/30'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-[#0a67b3]/10 group-hover:text-[#0a67b3]'
                      }`}
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.25} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && item.answer && (
                      <motion.div
                        key="answer"
                        id={`faq-panel-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm md:text-[15px] text-gray-600 leading-[1.75]">
                          {item.answer.split('\n').map((line, i) => (
                            <p key={i} className="mb-3 last:mb-0">
                              {line}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
