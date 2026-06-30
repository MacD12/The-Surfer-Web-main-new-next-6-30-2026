'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Calendar,
  BedDouble,
  Package,
  ListChecks,
  Plane,
  User,
  Check,
} from 'lucide-react';
import { routing } from '@/i18n/routing';

type Step = {
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const STEPS: Step[] = [
  { title: 'Camp', icon: MapPin },
  { title: 'Date', icon: Calendar },
  { title: 'Room', icon: BedDouble },
  { title: 'Package', icon: Package },
  { title: 'Selection', icon: ListChecks },
  { title: 'Airport', icon: Plane },
  { title: 'Information', icon: User },
];

const StepCircle = ({
  step,
  index,
  state,
}: {
  step: Step;
  index: number;
  state: 'done' | 'active' | 'upcoming';
}) => {
  const Icon = step.icon;

  const circleBase =
    'relative w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300';

  const variants = {
    done: 'bg-gradient-to-br from-[#0a67b3] to-cyan-500 shadow-md shadow-cyan-500/30',
    active:
      'bg-gradient-to-br from-[#0a67b3] to-cyan-500 shadow-lg shadow-cyan-500/50 ring-4 ring-cyan-200',
    upcoming: 'bg-white border-2 border-gray-200',
  } as const;

  return (
    <div className="flex flex-col items-center flex-shrink-0 relative w-14 lg:w-16">
      <motion.div
        className={`${circleBase} ${variants[state]}`}
        animate={
          state === 'active'
            ? { scale: [1, 1.06, 1] }
            : { scale: 1 }
        }
        transition={
          state === 'active'
            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
      >
        {state === 'done' ? (
          <Check className="w-4 h-4 lg:w-5 lg:h-5 text-white" strokeWidth={3} />
        ) : (
          <Icon
            className={`w-4 h-4 lg:w-5 lg:h-5 ${
              state === 'active' ? 'text-white' : 'text-gray-400'
            }`}
            strokeWidth={2}
          />
        )}

        {/* Number badge on the corner */}
        <span
          className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-bold tabular-nums flex items-center justify-center ring-2 ring-white ${
            state === 'done' || state === 'active'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {index + 1}
        </span>
      </motion.div>

      {/* Label */}
      <span
        className={`mt-2 text-[10px] lg:text-xs font-semibold tracking-tight whitespace-nowrap transition-colors duration-300 ${
          state === 'active'
            ? 'text-[#0a67b3]'
            : state === 'done'
            ? 'text-gray-600'
            : 'text-gray-400'
        }`}
      >
        {step.title}
      </span>
    </div>
  );
};

const Connector = ({ filled }: { filled: 'full' | 'half' | 'none' }) => {
  const width = filled === 'full' ? '100%' : filled === 'half' ? '50%' : '0%';

  return (
    <div className="flex-1 relative h-0.5 mx-1 mt-5 lg:mt-[22px] rounded-full bg-gray-200 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a67b3] to-cyan-500"
        initial={{ width: 0 }}
        animate={{ width }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
};

const BookingFooter = () => {
  const rawPathname = usePathname() ?? '/';
  const localeRegex = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`);
  const pathname = rawPathname.replace(localeRegex, '') || '/';

  let activeStep: number;
  switch (pathname) {
    case '/':
    case '/camp':
    case '/camp/':
      activeStep = 0;
      break;
    case '/date':
    case '/date/':
      activeStep = 1;
      break;
    case '/room':
    case '/room/':
      activeStep = 2;
      break;
    case '/package':
    case '/package/':
      activeStep = 3;
      break;
    case '/selection':
    case '/selection/':
      activeStep = 4;
      break;
    case '/air-port':
    case '/air-port/':
      activeStep = 5;
      break;
    case '/information':
    case '/information/':
      activeStep = 6;
      break;
    default:
      activeStep = 0;
  }

  const progressPct =
    STEPS.length <= 1 ? 0 : (activeStep / (STEPS.length - 1)) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[11] bg-white rounded-t-3xl shadow-[0_-6px_30px_rgba(0,0,0,0.08)] border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile: progress bar + active step name */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-700">
              <span className="block w-4 h-px bg-cyan-500" />
              Step {activeStep + 1} / {STEPS.length}
            </span>
            <span className="text-[11px] font-bold tracking-tight text-gray-800">
              {STEPS[activeStep].title}
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden ring-1 ring-gray-200">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Desktop: full stepper */}
        <div className="hidden md:flex items-start justify-between">
          {STEPS.map((step, idx) => {
            const state: 'done' | 'active' | 'upcoming' =
              idx < activeStep
                ? 'done'
                : idx === activeStep
                ? 'active'
                : 'upcoming';

            const connectorFill: 'full' | 'half' | 'none' =
              idx < activeStep ? 'full' : idx === activeStep ? 'half' : 'none';

            return (
              <React.Fragment key={idx}>
                <StepCircle step={step} index={idx} state={state} />
                {idx < STEPS.length - 1 && (
                  <Connector filled={connectorFill} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingFooter;
