'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Waves,
  Activity,
  Sparkles,
  Users,
  AlertTriangle,
} from 'lucide-react';

import Summary from '@/components/booking_engine/Summary';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

type PackageData = {
  id: string;
  title: string;
  short: string;
  info: string;
  includes: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  highlight: { value: string; label: string };
};

const PACKAGE_DATA: PackageData[] = [
  {
    id: '1',
    title: 'Moderate Surf',
    short: 'Lesson Package',
    info: 'Beginners L1 / L2 / Intermediate · or moderate surf guiding for advanced surfers',
    includes: [
      '07 nights accommodation',
      '06 surf lessons or guiding sessions',
      'Surf Theory',
      'Everyday Breakfast',
      'Dinner - Everyday except Sunday',
      '02 complimentary yoga sessions',
      'Free transport to different surf spots',
      'Free use of surf boards during surf sessions',
      'Small group surf teaching (max 6 per group)',
      'Daily social fun activities',
    ],
    icon: Waves,
    highlight: { value: '06', label: 'Lessons' },
  },
  {
    id: '2',
    title: 'Full Surf',
    short: 'Lesson Package',
    info: 'Beginners L1 / L2 / Intermediate · or full surf guiding for advanced surfers',
    includes: [
      '07 nights accommodation',
      '11 surf lessons or guiding sessions',
      'Surf Theory',
      'Everyday Breakfast',
      'Dinner - Everyday except Sunday',
      '02 complimentary yoga sessions',
      'Free transport to different surf spots',
      'Free use of surf boards during surf sessions',
      'Small group surf teaching (max 6 per group)',
      'Daily social fun activities',
    ],
    icon: Activity,
    highlight: { value: '11', label: 'Lessons' },
  },
  {
    id: '3',
    title: 'Surf & Yoga',
    short: 'Package',
    info: 'Surf lessons or surf guiding paired with daily yoga sessions',
    includes: [
      '07 nights accommodation',
      'Morning or evening everyday yoga',
      '06 surf lessons or guiding sessions',
      'Surf Theory',
      'Everyday Breakfast',
      'Dinner - Everyday except Sunday',
      'Free transport to different surf spots',
      'Free use of surf boards during surf sessions',
      'Small group surf teaching (max 6 per group)',
      'Daily social fun activities',
    ],
    icon: Sparkles,
    highlight: { value: '7×', label: 'Yoga' },
  },
];

