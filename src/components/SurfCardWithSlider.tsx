'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SurfCardProps = {
  images: string[];
  topic: string;
  body1: string;
  body2?: string;
  link: string;
  index: number;
  /** When true, card uses a 4:5 portrait ratio (matches /camp booking flow).
   *  When false/undefined, card uses the original fixed 360px height. */
  tall?: boolean;
  /** When true, shows a "Brand New" badge in the top-left corner. */
  isNew?: boolean;
};

const SurfCardWithSlider = ({ images, topic, body1, body2, link, index, tall, isNew }: SurfCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (i) => setCurrentImageIndex(i);

  const goToPrevious = () =>
    setCurrentImageIndex((c) => (c === 0 ? images.length - 1 : c - 1));

  const goToNext = () =>
    setCurrentImageIndex((c) => (c === images.length - 1 ? 0 : c + 1));

  const handleCardClick = () => {
    window.location.href = link;
  };

  return (
    <div
      className={`group relative isolate ${tall ? 'aspect-[4/5] w-full' : 'h-[360px]'} flex items-end justify-center shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden bg-gradient-to-br from-[#0a67b3] via-[#0891b2] to-[#0e7490] transition-shadow duration-500`}
      onClick={handleCardClick}
    >
      {/* Image layers - next/image for LCP + auto-WebP/AVIF + responsive srcset */}
      <div className="absolute inset-0">
        {images &&
          images.map((image, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <Image
                src={image}
                alt={`${topic} - photo ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={70}
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          ))}
      </div>

      {/* "Brand New" badge - top-left corner. Marks a newly launched camp. */}
      {isNew && (
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg ring-1 ring-white/50">
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 blur-md opacity-60 animate-pulse"
            />
            <span className="relative">Brand New</span>
          </span>
        </div>
      )}

      {/* Dark gradient overlay - confined to the bottom band where the title,
          body, and BOOK NOW button sit. Top of the card stays clear so the
          photo's original colours show through unfiltered. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"
      />

      {/* Prev / Next slider buttons */}
      {images && images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-[#0a67b3] shadow-md ring-1 ring-black/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#0a67b3] hover:text-white hover:scale-110 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-[#0a67b3] shadow-md ring-1 ring-black/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#0a67b3] hover:text-white hover:scale-110 z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {images && images.length > 1 && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20 px-2 py-1.5 rounded-full bg-black/30 backdrop-blur-sm ring-1 ring-white/20">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToImage(idx);
              }}
              className={`rounded-full transition-all duration-300 ${
                idx === currentImageIndex
                  ? 'w-5 h-2 bg-white'
                  : 'w-2 h-2 bg-white/60 hover:bg-white/90'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Card text content */}
      <div className="relative text-white p-6 text-center w-full z-10">
        <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {topic}
        </h3>
        <p className="text-sm mb-2 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {body1}
        </p>
        {body2 && (
          <p className="text-sm mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {body2}
          </p>
        )}
        {index !== 3 && (
          <a
            href={link}
            className="inline-block mt-1 text-white border-2 border-white/90 px-6 py-2 rounded-full font-semibold backdrop-blur-sm bg-white/10 hover:bg-white hover:text-[#0a67b3] hover:scale-105 transition-all duration-300 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            BOOK NOW
          </a>
        )}
      </div>
    </div>
  );
};

export default SurfCardWithSlider;