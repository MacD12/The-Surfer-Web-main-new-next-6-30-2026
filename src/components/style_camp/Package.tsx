'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { Check, Package as PackageIcon, BedDouble, Waves } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-compat'

const CheckPill = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-700">
    <Check className="w-3.5 h-3.5" strokeWidth={2.75} />
  </span>
);

const SurfStylePackage = () => {
  const { t } = useTranslation();
  const rawTitle = t('moroccoPackage1.title') as string;
  const [campName, subtitle] = rawTitle.includes(' - ')
    ? rawTitle.split(' - ', 2)
    : [rawTitle, ''];

  return (
    <section
      id="surfstyle-camp-rates"
      className="scroll-mt-24 relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-cyan-50/30 via-white to-cyan-50/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Eyebrow */}
      <motion.div
        className="flex flex-col items-center mb-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-[#0a67b3]">
          <PackageIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
          Book your surf experience
        </span>
      </motion.div>

      <motion.h2
        className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 leading-[1.05]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {campName}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-2 sm:mt-3 text-sm sm:text-base font-medium tracking-tight text-center text-gray-500"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-5 sm:mt-6 mb-8 sm:mb-10 flex justify-center"
      >
        <span className="block h-[3px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <motion.div
        className="bg-white rounded-3xl shadow-lg ring-1 ring-gray-100 mb-8 sm:mb-10 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Inclusions card header */}
        <div className="px-5 sm:px-6 py-5 bg-gradient-to-br from-cyan-50/60 via-white to-white border-b border-gray-100 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
            <Waves className="w-4 h-4 text-white" strokeWidth={2.25} />
          </span>
          <div>
            <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
              01 · What's included
            </span>
            <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800 leading-tight">
              Surf, yoga, food & vibes
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-br from-gray-50 to-white">
                <th className="px-5 sm:px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 min-w-[160px]">Inclusion</th>
                <th className="px-5 sm:px-6 py-4 text-center text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
                  {t('moroccoPackage1.columns.moderate')}
                </th>
                <th className="px-5 sm:px-6 py-4 text-center text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-700 bg-cyan-50/50">
                  {t('moroccoPackage1.columns.yogaSurf')}
                </th>
                <th className="px-5 sm:px-6 py-4 text-center text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
                  {t('moroccoPackage1.columns.fullSurf')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.surfLessons.label')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  {t('moroccoPackage1.rows.surfLessons.moderate.line1')}<br />
                  {t('moroccoPackage1.rows.surfLessons.moderate.line2')}<br />
                  {t('moroccoPackage1.rows.surfLessons.moderate.line3')}
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  {t('moroccoPackage1.rows.surfLessons.yogaSurf.line1')}<br />
                  {t('moroccoPackage1.rows.surfLessons.yogaSurf.line2')}<br />
                  {t('moroccoPackage1.rows.surfLessons.yogaSurf.line3')}<br />
                  {t('moroccoPackage1.rows.surfLessons.yogaSurf.line4')}<br />
                  {t('moroccoPackage1.rows.surfLessons.yogaSurf.line5')}
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  {t('moroccoPackage1.rows.surfLessons.fullSurf.line1')}<br />
                  {t('moroccoPackage1.rows.surfLessons.fullSurf.line2')}<br />
                  {t('moroccoPackage1.rows.surfLessons.fullSurf.line3')}<br />
                  {t('moroccoPackage1.rows.surfLessons.fullSurf.line4')}<br />
                  {t('moroccoPackage1.rows.surfLessons.fullSurf.line5')}
                </td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.yoga.label')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  {t('common4.notIncluded')}
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  {t('moroccoPackage1.rows.yoga.yogaSurf')}
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  {t('common4.notIncluded')}
                </td>

              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.accommodation')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.breakfast')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.lunch')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.dinner')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.bbq')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.surfTheory')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">{t('common4.notIncluded')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.videoAnalysis')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">{t('common4.notIncluded')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.wifi')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.water')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.cleaning')}</td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
                <td className="px-5 sm:px-6 py-4 text-center"><CheckPill /></td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.pickup')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">{t('common4.included')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">{t('common4.included')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">{t('common4.included')}</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">{t('moroccoPackage1.rows.dayTrip')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  <Check className="inline-block w-3.5 h-3.5 text-emerald-600 mr-1 -mt-0.5" strokeWidth={2.75} />{t('moroccoPackage1.rows.dayTripNote3')}
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  <Check className="inline-block w-3.5 h-3.5 text-emerald-600 mr-1 -mt-0.5" strokeWidth={2.75} />{t('moroccoPackage1.rows.dayTripNote1')}
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-sm text-gray-600 leading-relaxed">
                  <Check className="inline-block w-3.5 h-3.5 text-emerald-600 mr-1 -mt-0.5" strokeWidth={2.75} />{t('moroccoPackage1.rows.dayTripNote2')}
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-3xl shadow-lg ring-1 ring-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Pricing card header */}
        <div className="px-5 sm:px-6 py-5 bg-gradient-to-br from-cyan-50/60 via-white to-white border-b border-gray-100 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
            <BedDouble className="w-4 h-4 text-white" strokeWidth={2.25} />
          </span>
          <div>
            <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
              02 · Rates per person
            </span>
            <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800 leading-tight">
              Weekly pricing
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-br from-gray-50 to-white">
                <th className="px-5 sm:px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 min-w-[180px]">Room</th>
                <th className="px-5 sm:px-6 py-4 text-center text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
                  {t('moroccoPackage1.columns.moderate')}
                </th>
                <th className="px-5 sm:px-6 py-4 text-center text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-700 bg-cyan-50/50">
                  {t('moroccoPackage1.columns.yogaSurf')}
                </th>
                <th className="px-5 sm:px-6 py-4 text-center text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
                  {t('moroccoPackage1.columns.fullSurf')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">
                  {t('moroccoPackage1.prices.shared.label')}
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{t('moroccoPackage1.prices.perPersonPerWeek')}</div>
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-gray-900 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.shared.moderate')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-cyan-700 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.shared.yogaSurf')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-gray-900 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.shared.fullSurf')}</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">
                  {t('moroccoPackage1.prices.double.label')}
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{t('moroccoPackage1.prices.perPersonPerWeek')}</div>
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-gray-900 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.double.moderate')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-cyan-700 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.double.yogaSurf')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-gray-900 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.double.fullSurf')}</td>
              </tr>
              <tr className="border-b border-gray-100 transition-colors hover:bg-cyan-50/30">
                <td className="px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold">
                  {t('moroccoPackage1.prices.single.label')}
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{t('moroccoPackage1.prices.perPersonPerWeek')}</div>
                </td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-gray-900 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.single.moderate')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-cyan-700 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.single.yogaSurf')}</td>
                <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-[montserrat] font-bold text-gray-900 tabular-nums whitespace-nowrap">{t('moroccoPackage1.prices.single.fullSurf')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/40 text-[11px] text-gray-500 text-center">
          Prices are per person · per week and exclude airport transfers and peak-season surcharges.
        </div>
      </motion.div>
      </div>
    </section>
  )
}

export default SurfStylePackage
