'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LK from 'country-flag-icons/react/3x2/LK';
import MA from 'country-flag-icons/react/3x2/MA';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/lib/i18n-compat';
import Rate_Difference from '@/components/Rate_Difference';
import FAQRate from '@/components/faq-rate';
import ComfortableStays from '@/components/beach_camp/ComfortableStays';
import ComfortableStayss from '@/components/ts_camp/ComfortableStayss';
import ComfortableStaysSoul from '@/components/soul_surfer/ComfortableStays';
import SurfStylePackage from '@/components/style_camp/Package';
import ComfortableStaysStyle from '@/components/style_camp/ComfortableStays';
import ContactMap from '@/components/contact/Map';

/**
 * Country flag components from the `country-flag-icons` package - gives us
 * official, accurate SVG flags including the Sri Lanka lion + bo leaves and
 * the proper Morocco pentagram. Imported as direct tree-shakeable subpath
 * imports so only LK + MA ship in the bundle (~few KB total).
 *
 * Used instead of unicode emoji (🇱🇰, 🇲🇦) because Windows/Chrome falls back
 * to the bare country-code text ("LK", "MA") since it has no flag-emoji font.
 */
const SriLankaFlag = ({ className = 'w-9 h-auto' }: { className?: string }) => (
  <LK title="Sri Lanka" className={className} />
);

const MoroccoFlag = ({ className = 'w-9 h-auto' }: { className?: string }) => (
  <MA title="Morocco" className={className} />
);

