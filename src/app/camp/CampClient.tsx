'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Waves,
  MapPin,
  Heart,
  Info,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';

const CampsMap = dynamic(() => import('@/components/srilanka/CampsMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
      Loading map…
    </div>
  ),
});

const SRI_LANKA_CAMPS = [
  {
    id: 'beach',
    name: 'The Surfer Beach Camp',
    plusCode: 'XC9W+WQ Weligama',
    position: [5.9698228, 80.4468871] as [number, number],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.9698228%2C80.4468871&destination_place_id=ChIJ8T3AnVsVrjsR7EwuLk09pb8',
  },
  {
    id: 'ts2',
    name: 'TS2 Surf Camp',
    plusCode: 'XCCG+Q6 Weligama',
    position: [5.9719421, 80.4256101] as [number, number],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.9719421%2C80.4256101&destination_place_id=ChIJeSPsQDoVrjsRMCGCUUIDNZo',
  },
  {
    id: 'soul',
    name: 'Soul Surfer Camp',
    plusCode: 'XCCG+M9P Weligama',
    position: [5.971719, 80.425939] as [number, number],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.971719%2C80.425939',
  },
];

type CampPkg = {
  id: string;
  title: string;
  short: string;
  images: string[];
  includes: string[];
  /** When true, shows a "Brand New" badge in the card's top-left corner. */
  isNew?: boolean;
};

const PACKAGE_DATA: CampPkg[] = [
  {
    id: '1',
    title: 'The Surfer Beach Camp',
    short: 'Weligama · Beachfront',
    images: [
      'booking_engine/beach1.jpg',
      'booking_engine/beach2.jpg',
      'booking_engine/beach3.jpg',
      'beach_camp/s5.jpg',
      'beach_camp/s2.jpg',
      'beach_camp/s1.jpg',
    ],
    includes: [
      'THE SURFER BEACH CAMP – Beachfront in Weligama, Sri Lanka',
      'Oceanfront location with a swimming pool. Standard private rooms and Mixed dormitory with air conditioning and en-suite hot-water bathrooms.',
      'On-site facilities include a dedicated yoga area, a swimming pool, and a restaurant - everything you need for the full original The Surfer surf and yoga experience.',
      'Right next to Weligama Bay with multiple surf breaks within walking distance, perfect for all skill levels.',
    ],
  },
  {
    id: '2',
    title: 'TS2 Surf Camp',
    short: 'Weligama · Budget',
    images: [
      'booking_engine/ts2-1.jpg',
      'booking_engine/ts2-2.jpg',
      'ts2_camp/singleroom.jpg',
      'ts2_camp/room_2.jpg',
      'ts2_camp/bathroom.jpg',
    ],
    includes: [
      'THE SURFER TS2 CAMP – Budget Surf Stay in Weligama',
      'Simple, basic-standard private rooms with air conditioning and hot water ensuite bathrooms.',
      'The camp is located just a 5-minute ride from the Beach Camp. Even when you book TS2 Weligama, all surf lessons, yoga sessions, breakfast, dinner, and events take place at the Beach Camp - so you still get the full original The Surfer camp experience.',
      'To make travel between the two camps easy, we provide LKR 1,000 per day per bed or per room as travel compensation.',
    ],
  },
  {
    id: '3',
    title: 'The Surfer SurfStyle Surf Camp',
    short: 'Tamraght · Atlantic',
    images: ['/morocco/moro-1.jpg', '/morocco/moro-2.jpg', '/morocco/moro-3.jpg'],
    includes: [
      'THE SURFER SURFSTYLE CAMP – Tamraght, Morocco',
      "Our partner camp in the heart of Tamraght, Morocco's premier surf destination, known for its consistent waves and vibrant surf culture.",
      'A unique blend of traditional Moroccan hospitality and modern amenities - authentic yet comfortable.',
      'Direct access to Anchor Point, Killer Point and other world-class breaks for surfers of all levels.',
      'On-site: rooftop terrace with ocean views, communal lounge, and a restaurant serving delicious local cuisine.',
    ],
  },
  {
    id: '4',
    title: 'Soul Surfer Camp',
    short: 'Weligama · Independent retreat',
    isNew: true,
    images: [
      'soul_camp/3.jpg',
      'booking_engine/soulcamp4.jpg',
      'soul_camp/7.jpg',
      '/soul_camp/double-room/1.JPG',
      '/soul_camp/double-room/3.JPG',
      'soul_camp/11.jpg',
    ],
    includes: [
      'SOUL SURFER CAMP – Independent Boutique Retreat in Weligama',
      'An independent retreat with its own dedicated location in Weligama - just a 20-second walk from the beach and 5 minutes walk to the city center.',
      'Boutique-style experience with upscale private rooms and mixed dormitory rooms, all with ensuite bathrooms.',
      'Guests enjoy a rooftop restaurant and a rooftop infinity pool with panoramic sea view.',
      'Own daily schedule of surf sessions and activities, running entirely independently while still carrying the original The Surfer camp vibe.',
    ],
  },
];

