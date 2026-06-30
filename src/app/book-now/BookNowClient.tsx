'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

type Destination = {
  id: string;
  title: string;
  image: string;
  flag: string;
  location: string;
  tagline: string;
  camps: string;
};

const DESTINATIONS: Destination[] = [
  {
    id: '1',
    title: 'Sri Lanka',
    image: '/image.png',
    flag: '🇱🇰',
    location: 'Weligama · South Coast',
    tagline: 'Warm Indian Ocean waves & laid-back island life.',
    camps: '3 Camps',
  },
  {
    id: '2',
    title: 'Morocco',
    image: '/morocco.jpg',
    flag: '🇲🇦',
    location: 'Tamraght · Atlantic Coast',
    tagline: 'Atlantic point breaks & rich cultural immersion.',
    camps: 'Partnered Camp',
  },
];

const DestinationCard = ({
  destination,
  isSelected,
  onSelect,
  index,
}: {
  destination: Destination;
  isSelected: boolean;
  onSelect: (title: string) => void;
  index: number;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(destination.title);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Select ${destination.title}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(destination.title)}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`group relative w-full max-w-[420px] mx-auto aspect-[3/4] max-h-[min(540px,calc(100vh-320px))] cursor-pointer overflow-hidden rounded-3xl bg-gray-200 shadow-xl ring-1 transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 ${
        isSelected
          ? 'ring-2 ring-cyan-400 shadow-cyan-500/30'
          : 'ring-black/5 hover:shadow-2xl hover:ring-cyan-300/60'
      }`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${destination.image})` }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/80 transition-colors duration-500"
      />

      {/* Camps count badge (top-left) */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center justify-center min-w-[44px] h-8 sm:h-9 px-3 rounded-full bg-white/95 backdrop-blur-md text-gray-800 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase shadow-lg ring-1 ring-black/5">
          {destination.camps}
        </span>
      </div>

      {/* "Selected" indicator (top-right) */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/50 ring-2 ring-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
      )}

      {/* Content overlay (bottom) */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 text-white">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xl sm:text-2xl leading-none" aria-hidden="true">
            {destination.flag}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-200">
            {destination.location}
          </span>
        </div>

        <h3 className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {destination.title}
        </h3>

        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/85 leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          {destination.tagline}
        </p>

        {/* Select pill */}
        <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-gray-800 text-xs sm:text-sm font-semibold shadow-lg ring-1 ring-black/5 group-hover:bg-gradient-to-br group-hover:from-[#0a67b3] group-hover:to-[#0891b2] group-hover:text-white group-hover:shadow-cyan-500/40 transition-all duration-300">
          Select
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Cyan glow ring on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl ring-2 ring-cyan-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
};

const Country = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    const storedCountry = localStorage.getItem('selectedCountry');
    if (storedCountry) setSelectedCountry(storedCountry);

    // Clear booking bits when entering Country
    [
      'selectedEndDate',
      'selectedStartDate',
      'dateRange',
      'peakCharge',
      'addons',
      'amounts',
      'peopleCount',
      'selectedPackages',
      'selectedRooms',
      'totalPrice',
      'travellerInfo',
      'isSubmitted',
      'selectedCamp',
    ].forEach((k) => localStorage.removeItem(k));
  }, []);

  const handleCountrySelection = (title: string) => {
    localStorage.setItem('selectedCountry', title);
    setSelectedCountry(title);
    router.push('/camp');
  };

  return (
    <>
      <BookingNavbar />

      {/* Min-height viewport on all sizes - let the page grow naturally if
          cards + header don't fit in 100vh (e.g. 13" laptops, 1366×768 PCs).
          Paddings are tightened to clear the actual BookingNavbar (~88px) and
          BookingFooter stepper (~100px), recovering ~50px of vertical space.
          The previous `md:h-screen md:overflow-hidden` clipped the layout and
          made cards visually overlap the heading on shorter viewports. */}
      <main className="min-h-screen bg-gradient-to-b from-white via-cyan-50/40 to-white flex flex-col pt-[96px] sm:pt-[104px] pb-[110px] sm:pb-[120px]">
        <div className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col">
          {/* Compact Header - scroll-margin keeps it visible below the fixed
              BookingNavbar when the page is scrolled. */}
          <motion.div
            className="flex-shrink-0 text-center mb-4 sm:mb-5 max-w-2xl mx-auto scroll-mt-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700">
              <span className="block w-6 h-px bg-cyan-500" />
              Booking · Step 1
              <span className="block w-6 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-2 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Choose Your Destination
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
              Pick a country to see our camps and start your booking.
            </p>
          </motion.div>

          {/* Destination cards - naturally below the header; never overlap. */}
          <div className="flex-1 max-w-4xl mx-auto w-full md:flex md:items-start md:justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8 items-start">
              {DESTINATIONS.map((destination, idx) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  isSelected={selectedCountry === destination.title}
                  onSelect={handleCountrySelection}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

export default Country;