const PackagePage = () => {
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const [amounts, setAmounts] = useState<number[]>(new Array(PACKAGE_DATA.length).fill(0));
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    // Hydrate from localStorage on mount
    const rawDate = localStorage.getItem('dateRange');
    try {
      setDateRange(rawDate ? JSON.parse(rawDate) : '');
    } catch {
      setDateRange(rawDate || '');
    }

    const storedRooms = localStorage.getItem('selectedRooms');
    try {
      setSelectedRooms(storedRooms ? JSON.parse(storedRooms) : []);
    } catch {
      setSelectedRooms([]);
    }

    const storedCount = localStorage.getItem('peopleCount');
    setPeopleCount(storedCount ? parseInt(storedCount) : 0);

    const stored = localStorage.getItem('amounts');
    const init = stored ? JSON.parse(stored) : new Array(PACKAGE_DATA.length).fill(0);
    setAmounts(init);

    const derived = init
      .map((amt: number, i: number) =>
        amt > 0 ? `${amt} x ${PACKAGE_DATA[i].title} ${PACKAGE_DATA[i].short}` : null,
      )
      .filter(Boolean) as string[];
    setSelectedPackages(derived);

    localStorage.removeItem('travellerInfo');
    localStorage.removeItem('totalPrice');
  }, []);

  useEffect(() => {
    const derived = amounts
      .map((amt, i) =>
        amt > 0 ? `${amt} x ${PACKAGE_DATA[i].title} ${PACKAGE_DATA[i].short}` : null,
      )
      .filter(Boolean) as string[];
    setSelectedPackages(derived);
    localStorage.setItem('amounts', JSON.stringify(amounts));
    localStorage.setItem('selectedPackages', JSON.stringify(derived));
  }, [amounts]);

  const totalSelected = () => amounts.reduce((s, n) => s + n, 0);
  const canInc = () => totalSelected() < peopleCount;

  const updateAmount = (index: number, inc: boolean) => {
    setAmounts((prev) => {
      const next = [...prev];
      if (inc) {
        if (!canInc()) return prev;
        next[index] = (next[index] || 0) + 1;
      } else {
        if ((next[index] || 0) <= 0) return prev;
        next[index] = next[index] - 1;
      }
      return next;
    });
  };

  const toggleExpand = (index: number) =>
    setExpandedIdx((cur) => (cur === index ? null : index));

  const filledCount = totalSelected();
  const selectionValid = peopleCount > 0 && filledCount === peopleCount;
  const remaining = Math.max(0, peopleCount - filledCount);

  return (
    <>
      <BookingNavbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white pt-[110px] sm:pt-[120px] pb-[130px] sm:pb-[140px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-7 sm:mb-9 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-700">
              <span className="block w-5 h-px bg-cyan-500" />
              Booking · Step 5
              <span className="block w-5 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-1.5 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Choose Your Package
            </h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              className="mt-3 flex justify-center"
            >
              <span className="block h-[3px] w-12 sm:w-14 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
            </motion.div>
            <p className="mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              Choose one package per traveler. Each one will cover your entire night's stay.
            </p>
          </motion.div>

          {/* Two-column main */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* LEFT - Group size info + package cards */}
            <motion.div
              className="lg:col-span-8 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              {/* Group size strip */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
                    <Users className="w-4 h-4 text-white" strokeWidth={2.25} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Group size
                    </span>
                    <span className="block text-xs text-gray-500">
                      Pick a package for each traveller
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center min-w-[44px] h-9 px-3 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 text-sm font-bold tabular-nums">
                  {peopleCount} {peopleCount === 1 ? 'traveller' : 'travellers'}
                </span>
              </div>

              {/* Inline status line */}
              {peopleCount > 0 && (
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800">
                    Available Packages
                  </h2>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider ring-1 ${
                      selectionValid
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        : 'bg-amber-50 text-amber-700 ring-amber-200'
                    }`}
                  >
                    {selectionValid ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      <span className="block w-2 h-2 rounded-full bg-amber-500" />
                    )}
                    {filledCount} / {peopleCount} chosen
                  </span>
                </div>
              )}

              {/* Package cards - 3 in a row on desktop */}
              {peopleCount > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {PACKAGE_DATA.map((pkg, idx) => {
                    const count = amounts[idx] || 0;
                    const isSelected = count > 0;
                    const isExpanded = expandedIdx === idx;
                    const decDisabled = count <= 0;
                    const incDisabled = !canInc();
                    const Icon = pkg.icon;
                    const shouldGray = selectionValid && !isSelected;

                    return (
                      <motion.div
                        key={pkg.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
                        className={`group relative flex flex-col rounded-2xl bg-white shadow-md ring-1 transition-all duration-300 ${
                          isSelected
                            ? 'ring-2 ring-cyan-400 shadow-cyan-500/20'
                            : shouldGray
                            ? 'ring-gray-100 opacity-70'
                            : 'ring-gray-100 hover:shadow-xl hover:ring-cyan-200/60'
                        }`}
                      >
                        {/* Header */}
                        <div className="p-4 sm:p-5 pb-3">
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
                              <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                                Package {String(idx + 1).padStart(2, '0')}
                              </span>
                              <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800 leading-tight">
                                {pkg.title}
                              </h3>
                              <p className="text-[11px] text-gray-500 leading-tight">
                                {pkg.short}
                              </p>
                            </div>
                          </div>

                          {/* Headline stats - nights + lessons/yoga */}
                          <div className="mt-3 flex flex-wrap items-center gap-1.5">
                            <div className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-br from-cyan-50/60 via-white to-white ring-1 ring-cyan-100/70">
                              <span className="font-[montserrat] text-lg font-bold tabular-nums text-gray-800">
                                07
                              </span>
                              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-700">
                                Nights
                              </span>
                            </div>
                            <div className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-br from-cyan-50/60 via-white to-white ring-1 ring-cyan-100/70">
                              <span className="font-[montserrat] text-lg font-bold tabular-nums text-gray-800">
                                {pkg.highlight.value}
                              </span>
                              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-700">
                                {pkg.highlight.label}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2.5 text-xs text-gray-500 leading-relaxed">
                            {pkg.info}
                          </p>
                        </div>

                        {/* What's included - collapsible */}
                        <div className="px-4 sm:px-5 pb-2">
                          <button
                            type="button"
                            onClick={() => toggleExpand(idx)}
                            aria-expanded={isExpanded}
                            className={`w-full inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold ring-1 transition-all duration-200 ${
                              isExpanded
                                ? 'bg-cyan-50 text-cyan-700 ring-cyan-200'
                                : 'bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300'
                            }`}
                          >
                            <span>What's included</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : 'rotate-0'
                              }`}
                              strokeWidth={2.25}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                key="includes"
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-1.5 py-1">
                                  {pkg.includes.map((item, i) => (
                                    <li
                                      key={i}
                                      className="text-xs text-gray-600 flex items-start gap-2 leading-snug"
                                    >
                                      <Check
                                        className="w-3.5 h-3.5 mt-0.5 text-cyan-500 shrink-0"
                                        strokeWidth={2.5}
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Counter footer */}
                        <div className="mt-auto px-4 sm:px-5 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
                            Packages
                          </span>
                          <div className="inline-flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => updateAmount(idx, false)}
                              disabled={decDisabled}
                              aria-label={`Remove ${pkg.title}`}
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold transition-all duration-200 ${
                                decDisabled
                                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                  : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-cyan-300 hover:bg-cyan-50/40 hover:text-cyan-700 active:scale-95'
                              }`}
                            >
                              <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </button>
                            <span className="min-w-[1.25rem] text-center font-[montserrat] text-base font-bold tabular-nums text-gray-800">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateAmount(idx, true)}
                              disabled={incDisabled || shouldGray}
                              aria-label={`Add ${pkg.title}`}
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold transition-all duration-200 ${
                                incDisabled || shouldGray
                                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                  : 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-md shadow-cyan-500/30 hover:shadow-lg hover:scale-105 active:scale-95'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Selected check overlay */}
                        {isSelected && (
                          <span className="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/40 ring-2 ring-white">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 p-8 text-center">
                  <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-full bg-white ring-1 ring-cyan-200 shadow-sm mb-3">
                    <Waves className="w-5 h-5 text-cyan-600" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 tracking-tight mb-1">
                    No travellers yet
                  </p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Go back a step and set the number of travellers - packages will appear here once your group size is known.
                  </p>
                </div>
              )}
            </motion.div>

            {/* RIGHT - Sticky summary aside */}
            <motion.aside
              className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              {/* Progress card */}
              {peopleCount > 0 && (
                <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Selection
                    </span>
                    <span className="text-xs font-bold text-gray-800 tabular-nums">
                      {filledCount} / {peopleCount}
                    </span>
                  </div>
                  <div className="relative h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${(filledCount / peopleCount) * 100}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                  {!selectionValid && remaining > 0 && (
                    <p className="mt-2.5 text-[11px] text-amber-700 flex items-start gap-1.5">
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" strokeWidth={2.5} />
                      Pick {remaining} more package{remaining === 1 ? '' : 's'} to continue.
                    </p>
                  )}
                  {selectionValid && (
                    <p className="mt-2.5 text-[11px] text-emerald-700 flex items-center gap-1.5">
                      <Check className="w-3 h-3 shrink-0" strokeWidth={3} />
                      All travellers have a package!
                    </p>
                  )}
                </div>
              )}

              {/* Summary */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md overflow-hidden">
                <Summary
                  dateRange={dateRange}
                  selectedRooms={selectedRooms}
                  selectedPackages={selectedPackages}
                />
              </div>

              {/* CTA */}
              <Link
                href={selectionValid ? '/selection' : '#'}
                onClick={(e) => {
                  if (!selectionValid) e.preventDefault();
                }}
                className="block"
                aria-disabled={!selectionValid}
              >
                <div
                  className={`group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectionValid
                      ? 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-[1.02] active:scale-100'
                      : 'bg-gray-100 text-gray-400 ring-1 ring-gray-200 cursor-not-allowed'
                  }`}
                >
                  Continue to Selection
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      selectionValid ? 'group-hover:translate-x-1' : ''
                    }`}
                  />
                </div>
              </Link>
            </motion.aside>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

export default PackagePage;