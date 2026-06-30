'use client';
// src/components/FAQRate.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n-compat';

const FAQRate = () => {
  // use default ns (your en.json/de.json)
  const { t, ready } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  // guard until i18n has loaded resources
  if (!ready) return null;

  const items = t("faqRate.items", { returnObjects: true }) || [];

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 * i, ease: "easeOut" }
    })
  };

  return (
    <div className="py-12 px-2 sm:px-0 flex flex-col items-center bg-[#fafafa]">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neutral-400 text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t("faqRate.title")}
      </motion.h2>

      <div className="w-full max-w-6xl flex flex-col gap-5">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className={`bg-white shadow-lg border border-neutral-100 transition-all duration-300 ${
              openIndex === idx ? "ring-2 ring-neutral-200" : ""
            }`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            custom={idx}
            viewport={{ once: true, amount: 0.4 }}
          >
            <button
              className={`w-full flex justify-between items-center px-6 py-5 focus:outline-none transition-all duration-200 ${
                openIndex === idx
                  ? "rounded-t-xl bg-neutral-50/40"
                  : "hover:bg-neutral-50"
              }`}
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-rate-panel-${idx}`}
            >
              <span className="text-lg md:text-lg font-bold text-left text-neutral-700">
                {item.question}
              </span>
              <span className="text-3xl font-bold text-neutral-700">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            {openIndex === idx && item.answer && (
              <div
                id={`faq-rate-panel-${idx}`}
                className="px-6 pb-6 text-base xl:text-[.875rem] text-neutral-700 animate-fadein"
              >
                {String(item.answer)
                  .split(/\n{2,}|\r\n\r\n/)
                  .map((block, i) => (
                    <p key={i} className="mb-3 last:mb-0 leading-relaxed whitespace-pre-wrap">
                      {block}
                    </p>
                  ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQRate;