const RatesQuickNav = () => {
  const { t } = useTranslation();

  const sriLankaCamps = [
    { name: t('navbar.camps.beachCamp'), href: '#beach-camp-rates' },
    { name: t('navbar.camps.ts2Camp'), href: '#ts2-camp-rates' },
    { name: t('navbar.camps.soulSurfer'), href: '#soul-surfer-rates' },
  ];

  const moroccoCamps = [
    { name: t('navbar.camps.styleCamp'), href: '#surfstyle-camp-rates' },
  ];

  const Pill = ({ href, name, delay = 0 }: { href: string; name: string; delay?: number }) => (
    <motion.a
      href={href}
      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white ring-1 ring-gray-200 text-gray-800 text-xs sm:text-sm font-semibold shadow-sm hover:ring-cyan-300 hover:bg-cyan-50/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="tracking-tight">{name}</span>
      <svg
        className="w-3.5 h-3.5 text-cyan-500 transition-transform duration-300 group-hover:translate-x-0.5"
        fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.a>
  );

  const CountryCard = ({
    Flag, country, camps, delay = 0,
  }: {
    Flag: React.ComponentType<{ className?: string }>;
    country: string;
    camps: { name: string; href: string }[];
    delay?: number;
  }) => (
    <motion.div
      className="flex flex-col rounded-2xl bg-gradient-to-br from-cyan-50/50 via-white to-white ring-1 ring-cyan-100/70 shadow-md p-5 sm:p-6 md:p-7 text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col items-center gap-2.5 mb-4 sm:mb-5">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white ring-1 ring-cyan-200/60 shadow-sm overflow-hidden"
        >
          <Flag className="w-8 h-auto sm:w-9 rounded-sm shadow-sm" />
        </span>
        <div className="flex flex-col items-center">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-700">
            {country}
          </span>
          <span className="text-xs text-gray-500 font-medium mt-0.5">
            {camps.length === 1
              ? (t('ratesNav.campsLabel_one', { count: camps.length }) || `${camps.length} camp`)
              : (t('ratesNav.campsLabel_other', { count: camps.length }) || `${camps.length} camps`)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {camps.map((c, i) => (
          <Pill key={c.href} href={c.href} name={c.name} delay={delay + 0.1 + i * 0.05} />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-2">
      <motion.div
        className="text-center mb-7 sm:mb-9"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-600">
          {t('ratesNav.eyebrow')}
        </span>
        <h2 className="mt-2 font-[montserrat] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
          {t('ratesNav.title')}
        </h2>
        <div className="mt-3 mb-4 flex justify-center">
          <span className="block h-[3px] w-10 sm:w-12 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
        </div>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          {t('ratesNav.intro')}
        </p>
      </motion.div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 items-start">
        <CountryCard Flag={SriLankaFlag} country={t('ratesNav.countries.sriLanka')} camps={sriLankaCamps} delay={0} />
        <CountryCard Flag={MoroccoFlag}  country={t('ratesNav.countries.morocco')}  camps={moroccoCamps}  delay={0.1} />
      </div>
    </section>
  );
};

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

const tableHeadCellCls = "px-5 sm:px-6 py-4 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-gray-700 text-center";
const tableRowLabelCls = "px-5 sm:px-6 py-4 text-sm text-gray-800 font-semibold";
const tableCellCls = "px-5 sm:px-6 py-4 text-center text-sm text-gray-600";

const PackageSection = () => {
  const { t } = useTranslation();

  return (
    <div id="beach-camp-rates" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <SectionTitle>{t('beachPackages.title')}</SectionTitle>

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
                <th className={tableHeadCellCls + " text-left"}></th>
                <th className={tableHeadCellCls}>{t('beachPackages.packages.moderateSurf')}</th>
                <th className={tableHeadCellCls}>{t('beachPackages.packages.surfAndYoga')}</th>
                <th className={tableHeadCellCls}>{t('beachPackages.packages.fullSurf')}</th>
              </tr>
            </thead>
            <tbody>
              {((t('beachPackages.features', { returnObjects: true }) as any[]) || []).map(
                (row: any, idx: number) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 transition-colors hover:bg-cyan-50/30 ${idx % 2 === 1 ? 'bg-gray-50/60' : ''}`}
                  >
                    <td className={tableRowLabelCls}>{row.name}</td>
                    <td className={tableCellCls}>{row.moderateSurf}</td>
                    <td className={tableCellCls}>{row.surfAndYoga}</td>
                    <td className={tableCellCls}>{row.fullSurf}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

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
                <th className={tableHeadCellCls + " text-left"}></th>
                <th className={tableHeadCellCls}>{t('beachPackages.packages.moderateSurf')}</th>
                <th className={tableHeadCellCls}>{t('beachPackages.packages.surfAndYoga')}</th>
                <th className={tableHeadCellCls}>{t('beachPackages.packages.fullSurf')}</th>
              </tr>
            </thead>
            <tbody>
              {((t('beachPackages.accommodation', { returnObjects: true }) as any[]) || []).map(
                (row: any, idx: number) => (
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

const SoulSurferPackageSection = () => {
  const { t } = useTranslation();

  return (
    <div id="soul-surfer-rates" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <SectionTitle>{t('soulSurferPackages.title')}</SectionTitle>

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
                <th className={tableHeadCellCls + " text-left"}></th>
                <th className={tableHeadCellCls}>{t('soulSurferPackages.packages.moderateSurf')}</th>
                <th className={tableHeadCellCls}>{t('soulSurferPackages.packages.surfAndYoga')}</th>
                <th className={tableHeadCellCls}>{t('soulSurferPackages.packages.fullSurf')}</th>
              </tr>
            </thead>
            <tbody>
              {((t('soulSurferPackages.features', { returnObjects: true }) as any[]) || []).map(
                (row: any, idx: number) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 transition-colors hover:bg-cyan-50/30 ${idx % 2 === 1 ? 'bg-gray-50/60' : ''}`}
                  >
                    <td className={tableRowLabelCls}>{row.name}</td>
                    <td className={tableCellCls}>{row.moderateSurf}</td>
                    <td className={tableCellCls}>{row.surfAndYoga}</td>
                    <td className={tableCellCls}>{row.fullSurf}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

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
                <th className={tableHeadCellCls + " text-left"}></th>
                <th className={tableHeadCellCls}>{t('soulSurferPackages.packages.moderateSurf')}</th>
                <th className={tableHeadCellCls}>{t('soulSurferPackages.packages.surfAndYoga')}</th>
                <th className={tableHeadCellCls}>{t('soulSurferPackages.packages.fullSurf')}</th>
              </tr>
            </thead>
            <tbody>
              {((t('soulSurferPackages.accommodation', { returnObjects: true }) as any[]) || []).map(
                (row: any, idx: number) => (
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

const Ts2PackageSection = () => {
  const { t } = useTranslation();

  return (
    <div id="ts2-camp-rates" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <SectionTitle>{t('ts2Packages.title')}</SectionTitle>

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
                <th className={tableHeadCellCls + " text-left"}></th>
                <th className={tableHeadCellCls}>{t('ts2Packages.packages.moderateSurf')}</th>
                <th className={tableHeadCellCls}>{t('ts2Packages.packages.surfAndYoga')}</th>
                <th className={tableHeadCellCls}>{t('ts2Packages.packages.fullSurf')}</th>
              </tr>
            </thead>
            <tbody>
              {((t('ts2Packages.features', { returnObjects: true }) as any[]) || []).map(
                (row: any, idx: number) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 transition-colors hover:bg-cyan-50/30 ${idx % 2 === 1 ? 'bg-gray-50/60' : ''}`}
                  >
                    <td className={tableRowLabelCls}>{row.name}</td>
                    <td className={tableCellCls}>{row.moderateSurf}</td>
                    <td className={tableCellCls}>{row.surfAndYoga}</td>
                    <td className={tableCellCls}>{row.fullSurf}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

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
                <th className={tableHeadCellCls + " text-left"}></th>
                <th className={tableHeadCellCls}>{t('ts2Packages.packages.moderateSurf')}</th>
                <th className={tableHeadCellCls}>{t('ts2Packages.packages.surfAndYoga')}</th>
                <th className={tableHeadCellCls}>{t('ts2Packages.packages.fullSurf')}</th>
              </tr>
            </thead>
            <tbody>
              {((t('ts2Packages.accommodation', { returnObjects: true }) as any[]) || []).map(
                (row: any, idx: number) => (
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default function RatesClient() {
  return (
    <div>
      <div
        className="relative min-h-screen mb-4 flex items-center w-full overflow-hidden bg-gray-900"
        id="Header"
      >
        <Image
          src="/rates.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <Navbar />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55 pointer-events-none" />
        <div className="container relative z-10 text-center mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-[montserrat] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] inline-block max-w-full sm:max-w-3xl font-bold tracking-tight leading-[1.02] pt-18 mt-16 sm:mt-8 md:-mt-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          >
            Packages & Rates
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="mt-6 sm:mt-8 flex justify-center"
          >
            <span className="block h-[3px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
          </motion.div>
        </div>
      </div>

      <RatesQuickNav />

      <PackageSection />
      <ComfortableStays />
      <Ts2PackageSection />
      <ComfortableStayss />

      <Rate_Difference />

      <SoulSurferPackageSection />
      <ComfortableStaysSoul />

      <SurfStylePackage />
      <ComfortableStaysStyle />

      <FAQRate />

      <div className="mt-16 mb-16">
        <ContactMap />
      </div>

      <Footer />
    </div>
  );
}
