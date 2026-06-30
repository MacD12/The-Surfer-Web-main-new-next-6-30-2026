'use client';
import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useTranslation } from '@/lib/i18n-compat';

const IconCircle = ({ kind, aria }) => {
  const common = "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/30 ring-1 ring-white/30";
  const iconLabel = kind === 'email' ? aria.emailIcon : aria.locationIcon;

  return (
    <div className={common} aria-label={iconLabel}>
      {kind === 'email' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={2} stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75
                   A2.25 2.25 0 004.5 4.5h15a2.25 2.25 0 012.25 2.25Zm0 .243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91A2.25 2.25 0 012.25 6.993" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={2} stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      )}
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const cards = t('contact.cards', { returnObjects: true }) || [];
  const aria = t('contact.aria', { returnObjects: true }) || {};

  const visibleCards = cards.filter((c) => {
    const hasTitle = String(c?.title ?? '').trim().length > 0;
    const hasLines = Array.isArray(c?.lines) && c.lines.some((l) => String(l ?? '').trim().length > 0);
    const hasMailto = String(c?.mailto ?? '').trim().length > 0;
    const hasMap = String(c?.mapHref ?? '').trim().length > 0;
    return hasTitle && (hasLines || hasMailto || hasMap);
  });

  return (
    <motion.div
      className="max-w-6xl mx-auto px-5 pt-4 pb-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="flex flex-wrap justify-center gap-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {visibleCards.map((card, idx) => {
          const titleLines = String(card.title || '').split('\n');
          const isEmail = card.icon === 'email';
          const email = card.mailto || (isEmail ? card.lines?.[0] : null);
          const mapHref = card.mapHref || null;

          return (
            <motion.div
              key={idx}
              className="group bg-white shadow-md ring-1 ring-gray-100 p-6 text-center hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300 rounded-2xl flex flex-col items-center min-h-[240px] w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3
                className="text-[15px] sm:text-base font-bold tracking-[0.08em] text-gray-900 uppercase mb-5 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {titleLines.map((line, i) => (
                  <span key={i}>
                    {line}{i < titleLines.length - 1 && <><br/></>}
                  </span>
                ))}
              </motion.h3>

              <motion.div
                className="text-sm text-gray-600 font-medium leading-relaxed mb-6 w-full"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {Array.isArray(card.lines) && card.lines.map((line, li) =>
                  isEmail && li === 0 ? (
                    <p key={li} className="w-full">
                      <a
                        href={`mailto:${email}`}
                        className="block text-cyan-600 hover:text-cyan-700 underline underline-offset-4 decoration-cyan-300/60 hover:decoration-cyan-500 text-center break-all transition-colors"
                      >
                        {line}
                      </a>
                    </p>
                  ) : (
                    <p key={li} className="text-center break-words">{line}</p>
                  )
                )}
              </motion.div>

              <motion.div
                className="mt-auto flex justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "backOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isEmail && email ? (
                    <a
                      href={`mailto:${email}`}
                      aria-label={aria.emailIcon}
                      className="focus:outline-none focus:ring-2 focus:ring-black rounded-full"
                    >
                      <IconCircle kind="email" aria={aria} />
                    </a>
                  ) : mapHref ? (
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={aria.locationIcon}
                      className="focus:outline-none focus:ring-2 focus:ring-black rounded-full"
                    >
                      <IconCircle kind="location" aria={aria} />
                    </a>
                  ) : (
                    <IconCircle kind="location" aria={aria} />
                  )}

                  {card.badge && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3, ease: "backOut" }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {card.badge}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Contact;
