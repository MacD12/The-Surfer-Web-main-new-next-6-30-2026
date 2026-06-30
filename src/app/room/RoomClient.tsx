'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Plus,
  Minus,
  Users,
  BedDouble,
  Check,
  Info,
  AlertTriangle,
} from 'lucide-react';

import Summary from '@/components/booking_engine/Summary';
import BookingNavbar from '@/components/booking_engine/BookingNavbar';
import BookingFooter from '@/components/booking_engine/BookingFooter';
import RoomCarousel from '@/components/booking_engine/RoomCarousel';

type Room = {
  id: number;
  title: string;
  people: number;
  image: string;
  images?: string[];
  details: string;
};

const RoomPage = () => {
  const [selectedCamp, setSelectedCamp] = useState<string>('');

  useEffect(() => {
    setSelectedCamp(localStorage.getItem('selectedCamp') || '');
  }, []);

  const roomsData = useMemo<Room[]>(() => {
    if (selectedCamp === 'TS2 Surf Camp') {
      return [
        { id: 1, title: 'Dorm Bed', people: 1, image: 'ts2_camp/dorm.jpg', details: 'A bed in a mixed dormitory. Shared room, maximum 5 people.' },
        { id: 2, title: 'Private Single Room', people: 1, image: 'ts2_camp/singleroom.jpg', details: 'Private single room with private bathroom.' },
        { id: 3, title: 'Private Double Room Per Person', people: 2, image: 'ts2_camp/doubleroom.jpg', details: 'Private double room with private bathroom.' },
        { id: 4, title: 'Private Triple Room Per Person', people: 3, image: 'ts2_camp/tripleroom.jpg', details: 'Private triple room with private bathroom. Price shown is per person.' },
      ];
    }

    if (selectedCamp === 'The Surfer SurfStyle Surf Camp') {
      return [
        { id: 1, title: 'Shared Room', people: 1, image: 'morocco/3-bed-1.jpg', details: 'Shared room for 2 people with bathroom access.' },
        { id: 2, title: 'Single Room', people: 1, image: 'morocco/2-bed-1.jpg', details: 'Private single room with bathroom.' },
        { id: 3, title: 'Double Room', people: 2, image: 'morocco/private-double-1.jpg', details: 'Private double room with bathroom.' },
      ];
    }

    if (selectedCamp === 'Soul Surfer Camp') {
      // Soul Surfer Camp does NOT offer triple rooms - only dorm, single, and double.
      return [
        {
          id: 1,
          title: 'Dorm Bed',
          people: 1,
          image: '/soul_camp/DORM/1.jpg',
          images: [
            '/soul_camp/DORM/1.jpg',
            '/soul_camp/DORM/2.jpeg',
            '/soul_camp/DORM/3.JPG',
            '/soul_camp/DORM/4.JPG',
            '/soul_camp/DORM/5.jpeg',
          ],
          details: 'A bed in a mixed dormitory. Shared room, maximum 5 people.',
        },
        {
          id: 2,
          title: 'Private Single Room',
          people: 1,
          image: '/soul_camp/single-room/1.JPG',
          images: [
            '/soul_camp/single-room/1.JPG',
            '/soul_camp/single-room/2.jpeg',
            '/soul_camp/single-room/3.JPG',
            '/soul_camp/single-room/4.JPG',
            '/soul_camp/single-room/5.JPG',
          ],
          details: 'Private single room with private bathroom.',
        },
        {
          id: 3,
          title: 'Private Double Room Per Person',
          people: 2,
          image: '/soul_camp/double-room/1.JPG',
          images: [
            '/soul_camp/double-room/1.JPG',
            '/soul_camp/double-room/2.JPG',
            '/soul_camp/double-room/3.JPG',
            '/soul_camp/double-room/4.JPG',
            '/soul_camp/double-room/5.JPG',
          ],
          details: 'Private double room with private bathroom.',
        },
      ];
    }

    // Default: The Surfer Beach Camp
    return [
      { id: 1, title: 'Dorm Bed', people: 1, image: 'booking_engine/dorm.jpg', details: 'A bed in a mixed dormitory. Shared room, maximum 5 people.' },
      { id: 2, title: 'Private Single Room', people: 1, image: 'booking_engine/single.jpg', details: 'Private single room with private bathroom.' },
      { id: 3, title: 'Private Double Room Per Person', people: 2, image: 'booking_engine/double.jpg', details: 'Private double room with private bathroom.' },
      { id: 4, title: 'Private Triple Room Per Person', people: 3, image: 'booking_engine/triple.jpg', details: 'Private triple room with private bathroom. Price shown is per person.' },
    ];
  }, [selectedCamp]);

  const [peopleCount, setPeopleCount] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState<{ id: number; count: number }[]>([]);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const storedPeople = localStorage.getItem('peopleCount');
    if (storedPeople) setPeopleCount(parseInt(storedPeople));

    const stored = localStorage.getItem('selectedRooms');
    if (!stored) return;
    try {
      const roomStrings: string[] = JSON.parse(stored);
      const restored = roomStrings
        .map((entry) => {
          const [countStr, ...titleParts] = entry.split(' x ');
          const title = titleParts.join(' x ');
          const room = roomsData.find((r) => r.title === title.trim());
          return room ? { id: room.id, count: parseInt(countStr) } : null;
        })
        .filter(Boolean) as { id: number; count: number }[];
      setSelectedRooms(restored);
    } catch {
      // ignore
    }
  }, [roomsData]);

  useEffect(() => {
    localStorage.setItem('peopleCount', String(peopleCount));
    const readableRooms = selectedRooms.map((r) => {
      const room = roomsData.find((room) => room.id === r.id);
      return `${r.count} x ${room?.title ?? ''}`;
    });
    localStorage.setItem('selectedRooms', JSON.stringify(readableRooms));
  }, [peopleCount, selectedRooms, roomsData]);

  const getFilledCapacity = () =>
    selectedRooms.reduce((acc, r) => {
      const room = roomsData.find((x) => x.id === r.id);
      return acc + r.count * (room?.people || 0);
    }, 0);

  const handlePeopleCountChange = (inc: boolean) => {
    const next = inc ? peopleCount + 1 : Math.max(0, peopleCount - 1);
    setPeopleCount(next);
    if (next === 0 || getFilledCapacity() > next) setSelectedRooms([]);
  };

  const updateRoomCount = (roomId: number, inc: boolean) => {
    const updated = [...selectedRooms];
    const room = roomsData.find((r) => r.id === roomId);
    const ix = updated.findIndex((r) => r.id === roomId);
    const cur = ix !== -1 ? updated[ix].count : 0;
    const next = inc ? cur + 1 : cur - 1;

    if (inc && getFilledCapacity() + (room?.people || 0) > peopleCount) return;

    if (ix !== -1) {
      if (next <= 0) updated.splice(ix, 1);
      else updated[ix].count = next;
    } else if (inc) {
      updated.push({ id: roomId, count: 1 });
    }
    setSelectedRooms(updated);
  };

  const canIncrement = (room: Room) =>
    getFilledCapacity() + room.people <= peopleCount;

  const displayedRooms = roomsData.filter((room) => {
    if (peopleCount === 0) return false;
    if (peopleCount === 1) return room.people === 1;
    if (peopleCount === 2) return room.people <= 2;
    return true;
  });

  const filledCapacity = getFilledCapacity();
  const selectionComplete = peopleCount > 0 && filledCapacity === peopleCount;

  const parsedDateRange = (() => {
    if (typeof window === 'undefined') return '';
    const raw = localStorage.getItem('dateRange');
    try {
      return raw ? JSON.parse(raw) : '';
    } catch {
      return raw || '';
    }
  })();

  // Responsive grid columns based on room count
  const roomGridCols =
    displayedRooms.length === 3
      ? 'sm:grid-cols-3'
      : displayedRooms.length === 4
      ? 'sm:grid-cols-2 xl:grid-cols-4'
      : displayedRooms.length === 2
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-2 lg:grid-cols-3';

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
              Booking · Step 4
              <span className="block w-5 h-px bg-cyan-500" />
            </span>
            <h1 className="mt-1.5 font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Choose Your Room
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
              Tell us how many people are travelling, then pick the room mix that fits your group.
            </p>
          </motion.div>

          {/* Two-column main */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* LEFT - People selector + rooms */}
            <motion.div
              className="lg:col-span-8 space-y-5 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              {/* People stepper card */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
                    <Users className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Travellers
                    </span>
                    <span className="block text-xs sm:text-sm text-gray-500">
                      How many people are staying?
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-3 sm:gap-4 px-2 py-1 rounded-full bg-gray-50 ring-1 ring-gray-200">
                  <button
                    type="button"
                    onClick={() => handlePeopleCountChange(false)}
                    disabled={peopleCount <= 0}
                    aria-label="Decrease people"
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-semibold transition-all duration-200 ${
                      peopleCount <= 0
                        ? 'bg-white text-gray-300 cursor-not-allowed'
                        : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-cyan-50 hover:ring-cyan-300 hover:text-cyan-700 active:scale-95'
                    }`}
                  >
                    <Minus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <span className="min-w-[2rem] text-center font-[montserrat] text-xl sm:text-2xl font-bold tabular-nums text-gray-800">
                    {peopleCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePeopleCountChange(true)}
                    aria-label="Increase people"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-md shadow-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Room cards */}
              {peopleCount > 0 ? (
                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <div>
                      <h2 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-800">
                        Available Rooms
                      </h2>
                      <p className="text-xs text-gray-500">
                        Pick rooms to cover all {peopleCount} {peopleCount === 1 ? 'person' : 'people'}.
                      </p>
                    </div>
                    {/* Inline progress chip */}
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider ring-1 ${
                        selectionComplete
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                          : 'bg-amber-50 text-amber-700 ring-amber-200'
                      }`}
                    >
                      {selectionComplete ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                      ) : (
                        <span className="block w-2 h-2 rounded-full bg-amber-500" />
                      )}
                      {filledCapacity} / {peopleCount} assigned
                    </span>
                  </div>

                  <div className={`grid grid-cols-1 gap-4 sm:gap-5 ${roomGridCols}`}>
                    {displayedRooms.map((room) => {
                      const sel = selectedRooms.find((r) => r.id === room.id);
                      const count = sel?.count || 0;
                      const isSelected = count > 0;
                      const cantAdd = !canIncrement(room);
                      const shouldGray = selectionComplete && !isSelected;

                      return (
                        <motion.div
                          key={room.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className={`group relative flex flex-col rounded-2xl bg-white shadow-md ring-1 overflow-hidden transition-all duration-300 ${
                            isSelected
                              ? 'ring-2 ring-cyan-400 shadow-cyan-500/20'
                              : shouldGray
                              ? 'ring-gray-100 opacity-60 grayscale'
                              : 'ring-gray-100 hover:shadow-xl hover:ring-cyan-200/60'
                          }`}
                        >
                          {/* Image */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            <RoomCarousel
                              images={room.images && room.images.length ? room.images : [room.image]}
                              alt={room.title}
                            />
                            {/* Capacity pill */}
                            <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-wide text-gray-800 ring-1 ring-black/5 shadow-sm">
                              <Users className="w-3 h-3" strokeWidth={2.5} />
                              {room.people} {room.people === 1 ? 'person' : 'people'}
                            </span>
                            {/* Selected check */}
                            {isSelected && (
                              <span className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/40 ring-2 ring-white">
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col p-4">
                            <h3 className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-tight">
                              {room.title}
                            </h3>
                            <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
                              {room.details}
                            </p>

                            {/* Counter */}
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
                                Rooms
                              </span>
                              <div className="inline-flex items-center gap-2.5">
                                <button
                                  type="button"
                                  onClick={() => updateRoomCount(room.id, false)}
                                  disabled={count === 0}
                                  aria-label={`Remove ${room.title}`}
                                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold transition-all duration-200 ${
                                    count === 0
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
                                  onClick={() => updateRoomCount(room.id, true)}
                                  disabled={cantAdd || shouldGray}
                                  aria-label={`Add ${room.title}`}
                                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold transition-all duration-200 ${
                                    cantAdd || shouldGray
                                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                      : 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-md shadow-cyan-500/30 hover:shadow-lg hover:scale-105 active:scale-95'
                                  }`}
                                >
                                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 p-8 text-center">
                  <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-full bg-white ring-1 ring-cyan-200 shadow-sm mb-3">
                    <BedDouble className="w-5 h-5 text-cyan-600" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 tracking-tight mb-1">
                    Tell us your group size
                  </p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Use the + button above to add travellers. Room options will appear here based on your group size.
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
              {/* Progress bar */}
              {peopleCount > 0 && (
                <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Assignment
                    </span>
                    <span className="text-xs font-bold text-gray-800 tabular-nums">
                      {filledCapacity} / {peopleCount}
                    </span>
                  </div>
                  <div className="relative h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${(filledCapacity / peopleCount) * 100}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                  {!selectionComplete && filledCapacity < peopleCount && (
                    <p className="mt-2.5 text-[11px] text-amber-700 flex items-start gap-1.5">
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" strokeWidth={2.5} />
                      Assign {peopleCount - filledCapacity} more{' '}
                      {peopleCount - filledCapacity === 1 ? 'person' : 'people'} to continue.
                    </p>
                  )}
                  {selectionComplete && (
                    <p className="mt-2.5 text-[11px] text-emerald-700 flex items-center gap-1.5">
                      <Check className="w-3 h-3 shrink-0" strokeWidth={3} />
                      All travellers assigned!
                    </p>
                  )}
                </div>
              )}

              {/* Summary panel */}
              <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md overflow-hidden">
                <Summary
                  dateRange={parsedDateRange}
                  selectedRooms={selectedRooms.map((r) => {
                    const room = roomsData.find((x) => x.id === r.id);
                    return `${r.count} x ${room?.title ?? ''}`;
                  })}
                />
              </div>

              {/* Tip when nothing selected */}
              {peopleCount === 0 && (
                <div className="flex items-start gap-2.5 rounded-xl bg-cyan-50/50 ring-1 ring-cyan-100/60 px-3 py-2.5">
                  <Info className="w-3.5 h-3.5 mt-0.5 text-cyan-700 shrink-0" strokeWidth={2.25} />
                  <p className="text-[11px] text-gray-600 leading-snug">
                    Pick the number of travellers to see room options.
                  </p>
                </div>
              )}

              {/* CTA */}
              <Link
                href={selectionComplete ? '/package' : '#'}
                onClick={(e) => {
                  if (!selectionComplete) e.preventDefault();
                }}
                className="block"
                aria-disabled={!selectionComplete}
              >
                <div
                  className={`group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectionComplete
                      ? 'bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-[1.02] active:scale-100'
                      : 'bg-gray-100 text-gray-400 ring-1 ring-gray-200 cursor-not-allowed'
                  }`}
                >
                  Continue to Package Selection
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      selectionComplete ? 'group-hover:translate-x-1' : ''
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

export default RoomPage;
