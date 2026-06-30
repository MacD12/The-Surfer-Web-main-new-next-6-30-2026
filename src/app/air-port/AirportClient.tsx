'use client';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Check,
  Info,
  Hash,
  Calendar,
  Clock,
  Waves,
} from 'lucide-react';

import Summary from '@/components/booking_engine/Summary';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

type Addon = { title: string; amount: number; price: number };

const Addon = () => {
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [totalSelectedPackages, setTotalSelectedPackages] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [travellerInfo, setTravellerInfo] = useState<any[]>([{}]);

  // Hydrate
  useEffect(() => {
    const rawDate = localStorage.getItem('dateRange');
    try {
      setDateRange(rawDate ? JSON.parse(rawDate) : '');
    } catch {
      setDateRange(rawDate || '');
    }

    const rooms = localStorage.getItem('selectedRooms');
    if (rooms) {
      try {
        setSelectedRooms(JSON.parse(rooms));
      } catch {}
    }

    const pkgs = localStorage.getItem('selectedPackages');
    if (pkgs) {
      try {
        const parsed = JSON.parse(pkgs);
        setSelectedPackages(parsed);
        const total = parsed.reduce((sum: number, line: string) => {
          const count = parseInt(line.split(' x ')[0], 10) || 0;
          return sum + count;
        }, 0);
        setTotalSelectedPackages(total);
      } catch {}
    }

    const price = localStorage.getItem('totalPrice');
    try {
      setTotalPrice(price ? JSON.parse(price) : 0);
    } catch {}

    const addons = localStorage.getItem('addons');
    try {
      setSelectedAddons(addons ? JSON.parse(addons) : []);
    } catch {}

    const info = localStorage.getItem('travellerInfo');
    try {
      setTravellerInfo(info ? JSON.parse(info) : [{}]);
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem('addons', JSON.stringify(selectedAddons));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('travellerInfo', JSON.stringify(travellerInfo));
  }, [selectedAddons, totalPrice, travellerInfo]);

  const handleFlightInfoChange = (name: string, value: any) => {
    setTravellerInfo((prev) => {
      const next = Array.isArray(prev) ? [...prev] : [];
      if (next.length === 0) next.push({});
      next[0] = { ...next[0], [name]: value };
      return next;
    });
  };

  const isAddonActive = (title: string) =>
    selectedAddons.some((a) => a.title === title);

  const pickupPrice = totalSelectedPackages >= 4 ? 100 : 75;
  const dropPrice = totalSelectedPackages >= 4 ? 100 : 65;

  const handleArrivalFee = () => {
    const active = isAddonActive('Airport Pick-up');
    if (active) {
      setSelectedAddons((prev) => prev.filter((a) => a.title !== 'Airport Pick-up'));
      setTotalPrice((p) => p - pickupPrice);
    } else {
      setSelectedAddons((prev) => [
        ...prev,
        { title: 'Airport Pick-up', amount: 1, price: pickupPrice },
      ]);
      setTotalPrice((p) => p + pickupPrice);
    }
  };

  const handleDepartureFee = () => {
    const active = isAddonActive('Airport Drop');
    if (active) {
      setSelectedAddons((prev) => prev.filter((a) => a.title !== 'Airport Drop'));
      setTotalPrice((p) => p - dropPrice);
    } else {
      setSelectedAddons((prev) => [
        ...prev,
        { title: 'Airport Drop', amount: 1, price: dropPrice },
      ]);
      setTotalPrice((p) => p + dropPrice);
    }
  };

  const isArrivalInfoValid = () => {
    if (!isAddonActive('Airport Pick-up')) return true;
    const info = travellerInfo[0] || {};
    return Boolean(
      info.arrivalFlightNumber &&
        info.arrivalFlightDate &&
        info.arrivalFlightTime,
    );
  };
  const isDepartureInfoValid = () => {
    if (!isAddonActive('Airport Drop')) return true;
    const info = travellerInfo[0] || {};
    return Boolean(
      info.departureFlightNumber &&
        info.departureFlightDate &&
        info.departureFlightTime,
    );
  };
  const isFormValid = isArrivalInfoValid() && isDepartureInfoValid();

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
              Booking · Step 7
              <span className="block w-5 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-1.5 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Airport Transfers
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
              Optional. Add pick-up and drop-off transfers between Bandaranaike
              International Airport and the camp.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* LEFT - Addon cards */}
            <motion.div
              className="lg:col-span-8 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              {/* Optional notice */}
              <div className="flex items-start gap-3 rounded-2xl bg-cyan-50/50 ring-1 ring-cyan-100/70 px-4 py-3">
                <Info className="w-4 h-4 mt-0.5 text-cyan-700 shrink-0" strokeWidth={2.25} />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Both transfers are optional. Skip them if you've arranged your own way to camp.
                </p>
              </div>

              {/* PICK-UP CARD */}
              <AddonCard
                kind="arrival"
                isActive={isAddonActive('Airport Pick-up')}
                onToggle={handleArrivalFee}
                price={pickupPrice}
                totalPax={totalSelectedPackages}
                info={travellerInfo[0] || {}}
                onChange={handleFlightInfoChange}
                isValid={isArrivalInfoValid()}
              />

              {/* DROP CARD */}
              <AddonCard
                kind="departure"
                isActive={isAddonActive('Airport Drop')}
                onToggle={handleDepartureFee}
                price={dropPrice}
                totalPax={totalSelectedPackages}
                info={travellerInfo[0] || {}}
                onChange={handleFlightInfoChange}
                isValid={isDepartureInfoValid()}
              />
            </motion.div>

            {/* RIGHT - Sticky aside */}
            <motion.aside
              className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              {/* Transfers chosen status */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-4 sm:p-5">
                <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 mb-2">
                  Transfers
                </span>
                {selectedAddons.length === 0 ? (
                  <p className="text-xs text-gray-500 leading-relaxed">
                    No transfers selected - you can skip this step.
                  </p>
                ) : (
                  <ul className="space-y-1.5">
                    {selectedAddons.map((a) => (
                      <li
                        key={a.title}
                        className="flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className="flex items-center gap-2 text-gray-700">
                          <Check
                            className="w-3.5 h-3.5 text-cyan-500"
                            strokeWidth={2.5}
                          />
                          {a.title}
                        </span>
                        <span className="font-semibold tabular-nums text-gray-800">
                          €{a.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Summary */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md overflow-hidden">
                <Summary
                  dateRange={dateRange}
                  selectedPackages={selectedPackages}
                  selectedRooms={selectedRooms}
                  totalPrice={totalPrice}
                  addons={selectedAddons}
                />
              </div>

              {/* CTA */}
              <Link
                href={isFormValid ? '/information' : '#'}
                onClick={(e) => {
                  if (!isFormValid) {
                    e.preventDefault();
                    alert(
                      'Please fill in all required arrival and/or departure flight information.',
                    );
                  }
                }}
                className="block"
                aria-disabled={!isFormValid}
              >
                <div
                  className={`group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isFormValid
                      ? 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-[1.02] active:scale-100'
                      : 'bg-gray-100 text-gray-400 ring-1 ring-gray-200 cursor-not-allowed'
                  }`}
                >
                  Continue to Traveller Details
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isFormValid ? 'group-hover:translate-x-1' : ''
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

const InputField = ({
  icon: Icon,
  label,
  ...inputProps
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">
      {label}
    </label>
    <div className="relative">
      <Icon
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-500 pointer-events-none"
        strokeWidth={2.25}
      />
      <input
        {...inputProps}
        className="w-full rounded-xl bg-white pl-8 pr-3 py-2 text-xs sm:text-sm shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-200"
      />
    </div>
  </div>
);

const AddonCard = ({
  kind,
  isActive,
  onToggle,
  price,
  totalPax,
  info,
  onChange,
  isValid,
}: {
  kind: 'arrival' | 'departure';
  isActive: boolean;
  onToggle: () => void;
  price: number;
  totalPax: number;
  info: any;
  onChange: (name: string, value: any) => void;
  isValid: boolean;
}) => {
  const isArrival = kind === 'arrival';
  const title = isArrival ? 'Airport Pick-up' : 'Airport Drop';
  const Icon = isArrival ? PlaneLanding : PlaneTakeoff;
  const direction = isArrival
    ? 'From Bandaranaike International Airport to the Surf Camp.'
    : 'From the Surf Camp to Bandaranaike International Airport.';
  const fieldPrefix = isArrival ? 'arrival' : 'departure';
  const formTitle = isArrival ? 'Arrival Information' : 'Departure Information';
  const placeholder = isArrival ? 'e.g. QR 654' : 'e.g. QR 655';

  return (
    <motion.div
      layout
      className={`rounded-2xl bg-white shadow-md ring-1 overflow-hidden transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-cyan-400 shadow-cyan-500/15'
          : 'ring-gray-100 hover:shadow-lg hover:ring-cyan-200/60'
      }`}
    >
      {/* Header */}
      <div className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 shrink-0">
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
              {isArrival ? 'Arrival' : 'Departure'}
            </span>
            <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800 leading-tight">
              {title}
            </h3>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              {totalPax <= 3 ? 'Up to 3 passengers' : '4+ passengers'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-baseline gap-0.5 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 font-bold tabular-nums">
            <span className="text-[11px]">EUR</span>
            <span className="text-base">{price}</span>
          </span>

          <button
            type="button"
            onClick={onToggle}
            className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 hover:bg-emerald-600'
                : 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-md shadow-cyan-500/30 hover:shadow-lg hover:scale-105'
            }`}
          >
            {isActive ? (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                Added
              </>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 sm:px-5 pb-4">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {direction}{' '}
          <span className="text-gray-400">
            (€{totalPax >= 4 ? '100 for 4+ pax' : `${price} for up to 3 pax`})
          </span>
        </p>

        {/* Surfboard toggle - only on arrival */}
        {isArrival && (
          <label className="mt-3 inline-flex items-center gap-2.5 px-3 py-2 rounded-xl ring-1 ring-gray-200 cursor-pointer hover:ring-cyan-300 hover:bg-cyan-50/30 transition-all duration-200">
            <span className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={Boolean(info.hasSurfboard)}
                onChange={(e) => onChange('hasSurfboard', e.target.checked)}
                className="peer sr-only"
              />
              <span className="block w-4 h-4 rounded-md bg-white ring-1 ring-gray-300 peer-checked:bg-cyan-500 peer-checked:ring-cyan-500 transition-all duration-200" />
              <Check
                className="absolute left-0.5 top-0.5 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700">
              <Waves className="w-3.5 h-3.5 text-cyan-500" strokeWidth={2.25} />
              Bringing a surfboard?
            </span>
          </label>
        )}
      </div>

      {/* Form when active */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5">
              <div className="rounded-xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                    {formTitle}
                  </span>
                  {!isValid && (
                    <span className="text-[10px] font-bold text-amber-700">
                      Required
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <InputField
                    icon={Hash}
                    label="Flight Number"
                    type="text"
                    placeholder={placeholder}
                    value={info[`${fieldPrefix}FlightNumber`] || ''}
                    onChange={(e) =>
                      onChange(`${fieldPrefix}FlightNumber`, e.target.value)
                    }
                    required
                  />
                  <InputField
                    icon={Calendar}
                    label="Flight Date"
                    type="date"
                    value={info[`${fieldPrefix}FlightDate`] || ''}
                    onChange={(e) =>
                      onChange(`${fieldPrefix}FlightDate`, e.target.value)
                    }
                    min={
                      !isArrival
                        ? info.arrivalFlightDate || dayjs().format('YYYY-MM-DD')
                        : dayjs().format('YYYY-MM-DD')
                    }
                    required
                  />
                  <InputField
                    icon={Clock}
                    label="Flight Time"
                    type="time"
                    value={info[`${fieldPrefix}FlightTime`] || ''}
                    onChange={(e) =>
                      onChange(`${fieldPrefix}FlightTime`, e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Addon;
