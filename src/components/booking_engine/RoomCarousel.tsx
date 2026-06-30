'use client';
import React, { useState } from 'react';

/**
 * Image carousel for the booking-engine room cards. Fills the parent
 * (absolute inset-0), so it must sit inside a `relative` aspect box.
 * With a single image it renders a plain <img> (no controls).
 */
const RoomCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [index, setIndex] = useState(0);
  const safe = images.filter(Boolean);

  if (safe.length <= 1) {
    return (
      <img
        src={safe[0] || '/beach_camp/room_1.jpg'}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  const go = (e: React.MouseEvent, n: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((n + safe.length) % safe.length);
  };

  return (
    <>
      {safe.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} - ${i + 1}`}
          aria-hidden={i === index ? 'false' : 'true'}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => go(e, index - 1)}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-gray-800 shadow ring-1 ring-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => go(e, index + 1)}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-gray-800 shadow ring-1 ring-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-md ring-1 ring-white/15">
        {safe.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => go(e, i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index ? 'true' : 'false'}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/85'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default RoomCarousel;
