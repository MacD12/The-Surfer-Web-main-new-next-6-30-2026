'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  BedDouble,
  Package as PackageIcon,
  Plane,
  Receipt,
  ClipboardList,
} from 'lucide-react';

type Props = {
  dateRange?: string;
  selectedRooms?: string[];
  selectedPackages?: string[];
  addons?: Array<{ title: string; price?: number }>;
  totalPrice?: number;
};

const SectionHeader = ({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
      <Icon className="w-3 h-3" strokeWidth={2.25} />
    </span>
    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
      {label}
    </span>
  </div>
);

const Divider = () => (
  <div className="my-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
);

const Summary = ({
  dateRange,
  selectedRooms,
  selectedPackages,
  addons,
  totalPrice,
}: Props) => {
  const hasDates = Boolean(dateRange);
  const hasRooms = Boolean(selectedRooms && selectedRooms.length > 0);
  const hasPackages = Boolean(selectedPackages && selectedPackages.length > 0);
  const hasAddons = Boolean(addons && addons.length > 0);
  const hasTotal = Boolean(totalPrice && totalPrice > 0);

  const isEmpty = !hasDates && !hasRooms && !hasPackages && !hasAddons && !hasTotal;

  const [checkIn, checkOut] = (dateRange || '').split(' - ');

  return (
    <div className="p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/20">
            <ClipboardList className="w-4 h-4 text-white" strokeWidth={2.25} />
          </span>
          <div>
            <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800 leading-tight">
              Summary
            </h3>
            <p className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">
              Your booking so far
            </p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="mt-5 rounded-xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 px-4 py-5 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Pick your dates, room and package to see your booking summary here.
          </p>
        </div>
      )}

      {!isEmpty && (
        <div className="mt-4">
          {/* Dates */}
          <AnimatePresence initial={false}>
            {hasDates && (
              <motion.div
                key="dates"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <SectionHeader icon={Calendar} label="Dates" />
                <div className="grid grid-cols-2 gap-2 ml-8">
                  <div>
                    <span className="block text-[9px] font-bold tracking-[0.18em] uppercase text-gray-400">
                      Check-in
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-gray-800 tabular-nums">
                      {checkIn || '-'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold tracking-[0.18em] uppercase text-gray-400">
                      Check-out
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-gray-800 tabular-nums">
                      {checkOut || '-'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rooms */}
          <AnimatePresence initial={false}>
            {hasRooms && (
              <motion.div
                key="rooms"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                {hasDates && <Divider />}
                <SectionHeader icon={BedDouble} label="Rooms" />
                <ul className="space-y-1.5 ml-8">
                  {selectedRooms!.map((room, idx) => {
                    // "2 x Private Single Room" → split count + name
                    const match = room.match(/^(\d+)\s*x\s*(.+)$/);
                    const count = match ? match[1] : null;
                    const name = match ? match[2] : room;
                    return (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        {count && (
                          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-md bg-cyan-100 text-cyan-700 text-[10px] font-bold tabular-nums">
                            ×{count}
                          </span>
                        )}
                        <span className="text-gray-700 leading-snug">{name}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Packages */}
          <AnimatePresence initial={false}>
            {hasPackages && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                {(hasDates || hasRooms) && <Divider />}
                <SectionHeader icon={PackageIcon} label="Packages" />
                <ul className="space-y-1.5 ml-8">
                  {selectedPackages!.map((pkg, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <span className="shrink-0 mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span className="leading-snug">{pkg}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Airport / Addons */}
          <AnimatePresence initial={false}>
            {hasAddons && (
              <motion.div
                key="addons"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                {(hasDates || hasRooms || hasPackages) && <Divider />}
                <SectionHeader icon={Plane} label="Airport" />
                <ul className="space-y-1.5 ml-8">
                  {addons!.map((a) => (
                    <li
                      key={a.title}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                    >
                      <span className="shrink-0 mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span className="leading-snug">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Total */}
          <AnimatePresence initial={false}>
            {hasTotal && (
              <motion.div
                key="total"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="mt-4 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 px-5 sm:px-6 py-4 rounded-b-2xl bg-gradient-to-br from-cyan-50/70 via-white to-white border-t border-cyan-100/80"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-sm">
                      <Receipt className="w-3.5 h-3.5 text-white" strokeWidth={2.25} />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Total
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-[montserrat] text-xl sm:text-2xl font-bold tabular-nums text-gray-800 leading-none">
                      €{totalPrice}
                    </span>
                    <span className="block text-[10px] text-gray-500 mt-0.5">
                      All travellers · whole stay
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Summary;
