'use client';
import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n-compat';

const RoomImageSlider = ({ images, altText, className }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const baseAlt = altText || t("roomImageSlider.defaultAlt");

  const goToImage = (index) => setCurrentImageIndex(index);
  const goToPrevious = () =>
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goToNext = () =>
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images || images.length <= 1) {
    return (
      <img
        src={images?.[0] || "/beach_camp/room_1.jpg"}
        alt={baseAlt}
        className={className}
      />
    );
  }

  return (
    <div
      className="group/slider relative w-full aspect-[4/3] overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={baseAlt}
    >
      {images.map((image, idx) => (
        <Motion.img
          key={idx}
          src={image}
          alt={t("roomImageSlider.altIndexed", { base: baseAlt, n: idx + 1 })}
          className={`absolute inset-0 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-hidden={idx === currentImageIndex ? "false" : "true"}
        />
      ))}

      {/* Soft gradient at bottom so indicators stay legible on light photos */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 via-black/15 to-transparent pointer-events-none z-10" />

      {/* Image counter pill (top-right) */}
      <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold tabular-nums tracking-wider ring-1 ring-white/20 shadow-md">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center opacity-80 group-hover/slider:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label={t("roomImageSlider.aria.prev")}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center opacity-80 group-hover/slider:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label={t("roomImageSlider.aria.next")}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators (bottom-center, refined pill style) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md ring-1 ring-white/15">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goToImage(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentImageIndex
                ? "w-5 bg-white"
                : "w-1.5 bg-white/55 hover:bg-white/85"
            }`}
            aria-label={t("roomImageSlider.aria.goto", { n: idx + 1 })}
            aria-current={idx === currentImageIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomImageSlider;