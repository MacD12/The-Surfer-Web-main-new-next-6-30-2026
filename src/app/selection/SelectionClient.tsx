'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  Users,
  User,
  Package as PackageIcon,
  Check,
  AlertTriangle,
} from 'lucide-react';

import Summary from '@/components/booking_engine/Summary';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

/* ---------- PRICING DATA (unchanged) ---------- */
const packagePrices: any = {
  'The Surfer Beach Camp': {
    'Full Surf Lesson Package': { 'Dorm Bed': 70.0, 'Private Single Room': 112.86, 'Private Double Room Per Person': 84.29, 'Private Triple Room Per Person': 78.57 },
    'Moderate Surf Lesson Package': { 'Dorm Bed': 55.71, 'Private Single Room': 98.57, 'Private Double Room Per Person': 70.0, 'Private Triple Room Per Person': 64.29 },
    'Surf & Yoga Package': { 'Dorm Bed': 64.29, 'Private Single Room': 107.14, 'Private Double Room Per Person': 78.57, 'Private Triple Room Per Person': 71.43 },
  },
  'TS2 Surf Camp': {
    'Full Surf Lesson Package': { 'Dorm Bed': 55.71, 'Private Single Room': 70.0, 'Private Double Room Per Person': 55.71, 'Private Triple Room Per Person': 55.71 },
    'Moderate Surf Lesson Package': { 'Dorm Bed': 41.43, 'Private Single Room': 55.71, 'Private Double Room Per Person': 41.43, 'Private Triple Room Per Person': 41.43 },
    'Surf & Yoga Package': { 'Dorm Bed': 50.0, 'Private Single Room': 64.29, 'Private Double Room Per Person': 50.0, 'Private Triple Room Per Person': 50.0 },
  },
  // Soul Surfer does NOT offer triple rooms - only dorm, single, double.
  'Soul Surfer Camp': {
    'Full Surf Lesson Package': { 'Dorm Bed': 70.0, 'Private Single Room': 112.86, 'Private Double Room Per Person': 84.29 },
    'Moderate Surf Lesson Package': { 'Dorm Bed': 55.71, 'Private Single Room': 98.57, 'Private Double Room Per Person': 70.0 },
    'Surf & Yoga Package': { 'Dorm Bed': 64.29, 'Private Single Room': 107.14, 'Private Double Room Per Person': 78.57 },
  },
  'The Surfer SurfStyle Surf Camp': {
    'Full Surf Lesson Package': { 'Shared Room': 83.0, 'Single Room': 108.0, 'Double Room': 85.0 },
    'Moderate Surf Lesson Package': { 'Shared Room': 80.0, 'Single Room': 100.0, 'Double Room': 83.0 },
    'Surf & Yoga Package': { 'Shared Room': 99.0, 'Single Room': 115.0, 'Double Room': 100.0 },
  },
};

const weeklyPrices: any = {
  'The Surfer Beach Camp': {
    'Full Surf Lesson Package': { 'Dorm Bed': 490, 'Private Single Room': 790, 'Private Double Room Per Person': 590, 'Private Triple Room Per Person': 550 },
    'Moderate Surf Lesson Package': { 'Dorm Bed': 390, 'Private Single Room': 690, 'Private Double Room Per Person': 490, 'Private Triple Room Per Person': 450 },
    'Surf & Yoga Package': { 'Dorm Bed': 450, 'Private Single Room': 750, 'Private Double Room Per Person': 550, 'Private Triple Room Per Person': 500 },
  },
  'TS2 Surf Camp': {
    'Full Surf Lesson Package': { 'Dorm Bed': 390, 'Private Single Room': 490, 'Private Double Room Per Person': 390, 'Private Triple Room Per Person': 390 },
    'Moderate Surf Lesson Package': { 'Dorm Bed': 290, 'Private Single Room': 390, 'Private Double Room Per Person': 290, 'Private Triple Room Per Person': 290 },
    'Surf & Yoga Package': { 'Dorm Bed': 350, 'Private Single Room': 450, 'Private Double Room Per Person': 350, 'Private Triple Room Per Person': 350 },
  },
  'Soul Surfer Camp': {
    'Full Surf Lesson Package': { 'Dorm Bed': 490, 'Private Single Room': 790, 'Private Double Room Per Person': 590 },
    'Moderate Surf Lesson Package': { 'Dorm Bed': 390, 'Private Single Room': 690, 'Private Double Room Per Person': 490 },
    'Surf & Yoga Package': { 'Dorm Bed': 450, 'Private Single Room': 750, 'Private Double Room Per Person': 550 },
  },
  'The Surfer SurfStyle Surf Camp': {
    'Full Surf Lesson Package': { 'Shared Room': 510.0, 'Single Room': 750.0, 'Double Room': 510.0 },
    'Moderate Surf Lesson Package': { 'Shared Room': 480.0, 'Single Room': 700.0, 'Double Room': 490.0 },
    'Surf & Yoga Package': { 'Shared Room': 598.0, 'Single Room': 800.0, 'Double Room': 600.0 },
  },
};

type Traveller = {
  room: string;
  package: string;
  firstName: string;
  lastName: string;
};

const Selection = () => {
  const [selectedCamp, setSelectedCamp] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [travellerInfo, setTravellerInfo] = useState<Traveller[]>([]);
  const [peakCharge, setPeakCharge] = useState(false);
  const [availablePackages, setAvailablePackages] = useState<string[]>([]);
  const [weeksSelected, setWeeksSelected] = useState<number | null>(null);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const storedCamp = localStorage.getItem('selectedCamp');
    if (storedCamp) setSelectedCamp(storedCamp);

    const rawDate = localStorage.getItem('dateRange');
    try {
      setDateRange(rawDate ? JSON.parse(rawDate) : '');
    } catch {
      setDateRange(rawDate || '');
    }

    const s = localStorage.getItem('selectedStartDate');
    const e = localStorage.getItem('selectedEndDate');
    if (s) setStartDate(s);
    if (e) setEndDate(e);

    const storedPackages = localStorage.getItem('selectedPackages');
    try {
      setSelectedPackages(storedPackages ? JSON.parse(storedPackages) : []);
    } catch {}

    const storedRooms = localStorage.getItem('selectedRooms');
    try {
      setSelectedRooms(storedRooms ? JSON.parse(storedRooms) : []);
    } catch {}

    const storedPrice = localStorage.getItem('totalPrice');
    try {
      setTotalPrice(storedPrice ? JSON.parse(storedPrice) : 0);
    } catch {}

    const storedInfo = localStorage.getItem('travellerInfo');
    try {
      setTravellerInfo(storedInfo ? JSON.parse(storedInfo) : []);
    } catch {}

    const storedPeak = localStorage.getItem('peakCharge');
    try {
      setPeakCharge(storedPeak ? JSON.parse(storedPeak) : false);
    } catch {}

    const rawWeeks = localStorage.getItem('selectedWeeks');
    const n = parseInt(rawWeeks || '', 10);
    setWeeksSelected(Number.isFinite(n) && n > 0 ? n : null);
  }, []);

  // Initialize traveller info from selections (or reuse valid saved data)
  useEffect(() => {
    localStorage.removeItem('addons');

    if (selectedPackages.length > 0 && selectedRooms.length > 0) {
      const storedInfo = localStorage.getItem('travellerInfo');
      if (storedInfo) {
        try {
          const parsed = JSON.parse(storedInfo);
          const valid =
            Array.isArray(parsed) &&
            parsed.every(
              (p: any) =>
                p &&
                typeof p === 'object' &&
                'room' in p &&
                'package' in p &&
                'firstName' in p &&
                'lastName' in p,
            );
          if (valid) {
            setTravellerInfo(parsed);
            setAvailablePackages(buildAvailablePackageArray(selectedPackages));
            return;
          }
        } catch {}
      }
      initializeTravellerInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackages, selectedRooms]);

  const buildAvailablePackageArray = (packagesList: string[]) => {
    const counts: Record<string, number> = {};
    packagesList.forEach((pkgStr) => {
      const [countStr, ...titleParts] = pkgStr.split(' x ');
      const title = titleParts.join(' x ');
      const count = parseInt(countStr, 10) || 0;
      counts[title] = (counts[title] || 0) + count;
    });
    return Object.entries(counts).flatMap(([pkg, count]) =>
      Array(count).fill(pkg),
    );
  };

  const initializeTravellerInfo = () => {
    const newAvailable = buildAvailablePackageArray(selectedPackages);
    setAvailablePackages(newAvailable);

    const newTravellerInfo: Traveller[] = selectedRooms.flatMap((roomStr) => {
      const [roomCountStr, ...roomParts] = roomStr.split(' x ');
      const roomType = roomParts.join(' x ');
      const capacity = getRoomCapacity(roomType);
      const roomCount = parseInt(roomCountStr, 10) || 0;

      return Array(roomCount)
        .fill(null)
        .flatMap(() =>
          Array(capacity)
            .fill(null)
            .map(() => ({
              room: roomType,
              package: '',
              firstName: '',
              lastName: '',
            })),
        );
    });

    setTravellerInfo(newTravellerInfo);
  };

  const getRoomCapacity = (roomType: string | undefined | null) => {
    if (!roomType) return 1;
    if (roomType.includes('Triple')) return 3;
    if (roomType.includes('Double')) return 2;
    return 1;
  };

  const handleNameChange = (
    index: number,
    field: 'firstName' | 'lastName',
    value: string,
  ) => {
    setTravellerInfo((prev) => {
      const next = [...prev];
      next[index][field] = value;
      return next;
    });
  };

  const getNightsAndWeeksFromDates = (start: string, end: string) => {
    if (!start || !end) return { nights: null, weeksFromDates: null };
    const a = new Date(start);
    const b = new Date(end);
    a.setHours(12, 0, 0, 0);
    b.setHours(12, 0, 0, 0);
    const MS = 1000 * 60 * 60 * 24;
    const nights = Math.max(1, Math.round((b.getTime() - a.getTime()) / MS));
    const weeksFromDates = nights % 7 === 0 ? nights / 7 : null;
    return { nights, weeksFromDates };
  };

  // Price calculation
  useEffect(() => {
    if (!selectedCamp || travellerInfo.length === 0) return;

    let basePerDayTotal = 0;
    let basePerWeekTotal = 0;
    let peakPerDayTotal = 0;

    travellerInfo.forEach((person) => {
      if (!person.package) return;
      const dayBase =
        packagePrices[selectedCamp]?.[person.package]?.[person.room] || 0;
      const weekBase =
        weeklyPrices[selectedCamp]?.[person.package]?.[person.room] ??
        dayBase * 7;
      const peakFeePerDay = peakCharge
        ? person.room?.includes('Dorm')
          ? 100
          : 150
        : 0;
      basePerDayTotal += dayBase;
      basePerWeekTotal += weekBase;
      peakPerDayTotal += peakFeePerDay;
    });

    const { nights, weeksFromDates } = getNightsAndWeeksFromDates(
      startDate,
      endDate,
    );
    const effectiveWeeks = weeksSelected ?? weeksFromDates;

    let total = 0;
    if (effectiveWeeks) {
      const nightsInWeeks = effectiveWeeks * 7;
      total =
        basePerWeekTotal * effectiveWeeks + peakPerDayTotal * nightsInWeeks;
    } else {
      if (!nights) return;
      total = (basePerDayTotal + peakPerDayTotal) * nights;
      total = Math.ceil(total);
    }

    setTotalPrice(total);
    localStorage.setItem('totalPrice', JSON.stringify(total));
  }, [
    selectedCamp,
    travellerInfo,
    peakCharge,
    startDate,
    endDate,
    weeksSelected,
  ]);

  // Persist traveller info
  useEffect(() => {
    if (travellerInfo.length > 0) {
      localStorage.setItem('travellerInfo', JSON.stringify(travellerInfo));
    }
  }, [travellerInfo]);

  const handlePackageChange = (index: number, pkg: string) => {
    setTravellerInfo((prev) => {
      const next = [...prev];
      const previousPkg = next[index].package;
      next[index].package = pkg;

      setAvailablePackages((availPrev) => {
        const availNext = [...availPrev];
        if (previousPkg) availNext.push(previousPkg);
        const i = availNext.indexOf(pkg);
        if (i !== -1) availNext.splice(i, 1);
        return availNext;
      });

      return next;
    });
  };

  const getAvailablePackageOptions = (current: string) => {
    const counts: Record<string, number> = {};
    availablePackages.forEach((p) => (counts[p] = (counts[p] || 0) + 1));
    if (current) counts[current] = (counts[current] || 0) + 1;

    return Object.entries(counts).map(([pkg, count]) => ({
      pkg,
      count,
      disabled: count <= 0 && pkg !== current,
    }));
  };

  const isPersonComplete = (p: Traveller) =>
    Boolean(p.package && p.firstName?.trim() && p.lastName?.trim());

  const completedCount = travellerInfo.filter(isPersonComplete).length;
  const totalCount = travellerInfo.length;
  const allFieldsFilled = totalCount > 0 && completedCount === totalCount;
  const remaining = totalCount - completedCount;

  // Group travellers by room
  const groupedTravellers = travellerInfo.reduce<Traveller[][]>(
    (acc, person) => {
      const last = acc[acc.length - 1];
      if (
        last &&
        last[0].room === person.room &&
        last.length < getRoomCapacity(last[0].room)
      ) {
        last.push(person);
      } else {
        acc.push([person]);
      }
      return acc;
    },
    [],
  );

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
              Booking · Step 6
              <span className="block w-5 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-1.5 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Match Travellers
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
              Assign a package and add the name of each person in every room.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* LEFT - Room groups with traveller forms */}
            <motion.div
              className="lg:col-span-8 space-y-5 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              {/* Inline status header */}
              {totalCount > 0 && (
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800">
                    Your Rooms
                  </h2>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider ring-1 ${
                      allFieldsFilled
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        : 'bg-amber-50 text-amber-700 ring-amber-200'
                    }`}
                  >
                    {allFieldsFilled ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      <span className="block w-2 h-2 rounded-full bg-amber-500" />
                    )}
                    {completedCount} / {totalCount} complete
                  </span>
                </div>
              )}

              {/* Room cards */}
              {groupedTravellers.length === 0 ? (
                <div className="rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 p-8 text-center">
                  <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-full bg-white ring-1 ring-cyan-200 shadow-sm mb-3">
                    <BedDouble className="w-5 h-5 text-cyan-600" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 tracking-tight mb-1">
                    No rooms selected
                  </p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Go back to the room and package steps to set up your booking - travellers will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {groupedTravellers.map((roomGroup, groupIndex) => {
                    const rawRoom = roomGroup[0]?.room || '';
                    const roomName = rawRoom.replace(' Per Person', '') || 'Room';
                    const capacity = getRoomCapacity(rawRoom);
                    const roomCompleted = roomGroup.filter(isPersonComplete).length;
                    const roomFullyDone = roomCompleted === roomGroup.length;

                    return (
                      <motion.div
                        key={groupIndex}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: groupIndex * 0.06, ease: 'easeOut' }}
                        className={`overflow-hidden rounded-2xl bg-white shadow-md ring-1 transition-all duration-300 ${
                          roomFullyDone
                            ? 'ring-emerald-200 shadow-emerald-500/10'
                            : 'ring-gray-100'
                        }`}
                      >
                        {/* Room header */}
                        <div className="px-4 sm:px-5 py-4 bg-gradient-to-br from-cyan-50/40 via-white to-white border-b border-gray-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
                              <BedDouble className="w-4 h-4 text-white" strokeWidth={2.25} />
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                                Room {String(groupIndex + 1).padStart(2, '0')}
                              </span>
                              <h3 className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-tight">
                                {roomName}
                              </h3>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
                              <Users className="w-3 h-3" strokeWidth={2.5} />
                              {capacity} {capacity === 1 ? 'person' : 'people'}
                            </span>
                          </div>
                        </div>

                        {/* Person rows */}
                        <div className="divide-y divide-gray-100">
                          {roomGroup.map((person, personIndex) => {
                            const globalIndex = travellerInfo.indexOf(person);
                            const pkgOptions = getAvailablePackageOptions(person.package);
                            const personDone = isPersonComplete(person);

                            return (
                              <div
                                key={personIndex}
                                className={`p-4 sm:p-5 transition-colors duration-300 ${
                                  personDone ? 'bg-emerald-50/20' : 'bg-white'
                                }`}
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                                  {/* Person badge */}
                                  <div className="sm:col-span-3 flex items-center gap-2.5">
                                    <span
                                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold tabular-nums ring-1 transition-all duration-300 ${
                                        personDone
                                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-emerald-300'
                                          : 'bg-cyan-50 text-cyan-700 ring-cyan-200'
                                      }`}
                                    >
                                      {personDone ? (
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                      ) : (
                                        personIndex + 1
                                      )}
                                    </span>
                                    <div className="min-w-0">
                                      <span className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
                                        Traveller
                                      </span>
                                      <span className="block text-xs font-semibold text-gray-800">
                                        Person {personIndex + 1}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Package */}
                                  <div className="sm:col-span-4">
                                    <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">
                                      Package
                                    </label>
                                    <div className="relative">
                                      <PackageIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-500 pointer-events-none" strokeWidth={2.25} />
                                      <select
                                        value={person.package || ''}
                                        onChange={(e) =>
                                          handlePackageChange(globalIndex, e.target.value)
                                        }
                                        className={`block w-full appearance-none rounded-xl bg-white pl-8 pr-8 py-2 text-xs sm:text-sm font-medium shadow-sm ring-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                                          person.package
                                            ? 'text-gray-800 ring-cyan-200'
                                            : 'text-gray-500 ring-gray-200 hover:ring-gray-300'
                                        }`}
                                      >
                                        <option value="">Select Package</option>
                                        {pkgOptions.map((opt, i) => (
                                          <option
                                            key={i}
                                            value={opt.pkg}
                                            disabled={opt.disabled}
                                          >
                                            {opt.pkg}
                                            {opt.count > 0 ? ` (${opt.count} available)` : ''}
                                          </option>
                                        ))}
                                      </select>
                                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
                                    </div>
                                  </div>

                                  {/* Names */}
                                  <div className="sm:col-span-5">
                                    <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">
                                      Full name
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="relative">
                                        <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" strokeWidth={2.25} />
                                        <input
                                          type="text"
                                          value={person.firstName || ''}
                                          onChange={(e) =>
                                            handleNameChange(globalIndex, 'firstName', e.target.value)
                                          }
                                          placeholder="First Name"
                                          className={`w-full rounded-xl bg-white pl-8 pr-3 py-2 text-xs sm:text-sm shadow-sm ring-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                                            person.firstName?.trim()
                                              ? 'text-gray-800 ring-cyan-200'
                                              : 'text-gray-700 ring-gray-200 hover:ring-gray-300'
                                          }`}
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        value={person.lastName || ''}
                                        onChange={(e) =>
                                          handleNameChange(globalIndex, 'lastName', e.target.value)
                                        }
                                        placeholder="Last Name"
                                        className={`w-full rounded-xl bg-white px-3 py-2 text-xs sm:text-sm shadow-sm ring-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                                          person.lastName?.trim()
                                            ? 'text-gray-800 ring-cyan-200'
                                            : 'text-gray-700 ring-gray-200 hover:ring-gray-300'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* RIGHT - Sticky aside */}
            <motion.aside
              className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              {/* Progress card */}
              {totalCount > 0 && (
                <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Travellers
                    </span>
                    <span className="text-xs font-bold text-gray-800 tabular-nums">
                      {completedCount} / {totalCount}
                    </span>
                  </div>
                  <div className="relative h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(completedCount / totalCount) * 100}%`,
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                  {!allFieldsFilled && remaining > 0 && (
                    <p className="mt-2.5 text-[11px] text-amber-700 flex items-start gap-1.5">
                      <AlertTriangle
                        className="w-3 h-3 mt-0.5 shrink-0"
                        strokeWidth={2.5}
                      />
                      Finish {remaining} more{' '}
                      {remaining === 1 ? 'traveller' : 'travellers'} to continue.
                    </p>
                  )}
                  {allFieldsFilled && (
                    <p className="mt-2.5 text-[11px] text-emerald-700 flex items-center gap-1.5">
                      <Check className="w-3 h-3 shrink-0" strokeWidth={3} />
                      All travellers complete!
                    </p>
                  )}
                </div>
              )}

              {/* Summary */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md overflow-hidden">
                <Summary
                  dateRange={dateRange}
                  selectedPackages={selectedPackages}
                  selectedRooms={selectedRooms}
                  totalPrice={totalPrice}
                />
              </div>

              {/* CTA */}
              <Link
                href={allFieldsFilled ? '/air-port' : '#'}
                onClick={(e) => {
                  if (!allFieldsFilled) e.preventDefault();
                }}
                className="block"
                aria-disabled={!allFieldsFilled}
              >
                <div
                  className={`group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    allFieldsFilled
                      ? 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-[1.02] active:scale-100'
                      : 'bg-gray-100 text-gray-400 ring-1 ring-gray-200 cursor-not-allowed'
                  }`}
                >
                  Continue to Airport
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      allFieldsFilled ? 'group-hover:translate-x-1' : ''
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

export default Selection;
