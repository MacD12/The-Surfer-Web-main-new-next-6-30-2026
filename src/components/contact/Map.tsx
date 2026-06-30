'use client';
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Waves,
  Home,
  Sparkles,
  Mountain,
  LocateFixed,
  Navigation,
  Check,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { CAMPS, type Camp } from './camps';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-50/40 to-white animate-pulse" />
  ),
});

const ICON_FOR_CAMP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  beach: Waves,
  ts2: Home,
  soul: Sparkles,
  surfstyle: Mountain,
};

const COUNTRIES: { id: Camp['country']; label: string; flag: string }[] = [
  { id: 'sri-lanka', label: 'Sri Lanka', flag: '🇱🇰' },
  { id: 'morocco', label: 'Morocco', flag: '🇲🇦' },
];

const Map = () => {
  const { t, i18n } = useTranslation();
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [activeCampId, setActiveCampId] = useState<string | null>(null);

  const grouped = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        ...country,
        camps: CAMPS.filter((c) => c.country === country.id),
      })),
    [],
  );

  const viewKey = mapType === 'satellite' ? 'satellite' : 'map';
  const viewLabel = t(`map.viewLabel.${viewKey}`);
  const activeCamp = CAMPS.find((c) => c.id === activeCampId) || null;
  const sectionLabel = activeCamp
    ? `${activeCamp.name} - ${viewLabel}`
    : t('map.iframeTitle', {
        location: t('map.location'),
        view: viewLabel,
      });

  return (
    <motion.div
      className="max-w-8xl mx-auto pt-12 sm:pt-14 px-4 sm:px-6"
      dir={i18n.dir()}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header: Map/Satellite toggle + active-camp chip */}
        <motion.div
          className="bg-gradient-to-b from-gray-50 to-white px-5 py-3.5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Left: Map type toggle */}
          <div className="inline-flex gap-1 p-1 rounded-full bg-gray-100/80 ring-1 ring-gray-200">
            <button
              onClick={() => setMapType('roadmap')}
              aria-label={t('map.aria.toggleMap')}
              aria-pressed={mapType === 'roadmap'}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full tracking-[0.1em] uppercase transition-all duration-300 ${
                mapType === 'roadmap'
                  ? 'text-white bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/30'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t('map.buttons.map')}
            </button>
            <button
              onClick={() => setMapType('satellite')}
              aria-label={t('map.aria.toggleSatellite')}
              aria-pressed={mapType === 'satellite'}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full tracking-[0.1em] uppercase transition-all duration-300 ${
                mapType === 'satellite'
                  ? 'text-white bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/30'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t('map.buttons.satellite')}
            </button>
          </div>

          {/* Right: Active camp chip + Show all */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {activeCamp && (
                <motion.span
                  key={activeCamp.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ring-1 ${
                    activeCamp.country === 'sri-lanka'
                      ? 'bg-cyan-50 text-cyan-700 ring-cyan-200'
                      : 'bg-amber-50 text-amber-700 ring-amber-200'
                  }`}
                >
                  <MapPin className="w-3 h-3" strokeWidth={2.5} />
                  {activeCamp.name}
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setActiveCampId(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-600 ring-1 ring-gray-200 text-[11px] font-semibold tracking-wide hover:ring-cyan-300 hover:text-cyan-700 hover:bg-cyan-50/40 transition-all duration-200"
              aria-label="Show all camps"
            >
              <LocateFixed className="w-3 h-3" strokeWidth={2.5} />
              Show all
            </button>
          </div>
        </motion.div>

        {/* Main: Map + Picker */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Map */}
          <div
            className="relative h-80 md:h-[500px] lg:col-span-8 lg:h-[540px]"
            role="region"
            aria-label={sectionLabel}
          >
            <LeafletMap
              mapType={mapType}
              activeCampId={activeCampId}
              onActiveCampChange={setActiveCampId}
            />
          </div>

          {/* Picker sidebar */}
          <aside className="lg:col-span-4 lg:max-h-[540px] lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-100 bg-gradient-to-b from-white via-cyan-50/20 to-white">
            <div className="px-4 sm:px-5 py-4 sm:py-5">
              <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-700 mb-1">
                Locations
              </span>
              <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-900 leading-tight">
                Pick a camp to focus the map
              </h3>
              <p className="mt-1 text-[11px] text-gray-500">
                Tap any camp - the map will fly to it. Use the popup or card to open Google Maps directions.
              </p>
            </div>

            {grouped.map((country, gIdx) => (
              <div key={country.id} className="px-3 sm:px-4 pb-3 sm:pb-4">
                {/* Country header */}
                <div className="flex items-center gap-2 px-1 mb-2">
                  <span className="text-base leading-none" aria-hidden="true">
                    {country.flag}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-gray-500">
                    {country.label}
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                  <span className="text-[10px] font-bold tabular-nums text-gray-400">
                    {country.camps.length}
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-2.5">
                  {country.camps.map((camp) => {
                    // Global index (1-based) across all camps for the pin number.
                    const globalIdx =
                      CAMPS.findIndex((c) => c.id === camp.id) + 1;
                    const isActive = camp.id === activeCampId;
                    const Icon = ICON_FOR_CAMP[camp.id] || MapPin;
                    const themeRing =
                      camp.country === 'sri-lanka'
                        ? 'ring-cyan-200'
                        : 'ring-amber-200';
                    const themeGradient =
                      camp.country === 'sri-lanka'
                        ? 'from-[#0a67b3] to-[#0891b2]'
                        : 'from-amber-600 to-amber-500';

                    return (
                      <motion.button
                        key={camp.id}
                        type="button"
                        onClick={() => setActiveCampId(camp.id)}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.05 + gIdx * 0.05,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ y: -2 }}
                        className={`group w-full text-left flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
                          isActive
                            ? `bg-white ring-2 ${themeRing} shadow-md`
                            : 'bg-white/70 ring-1 ring-gray-100 hover:ring-cyan-200/70 hover:bg-white hover:shadow-md'
                        }`}
                      >
                        {/* Number badge */}
                        <span
                          className={`shrink-0 relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${themeGradient} shadow-md`}
                        >
                          <Icon
                            className="w-4 h-4 text-white"
                            strokeWidth={2.25}
                          />
                          <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-white ring-1 ring-gray-200 text-[9px] font-bold tabular-nums text-gray-700">
                            {String(globalIdx).padStart(2, '0')}
                          </span>
                        </span>

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-[montserrat] text-sm font-bold tracking-tight text-gray-900 leading-tight truncate">
                            {camp.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-snug truncate">
                            {camp.short}
                          </p>
                          <p className="mt-0.5 inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.14em] uppercase text-gray-400 tabular-nums">
                            <MapPin className="w-2.5 h-2.5" strokeWidth={2.5} />
                            {camp.plusCode}
                          </p>
                        </div>

                        {/* Trailing icon */}
                        <span
                          className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                            isActive
                              ? `text-white bg-gradient-to-br ${themeGradient} ring-2 ring-white shadow-sm`
                              : 'bg-gray-50 text-gray-500 ring-1 ring-gray-100 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:ring-cyan-200'
                          }`}
                          aria-hidden="true"
                        >
                          {isActive ? (
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          ) : (
                            <Navigation
                              className="w-3.5 h-3.5"
                              strokeWidth={2.25}
                            />
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Hint */}
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <div className="rounded-xl bg-cyan-50/60 ring-1 ring-cyan-100/70 px-3 py-2.5 text-[11px] text-gray-600 leading-relaxed">
                Click a marker on the map to open the camp's details popup, or use the cards above to fly the map to that camp.
              </div>
            </div>
          </aside>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="bg-gradient-to-b from-white to-gray-50 px-4 py-3 border-t border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-700">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2]" />
              Sri Lanka camps
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-amber-500 to-amber-400" />
              Morocco camp
            </span>
            <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] ml-1">
              {viewLabel}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Map;
