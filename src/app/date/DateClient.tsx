'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Moon, AlertTriangle, Info, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatShort = (d: Date | null) =>
  d
    ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

const formatDayName = (d: Date | null) => (d ? DAY_LABELS[d.getDay()] : '');

const DatePage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('dateRange');
      return stored ? JSON.parse(stored) : '';
    } catch {
      return '';
    }
  });
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [peakCharge, setPeakCharge] = useState<boolean>(false);

  // Single-month layout - prevents 2-month side-by-side overflow into the right column.
  // Users navigate to the next month with the arrow in the header.
  const monthsShown = 1;

  useEffect(() => {
    [
      'peopleCount',
      'selectedRooms',
      'amounts',
      'selectedPackages',
      'totalPrice',
      'travellerInfo',
    ].forEach((k) => localStorage.removeItem(k));

    const s = localStorage.getItem('selectedStartDate');
    const e = localStorage.getItem('selectedEndDate');
    if (s && e) {
      const start = new Date(s);
      const end = new Date(e);
      setStartDate(start);
      setEndDate(end);
      setHighlightedDates(buildDateArray(start, end));
      setPeakCharge(crossesPeakRange(start, end));
    }
  }, []);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || null);
    setEndDate(end || null);

    if (start && end) {
      const isPeak = crossesPeakRange(start, end);
      setPeakCharge(isPeak);
      if (isPeak) localStorage.setItem('peakCharge', 'false');
      else localStorage.removeItem('peakCharge');

      const formatted = formatRange(start, end);
      setDateRange(formatted);
      localStorage.setItem('dateRange', JSON.stringify(formatted));
      localStorage.setItem('selectedStartDate', start.toLocaleDateString('en-US'));
      localStorage.setItem('selectedEndDate', end.toLocaleDateString('en-US'));

      setHighlightedDates(buildDateArray(start, end));
    }
  };

  const crossesPeakRange = (start: Date, end: Date) => {
    const year = start.getFullYear();
    const peakStart = new Date(year, 11, 23);
    const peakEnd = new Date(year + 1, 0, 5);
    return start <= peakEnd && end >= peakStart;
  };

  const formatRange = (s: Date, e: Date) => {
    const opt: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return `${s.toLocaleDateString('en-US', opt)} - ${e.toLocaleDateString('en-US', opt)}`;
  };

  const buildDateArray = (s: Date, e: Date) => {
    const days: Date[] = [];
    const d = new Date(s);
    while (d <= e) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  };

  const canProceed = Boolean(startDate && endDate);
  const nightCount =
    startDate && endDate
      ? Math.max(
          0,
          Math.round(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  /** Auto-pick a common stay length. Starts from current selection or 1 week from today. */
  const setQuickStay = (nights: number) => {
    const start = startDate ? new Date(startDate) : (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      d.setHours(0, 0, 0, 0);
      return d;
    })();
    const end = new Date(start);
    end.setDate(end.getDate() + nights);
    handleDateChange([start, end]);
  };

  return (
    <>
      <BookingNavbar />

      {/* Scoped, brand-aligned react-datepicker theme.
          High specificity + !important so the package's own CSS doesn't bleed through. */}
      <style>{`
        /* Force the calendar to behave as a normal block fit to its parent - no inline-block / float defaults */
        .calendar-shell .react-datepicker {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          border: none !important;
          background: transparent !important;
          font-family: inherit !important;
          color: #1f2937 !important;
        }
        .calendar-shell .react-datepicker__month-container {
          display: block !important;
          float: none !important;
          width: 100% !important;
          max-width: 100% !important;
          border: none !important;
          background: transparent !important;
        }
        .calendar-shell .react-datepicker__header,
        .calendar-shell .react-datepicker__header--custom {
          background: transparent !important;
          border-bottom: 1px solid #e5e7eb !important;
          padding: 8px 0 6px !important;
          position: relative;
        }
        .calendar-shell .react-datepicker__current-month {
          background: transparent !important;
          color: #1f2937 !important;
          font-weight: 700 !important;
          font-size: 0.9rem !important;
          padding: 0 28px !important;
          letter-spacing: -0.01em;
          font-family: var(--font-montserrat), inherit;
        }
        .calendar-shell .react-datepicker__day-names {
          display: flex !important;
          justify-content: space-around;
          margin-top: 6px;
          margin-bottom: 2px;
        }
        .calendar-shell .react-datepicker__day-name {
          background: transparent !important;
          color: #9ca3af !important;
          font-weight: 700 !important;
          font-size: 0.65rem !important;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex: 1 1 0;
          line-height: 1.5rem;
        }
        .calendar-shell .react-datepicker__month { margin: 4px 0 0 !important; padding: 0; }
        .calendar-shell .react-datepicker__week { display: flex !important; }
        .calendar-shell .react-datepicker__day {
          flex: 1 1 0 !important;
          margin: 2px !important;
          height: 2rem !important;
          line-height: 2rem !important;
          border-radius: 9999px !important;
          font-size: 0.8rem !important;
          color: #374151 !important;
          background: transparent !important;
          transition: all 0.15s ease;
        }
        @media (min-width: 640px) {
          .calendar-shell .react-datepicker__day {
            height: 2.25rem !important;
            line-height: 2.25rem !important;
            font-size: 0.85rem !important;
          }
        }
        .calendar-shell .react-datepicker__day:hover {
          background: #ecfeff !important;
          color: #0e7490 !important;
        }
        .calendar-shell .react-datepicker__day--keyboard-selected {
          background: transparent !important;
          color: inherit !important;
        }
        .calendar-shell .react-datepicker__day--today {
          font-weight: 700 !important;
          color: #0a67b3 !important;
          background: #f0f9ff !important;
        }
        .calendar-shell .react-datepicker__day--in-range,
        .calendar-shell .react-datepicker__day--in-selecting-range {
          background: #cffafe !important;
          color: #0e7490 !important;
        }
        .calendar-shell .react-datepicker__day--selected,
        .calendar-shell .react-datepicker__day--range-start,
        .calendar-shell .react-datepicker__day--range-end,
        .calendar-shell .react-datepicker__day--selecting-range-start,
        .calendar-shell .react-datepicker__day--selecting-range-end {
          background: linear-gradient(135deg, #0a67b3, #0891b2) !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 10px rgba(10, 103, 179, 0.35);
        }
        .calendar-shell .react-datepicker__day--disabled,
        .calendar-shell .react-datepicker__day--outside-month {
          color: #d1d5db !important;
          background: transparent !important;
        }
        .calendar-shell .react-datepicker__day--disabled:hover,
        .calendar-shell .react-datepicker__day--outside-month:hover {
          background: transparent !important;
        }
        .calendar-shell .react-datepicker__navigation {
          top: 6px !important;
          width: 24px !important;
          height: 24px !important;
        }
        .calendar-shell .react-datepicker__navigation--previous { left: 4px !important; }
        .calendar-shell .react-datepicker__navigation--next { right: 4px !important; }
        .calendar-shell .react-datepicker__navigation-icon { top: 2px; }
        .calendar-shell .react-datepicker__navigation-icon::before {
          border-color: #6b7280 !important;
          border-width: 2px 2px 0 0 !important;
          height: 7px !important;
          width: 7px !important;
        }
        .calendar-shell .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
          border-color: #0a67b3 !important;
        }
        .calendar-shell .react-datepicker__highlighted-1,
        .calendar-shell .react-datepicker__day--highlighted {
          background: #cffafe !important;
          color: #0e7490 !important;
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white flex flex-col pt-[96px] sm:pt-[104px] pb-[110px] sm:pb-[120px]">
        <div className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 flex flex-col">
          {/* Compact header */}
          <motion.div
            className="flex-shrink-0 text-center mb-4 sm:mb-5 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-700">
              <span className="block w-5 h-px bg-cyan-500" />
              Booking · Step 3
              <span className="block w-5 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-1.5 font-[montserrat] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
              Select Your Dates
            </h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
              className="mt-2 flex justify-center"
            >
              <span className="block h-[3px] w-10 sm:w-12 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
            </motion.div>
          </motion.div>

          {/* Main two-column area - fills remaining vertical space on desktop, stacks on mobile */}
          <div className="lg:flex-1 lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* LEFT - Calendar */}
            <motion.div
              className="lg:col-span-7 lg:min-h-0 flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="calendar-shell flex-1 lg:min-h-0 flex flex-col lg:overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-lg p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3 shrink-0">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/20">
                    <Calendar className="w-4 h-4 text-white" strokeWidth={2.25} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-tight">
                      Choose your stay
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Tap a start date, then an end date.
                    </p>
                  </div>
                </div>

                {/* Calendar - flex-1 to fill */}
                <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate as any}
                    endDate={endDate as any}
                    selectsRange
                    inline
                    monthsShown={monthsShown}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    calendarStartDay={1}
                    renderCustomHeader={({
                      monthDate,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div className="flex items-center justify-between px-1 py-1.5">
                        <button
                          type="button"
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          aria-label="Previous month"
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                            prevMonthButtonDisabled
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-600 hover:bg-cyan-50 hover:text-cyan-700 active:scale-95'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <h3 className="font-[montserrat] text-sm font-bold tracking-tight text-gray-800 tabular-nums">
                          {monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button
                          type="button"
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          aria-label="Next month"
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                            nextMonthButtonDisabled
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-600 hover:bg-cyan-50 hover:text-cyan-700 active:scale-95'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    )}
                  />
                </div>

                {/* Quick-pick chips + legend (footer) */}
                <div className="mt-3 shrink-0 space-y-2.5">
                  {/* Quick stay chips */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
                      <Sparkles className="w-3 h-3 text-cyan-500" strokeWidth={2.5} />
                      Quick pick
                    </span>
                    {[
                      { label: '1 Week', nights: 7 },
                      { label: '2 Weeks', nights: 14 },
                      { label: '3 Weeks', nights: 21 },
                    ].map((q) => (
                      <button
                        key={q.nights}
                        type="button"
                        onClick={() => setQuickStay(q.nights)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white ring-1 ring-gray-200 text-[11px] font-semibold text-gray-700 hover:ring-cyan-300 hover:bg-cyan-50/40 hover:text-cyan-700 active:scale-95 transition-all duration-200"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <span className="block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2]" />
                      Selected
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="block w-2.5 h-2.5 rounded-full bg-cyan-100" />
                      In range
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="block w-2.5 h-2.5 rounded-full bg-sky-50 ring-1 ring-sky-200" />
                      Today
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Selection summary + CTA */}
            <motion.div
              className="lg:col-span-5 lg:min-h-0 flex flex-col gap-3 sm:gap-3.5 lg:overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              {/* Check-in / out tiles */}
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                <DateTile label="Check-in" date={startDate} active={Boolean(startDate)} />
                <DateTile label="Check-out" date={endDate} active={Boolean(endDate)} />
              </div>

              {/* Nights badge */}
              <AnimatePresence>
                {nightCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-cyan-50/60 via-white to-white ring-1 ring-cyan-100/70 shadow-sm px-4 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white ring-1 ring-cyan-200 shadow-sm">
                        <Moon className="w-3.5 h-3.5 text-cyan-600" strokeWidth={2.25} />
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                        Length of stay
                      </span>
                    </div>
                    <div className="font-[montserrat] text-base sm:text-lg font-bold tabular-nums text-gray-800">
                      {nightCount}{' '}
                      <span className="text-xs font-semibold text-gray-500">
                        {nightCount === 1 ? 'night' : 'nights'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Peak warning */}
              <AnimatePresence>
                {peakCharge && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 flex items-start gap-2.5 rounded-2xl bg-amber-50/80 ring-1 ring-amber-200/70 px-3.5 py-2.5"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 ring-1 ring-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" strokeWidth={2.25} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-amber-800">
                        Peak Season
                      </p>
                      <p className="text-[11px] text-amber-900/80 leading-snug">
                        Dec 23 – Jan 5. A peak charge may apply.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Body area - context-aware content (no duplication of dates) */}
              {canProceed ? (
                <div className="lg:flex-1 lg:min-h-0 flex flex-col gap-3 sm:gap-3.5">
                  {/* Trip timeline - visual only, no duplicate text */}
                  <div className="shrink-0 rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-4 sm:p-5">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 mb-3">
                      Trip Timeline
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-[9px] font-bold shadow-md shadow-cyan-500/30">
                          IN
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-gray-500">
                          {formatDayName(startDate)}
                        </span>
                      </div>
                      <div className="flex-1 relative h-1.5 rounded-full bg-gradient-to-r from-[#0a67b3] to-[#0891b2]">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-700 whitespace-nowrap bg-white px-2">
                          {nightCount} {nightCount === 1 ? 'night' : 'nights'}
                        </span>
                      </div>
                      <div className="shrink-0 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 text-white text-[9px] font-bold shadow-md shadow-cyan-500/30">
                          OUT
                        </div>
                        <span className="mt-1 text-[10px] font-semibold text-gray-500">
                          {formatDayName(endDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What's next info */}
                  <div className="lg:flex-1 lg:min-h-0 flex flex-col justify-center rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 p-4 sm:p-5">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 mb-2">
                      What's Next
                    </span>
                    <p className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-tight mb-1">
                      Pick your room & package
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      You're all set on dates. Continue to choose your accommodation
                      and surf package for this stay.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="lg:flex-1 lg:min-h-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 p-6">
                  <div className="text-center max-w-[18rem]">
                    <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-full bg-white ring-1 ring-cyan-200 shadow-sm mb-3">
                      <Calendar className="w-5 h-5 text-cyan-600" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-bold text-gray-800 tracking-tight mb-1">
                      Pick your stay
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Click a date in the calendar to start, then another for check-out - or use a quick-pick chip below the calendar.
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href={canProceed ? '/room' : '#'}
                onClick={(e) => {
                  if (!canProceed) e.preventDefault();
                }}
                className="block shrink-0"
                aria-disabled={!canProceed}
              >
                <div
                  className={`group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    canProceed
                      ? 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-[1.02] active:scale-100'
                      : 'bg-gray-100 text-gray-400 ring-1 ring-gray-200 cursor-not-allowed'
                  }`}
                >
                  Continue to Room Selection
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      canProceed ? 'group-hover:translate-x-1' : ''
                    }`}
                  />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

const DateTile = ({
  label,
  date,
  active,
}: {
  label: string;
  date: Date | null;
  active: boolean;
}) => (
  <div
    className={`rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-300 ${
      active
        ? 'bg-white ring-1 ring-cyan-200 shadow-sm shadow-cyan-500/10'
        : 'bg-gray-50 ring-1 ring-dashed ring-gray-200'
    }`}
  >
    <p
      className={`text-[9px] font-bold tracking-[0.18em] uppercase ${
        active ? 'text-cyan-700' : 'text-gray-400'
      }`}
    >
      {label}
    </p>
    {active && date ? (
      <>
        <p className="mt-0.5 font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 tabular-nums leading-tight">
          {formatShort(date)}
        </p>
        <p className="text-[10px] text-gray-500 leading-tight">{formatDayName(date)}</p>
      </>
    ) : (
      <p className="mt-0.5 text-xs text-gray-400 italic">Pick a date</p>
    )}
  </div>
);

export default DatePage;
