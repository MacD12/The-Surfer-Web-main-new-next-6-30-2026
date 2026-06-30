'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

/**
 * Shared camp rates section - renders the SAME two-table layout used on the
 * dedicated /rates page (RatesClient.tsx), driven by an i18n namespace.
 *
 * Used on the individual camp pages (beach-camp, ts2-camp, soul-surfer) so
 * their package/rates display matches the /rates page exactly - same data,
 * same format. Pass the translation namespace that holds the camp's rates:
 *   - 'beachPackages'  → The Surfer Beach Camp
 *   - 'ts2Packages'    → The Surfer TS2 Camp
 *   - 'soulSurferPackages' → Soul Surfer Camp
 */

type Row = {
  name: string;
  note?: string;
  moderateSurf: string;
  surfAndYoga: string;
  fullSurf: string;
};

const tableHeadCellCls =
  'px-5 sm:px-6 py-4 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-gray-700 text-center';
const tableRowLabelCls = 'px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold';
const tableCellCls = 'px-5 sm:px-6 py-4 text-center text-sm text-gray-600';

const SectionTitle = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const raw = typeof children === 'string' ? children : '';
  const [campName, subtitle] = raw.includes(' - ') ? raw.split(' - ', 2) : [raw || (children as any), ''];

  return (
    <>
      <motion.h2
        className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {campName}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-2 sm:mt-3 text-sm sm:text-base font-medium tracking-tight text-center text-gray-500"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-5 sm:mt-6 mb-8 sm:mb-10 flex justify-center"
      >
        <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </motion.div>
    </>
  );
};

type Props = {
  /** i18n namespace holding the camp's title/packages/features/accommodation */
  ns: string;
  /** Anchor id for the section wrapper */
  id?: string;
};

const CampRatesSection = ({ ns, id = 'packages' }: Props) => {
  const { t } = useTranslation();

  const packages = (t(`${ns}.packages`, { returnObjects: true }) as Record<string, string>) || {};
  const features = ((t(`${ns}.features`, { returnObjects: true }) as Row[]) || []);
  const accommodation = ((t(`${ns}.accommodation`, { returnObjects: true }) as Row[]) || []);

  return (
    <div id={id} className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <SectionTitle>{t(`${ns}.title`)}</SectionTitle>

      {/* Inclusions table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-b from-gray-50 to-white border-b-2 border-cyan-100">
                <th className={tableHeadCellCls + ' text-left'}></th>
                <th className={tableHeadCellCls}>{packages.moderateSurf}</th>
                <th className={tableHeadCellCls}>{packages.surfAndYoga}</th>
                <th className={tableHeadCellCls}>{packages.fullSurf}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-100 transition-colors hover:bg-cyan-50/30 ${idx % 2 === 1 ? 'bg-gray-50/60' : ''}`}
                >
                  <td className={tableRowLabelCls}>{row.name}</td>
                  <td className={tableCellCls}>{row.moderateSurf}</td>
                  <td className={tableCellCls}>{row.surfAndYoga}</td>
                  <td className={tableCellCls}>{row.fullSurf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Accommodation / pricing table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-b from-cyan-50 to-white border-b-2 border-cyan-200">
                <th className={tableHeadCellCls + ' text-left'}></th>
                <th className={tableHeadCellCls}>{packages.moderateSurf}</th>
                <th className={tableHeadCellCls}>{packages.surfAndYoga}</th>
                <th className={tableHeadCellCls}>{packages.fullSurf}</th>
              </tr>
            </thead>
            <tbody>
              {accommodation.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-100 transition-colors hover:bg-cyan-50/30 ${idx % 2 === 1 ? 'bg-gray-50/60' : ''}`}
                >
                  <td className={tableRowLabelCls}>
                    {row.name}
                    {row.note && <div className="text-xs text-gray-500 font-normal mt-0.5">{row.note}</div>}
                  </td>
                  <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-bold text-blue-600 tabular-nums whitespace-nowrap">
                    {row.moderateSurf}
                  </td>
                  <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-bold text-emerald-600 tabular-nums whitespace-nowrap">
                    {row.surfAndYoga}
                  </td>
                  <td className="px-5 sm:px-6 py-4 text-center text-base sm:text-lg font-bold text-purple-600 tabular-nums whitespace-nowrap">
                    {row.fullSurf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default CampRatesSection;
