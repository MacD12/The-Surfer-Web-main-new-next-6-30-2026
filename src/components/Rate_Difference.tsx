'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n-compat'

const SurfingJourney = () => {
  const { t } = useTranslation();
  const paragraphs =
    (t('surfingJourney1.body.paragraphs', { returnObjects: true }) as string[]) || [];

  return (
    <motion.div
      className='flex flex-col items-center justify-center container mx-auto w-full overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6'
      id='Journey'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className='font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800 px-2'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t('surfingJourney1.title')}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className='mt-4 sm:mt-5 mb-6 sm:mb-7 flex justify-center'
      >
        <span className='block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]' />
      </motion.div>

      <motion.div
        className='max-w-3xl rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 shadow-md p-6 sm:p-8 md:p-10'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className='space-y-4 text-sm sm:text-base leading-relaxed text-center text-gray-600'>
          {paragraphs.map((para, i) => (
            <p key={i} className={i === 0 ? 'font-semibold text-gray-800' : undefined}>
              {para}
            </p>
          ))}
        </div>

        <div className='flex justify-center w-full mt-7'>
          <a
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-105 transition-all duration-300"
            href="/book-now"
            target="_blank"
            rel="noreferrer"
          >
            {t('surfingJourney1.bookNow')}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SurfingJourney