const CampCard = ({
  pkg,
  isSelected,
  isExpanded,
  onToggleDetails,
  onSelect,
  index,
}: {
  pkg: CampPkg;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleDetails: () => void;
  onSelect: () => void;
  index: number;
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((p) => (p + 1) % pkg.images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((p) => (p - 1 + pkg.images.length) % pkg.images.length);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  const [headline, ...body] = pkg.includes;

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
    >
      {/* Card */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Select ${pkg.title}`}
        aria-pressed={isSelected}
        onClick={onSelect}
        onKeyDown={handleCardKeyDown}
        className={`group relative isolate aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl bg-gray-200 shadow-xl ring-1 transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 ${
          isSelected
            ? 'ring-2 ring-cyan-400 shadow-cyan-500/30'
            : 'ring-black/5 hover:shadow-2xl hover:ring-cyan-300/60'
        }`}
      >
        {/* Background image */}
        <img
          src={pkg.images[currentImage]}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark gradient overlay - confined to the bottom third where the
            camp-name text sits. Top two thirds stay clear so the original
            photo colours come through. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/80 transition-colors duration-500"
        />

        {/* Image counter pill */}
        {pkg.images.length > 1 && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold tabular-nums tracking-wider ring-1 ring-white/20 shadow-md">
            {currentImage + 1} / {pkg.images.length}
          </div>
        )}

        {/* "Brand New" badge - top-left corner. Marks a newly launched camp.
            Shifts below the selected-checkmark when the card is selected. */}
        {pkg.isNew && (
          <div className={`absolute left-3 z-20 pointer-events-none ${isSelected ? 'top-14' : 'top-3'}`}>
            <span className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg ring-1 ring-white/50">
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 blur-md opacity-60 animate-pulse"
              />
              <span className="relative">Brand New</span>
            </span>
          </div>
        )}

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/50 ring-2 ring-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
        )}

        {/* Carousel arrows (only when multiple images) */}
        {pkg.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Bottom title overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 text-white">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-cyan-200 mb-1.5 block">
            {pkg.short}
          </span>
          <h3 className="font-[montserrat] text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {pkg.title}
          </h3>
        </div>

        {/* Cyan ring glow on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl ring-2 ring-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        />
      </div>

      {/* Details toggle button */}
      <button
        type="button"
        onClick={onToggleDetails}
        aria-expanded={isExpanded}
        className={`mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold ring-1 transition-all duration-300 ${
          isExpanded
            ? 'bg-cyan-50 text-cyan-700 ring-cyan-200 hover:bg-cyan-100'
            : 'bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300'
        }`}
      >
        <Info className="w-3.5 h-3.5" strokeWidth={2.25} />
        {isExpanded ? 'Hide Details' : 'Camp Details'}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
          strokeWidth={2.25}
        />
      </button>

      {/* Expanded details panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl bg-gradient-to-br from-cyan-50/50 via-white to-white ring-1 ring-cyan-100/60 shadow-sm p-5">
              {/* Headline (first include item) */}
              <div className="mb-4 pb-4 border-b border-cyan-100/80">
                <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 mb-1.5">
                  About this Camp
                </span>
                <h4 className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-snug">
                  {headline}
                </h4>
              </div>

              {/* Body paragraphs */}
              <ul className="space-y-3">
                {body.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Continue CTA */}
              <button
                type="button"
                onClick={onSelect}
                className="mt-5 group w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0a67b3]/30 hover:shadow-lg hover:shadow-[#0a67b3]/50 hover:scale-[1.02] transition-all duration-300"
              >
                Continue with this camp
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

type CompareCardProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  tagline: string;
  bullets: Array<{ label: string; value: string }>;
  index: number;
};

const CompareCard = ({ icon: Icon, title, tagline, bullets, index }: CompareCardProps) => (
  <motion.article
    className="group relative rounded-2xl bg-white ring-1 ring-gray-100 shadow-md hover:shadow-xl hover:ring-cyan-200/50 transition-all duration-300 p-5 sm:p-6 overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -3 }}
  >
    {/* Left-edge brand accent bar */}
    <span
      aria-hidden="true"
      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
    />

    <header className="flex items-start gap-3 mb-3">
      <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/20">
        <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{tagline}</p>
      </div>
    </header>

    <ul className="space-y-2 mt-4">
      {bullets.map((b, i) => (
        <li key={i} className="text-xs sm:text-sm text-gray-600 leading-relaxed flex items-start gap-2">
          <span
            aria-hidden="true"
            className="shrink-0 mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500"
          />
          <span>
            <strong className="font-semibold text-gray-800">{b.label}</strong>{' '}
            <span>{b.value}</span>
          </span>
        </li>
      ))}
    </ul>
  </motion.article>
);

const Camp = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedCamp, setSelectedCamp] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [hintVisible, setHintVisible] = useState(true);
  const compareSectionRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedCamp = localStorage.getItem('selectedCamp');
    if (storedCamp) setSelectedCamp(storedCamp);

    const storedCountry = localStorage.getItem('selectedCountry');
    if (storedCountry) setSelectedCountry(storedCountry);

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
    ].forEach((k) => localStorage.removeItem(k));
  }, []);

  // Hide the floating "scroll to compare" hint once the comparison section is in view
  useEffect(() => {
    if (!compareSectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Hide hint when any portion of comparison section enters viewport
        setHintVisible(!entries[0].isIntersecting);
      },
      { threshold: 0.15, rootMargin: '0px 0px -120px 0px' },
    );
    observer.observe(compareSectionRef.current);
    return () => observer.disconnect();
  }, [selectedCountry]);

  const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id);

  const handleCampSelection = (title: string) => {
    localStorage.setItem('selectedCamp', title);
    setSelectedCamp(title);
    router.push('/date');
  };

  // Pick which camps to show based on country
  const visibleCamps =
    selectedCountry === 'Morocco'
      ? [PACKAGE_DATA[2]]
      : [PACKAGE_DATA[0], PACKAGE_DATA[1], PACKAGE_DATA[3]];

  // Grid columns: 3 cards in one row on lg, scales down responsively
  const gridColsCls =
    visibleCamps.length === 1
      ? 'grid-cols-1 max-w-md'
      : 'grid-cols-1 md:grid-cols-3';

  return (
    <>
      <BookingNavbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white pt-[120px] pb-[140px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700">
              <span className="block w-6 h-px bg-cyan-500" />
              Booking · Step 2
              <span className="block w-6 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-2 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Choose Your Camp
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
              {selectedCountry === 'Morocco'
                ? "Our partnered camp in Tamraght - Morocco's premier surf coast."
                : 'Pick a camp based on location and vibe. Compare details below to find your fit.'}
            </p>
          </motion.div>

          {/* Camp cards - 1 row on desktop */}
          <div className={`grid ${gridColsCls} gap-5 sm:gap-6 max-w-6xl mx-auto mb-12 sm:mb-14`}>
            {visibleCamps.map((pkg, idx) => (
              <CampCard
                key={pkg.id}
                pkg={pkg}
                index={idx}
                isSelected={selectedCamp === pkg.title}
                isExpanded={expanded === pkg.id}
                onToggleDetails={() => toggleExpand(pkg.id)}
                onSelect={() => handleCampSelection(pkg.title)}
              />
            ))}
          </div>

          {/* Comparison section (only for Sri Lanka, where 3 camps exist) */}
          {selectedCountry !== 'Morocco' && (
            <>
              <section
                id="camp-compare"
                ref={compareSectionRef}
                aria-labelledby="camp-compare-title"
                className="scroll-mt-32 max-w-6xl mx-auto mt-10 sm:mt-14"
              >
                <motion.div
                  className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700 mb-3">
                    Compare Camps
                  </span>
                  <h2
                    id="camp-compare-title"
                    className="font-[montserrat] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-800"
                  >
                    Beach Camp · TS2 · Soul Surfer
                  </h2>
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mt-3 mb-4 flex justify-center"
                  >
                    <span className="block h-[3px] w-12 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
                  </motion.div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    A clear, side-by-side breakdown to help you pick the right place to sleep.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  <CompareCard
                    icon={Waves}
                    title="Beach Camp"
                    tagline="Weligama · Right on the beach"
                    bullets={[
                      { label: 'Location:', value: 'Right next to Weligama beach.' },
                      { label: 'Rooms:', value: 'Private rooms with A/C, ensuite, hot water.' },
                      { label: 'Facilities:', value: 'Pool, restaurant, dedicated yoga area.' },
                      { label: 'Sessions:', value: 'All lessons, yoga, dinners, events happen here.' },
                      { label: 'Events:', value: 'The Surfer signature events such as boat parties, pool parties, and special social nights bring guests from all camps together to share the full community experience.' },
                      { label: 'Best for:', value: 'Guests who want to stay where it all happens.' },
                    ]}
                    index={0}
                  />
                  <CompareCard
                    icon={MapPin}
                    title="TS2 Camp"
                    tagline="Weligama · Budget-friendly"
                    bullets={[
                      { label: 'Location:', value: '5-min ride from Beach Camp.' },
                      { label: 'Rooms:', value: 'Basic private rooms with A/C + hot-water ensuite.' },
                      { label: 'Facilities:', value: 'Use Beach Camp amenities during the day.' },
                      { label: 'Sessions:', value: 'All sessions run at Beach Camp.' },
                      { label: 'Transport:', value: 'LKR 1,000/day compensation between camps.' },
                      { label: 'Events:', value: 'The Surfer signature events such as boat parties, pool parties, and special social nights bring guests from all camps together to share the full community experience.' },
                      { label: 'Best for:', value: 'Sleep cheap at TS2, hang out at Beach Camp.' },
                    ]}
                    index={1}
                  />
                  <CompareCard
                    icon={Heart}
                    title="Soul Surfer"
                    tagline="Weligama · Independent"
                    bullets={[
                      { label: 'Location:', value: 'Weligama - own dedicated location. 5–10 minute walk to city center. 100 meters to the beach.' },
                      { label: 'Rooms:', value: 'Brand new private rooms with A/C, ensuite & hot water.' },
                      { label: 'Facilities:', value: 'Rooftop infinity pool with sea view, rooftop restaurant & rooftop yoga area.' },
                      { label: 'Operation:', value: 'Runs independently - own lessons schedule and daily social activities.' },
                      { label: 'Events:', value: 'The Surfer signature events such as boat parties, pool parties, and special social nights bring guests from all camps together to share the full community experience.' },
                      { label: 'Best for:', value: 'Surfers who want focus, sea view, and their own pace.' },
                    ]}
                    index={2}
                  />
                </div>
              </section>

              {/* Map */}
              <motion.div
                className="isolate relative mt-10 sm:mt-12 max-w-6xl mx-auto rounded-2xl overflow-hidden ring-1 ring-gray-100 shadow-lg h-[360px] sm:h-[440px] lg:h-[520px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <CampsMap camps={SRI_LANKA_CAMPS} />
              </motion.div>
            </>
          )}
        </div>
      </main>

      {/* Floating "scroll for comparison" hint - only for Sri Lanka, only while
          the comparison section is below the fold. Sits just above the fixed
          footer stepper. Disappears once user reaches the comparison. */}
      {selectedCountry !== 'Morocco' && (
        <AnimatePresence>
          {hintVisible && (
            <motion.a
              key="scroll-hint"
              href="#camp-compare"
              aria-label="Scroll to compare all camps"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="group fixed left-1/2 -translate-x-1/2 z-20 bottom-[112px] sm:bottom-[120px] inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/95 backdrop-blur-md ring-1 ring-cyan-200 shadow-xl shadow-cyan-500/15 hover:ring-cyan-400 hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-cyan-700">
                Compare All Camps
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#0a67b3] to-cyan-500 text-white shadow-md shadow-cyan-500/40 group-hover:shadow-lg transition-shadow duration-300"
              >
                <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
              </motion.span>
            </motion.a>
          )}
        </AnimatePresence>
      )}

      <BookingFooter />
    </>
  );
};

export default Camp;