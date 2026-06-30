'use client';
import { motion } from 'framer-motion';  // eslint-disable-line no-unused-vars
import { useTranslation } from '@/lib/i18n-compat';

const Policy = () => {
  const { t, i18n } = useTranslation();
  const points = t('policy.points', { returnObjects: true }) || [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 md:py-14" dir={i18n.dir()}>
      <motion.h2
        className="font-[montserrat] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.15em] text-center text-gray-800 uppercase"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {t('policy.title')}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mt-4 sm:mt-5 mb-8 md:mb-10 flex justify-center"
      >
        <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 shadow-md p-6 sm:p-8 md:p-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="space-y-5">
          {points.map((p, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3 sm:gap-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <span
                aria-hidden="true"
                className="shrink-0 mt-2 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              />
              <p className="flex-1 text-sm sm:text-base leading-relaxed text-gray-600">
                <strong className="font-semibold text-gray-800">{p.strong}</strong>{' '}
                {p.note && <span className="text-gray-500">{p.note}</span>}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-sm sm:text-base leading-relaxed text-center text-gray-500 pt-6 mt-6 border-t border-cyan-100/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {t('policy.contact')}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Policy;
