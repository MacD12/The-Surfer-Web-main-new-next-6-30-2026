'use client';
import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CampSlide = {
  image: string;
  alt?: string;
};

type CampSectionProps = {
  /** Camp title - e.g., "The Surfer Beach Camp – Sri Lanka" */
  title: string;
  /** One-paragraph description */
  description: string;
  /** Pill button label - e.g., "Book Now" */
  cta: string;
  /** Anchor href for the button (defaults to /book-now in a new tab) */
  ctaHref?: string;
  ctaTarget?: '_blank' | '_self';
  /** Image slides */
  slides: CampSlide[];
  /** Aria labels for arrow buttons */
  ariaPrev?: string;
  ariaNext?: string;
  /** Background variant - alternate to create visual rhythm between sections */
  variant?: 'light' | 'gray';
  /** Optional id for scroll anchors */
  id?: string;
  /** Default alt fallback when a slide has no alt */
  altFallback?: string;
};

const useResponsivePerView = () => {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return perView;
};

const ArrowButton = ({
  direction,
  onClick,
  ariaLabel,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  ariaLabel: string;
}) => {
  const pos = direction === 'left' ? 'left-3' : 'right-3';
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <Motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.95 }}
      className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400`}
    >
      <Icon size={20} strokeWidth={2.5} />
    </Motion.button>
  );
};

const CampSection = ({
  title,
  description,
  cta,
  ctaHref = '/book-now',
  ctaTarget = '_blank',
  slides,
  ariaPrev = 'Previous slide',
  ariaNext = 'Next slide',
  variant = 'light',
  id,
  altFallback = 'Camp image',
}: CampSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const perView = useResponsivePerView();

  const maxIndex = Math.max(0, slides.length - perView);
  const safeIndex = Math.min(currentSlide, maxIndex);

  const next = () => setCurrentSlide((p) => (p >= maxIndex ? 0 : p + 1));
  const prev = () => setCurrentSlide((p) => (p <= 0 ? maxIndex : p - 1));
  const goTo = (i: number) => setCurrentSlide(Math.max(0, Math.min(i, maxIndex)));

  // Keyboard nav when slider is focused / hovered
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  const slideWidthPct = 100 / perView;
  const showControls = slides.length > perView;

  const wrapperBg = variant === 'gray' ? 'bg-gray-50' : 'bg-white';
  const sliderSurfaceBg = variant === 'gray' ? 'bg-white' : 'bg-gray-50';

  return (
    <Motion.section
      id={id}
      className={`${wrapperBg} py-14 sm:py-16 ${id ? 'scroll-mt-24' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800">
            {title}
          </h2>
          <Motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-4 sm:mt-5 mb-6 flex justify-center"
          >
            <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
          </Motion.div>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl mx-auto mb-7">
            {description}
          </p>
          <Motion.a
            href={ctaHref}
            target={ctaTarget}
            rel={ctaTarget === '_blank' ? 'noreferrer' : undefined}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={cta}
          >
            {cta}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Motion.a>
        </Motion.div>

        {/* Slider */}
        <Motion.div
          className={`group/slider relative rounded-2xl ring-1 ring-gray-100 shadow-lg overflow-hidden ${sliderSurfaceBg} focus-within:ring-2 focus-within:ring-cyan-400`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          tabIndex={showControls ? 0 : -1}
          onKeyDown={handleKey}
          role="region"
          aria-roledescription="carousel"
          aria-label={title}
        >
          <div className="relative overflow-hidden h-64 sm:h-72 md:h-80 lg:h-[26rem]">
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${safeIndex * slideWidthPct}%)`,
              }}
            >
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 h-full"
                  style={{ width: `${slideWidthPct}%` }}
                  aria-hidden={idx < safeIndex || idx >= safeIndex + perView ? 'true' : 'false'}
                >
                  <div className="h-full p-1.5 sm:p-2">
                    <div className="relative w-full h-full overflow-hidden rounded-xl group/img">
                      <img
                        src={slide.image}
                        alt={slide.alt || altFallback}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image counter pill */}
            {showControls && (
              <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold tabular-nums tracking-wider ring-1 ring-white/20 shadow-md">
                {safeIndex + 1}–{Math.min(safeIndex + perView, slides.length)}
                <span className="opacity-60"> / {slides.length}</span>
              </div>
            )}

            {/* Arrows */}
            {showControls && (
              <>
                <ArrowButton direction="left" onClick={prev} ariaLabel={ariaPrev} />
                <ArrowButton direction="right" onClick={next} ariaLabel={ariaNext} />
              </>
            )}

            {/* Dot indicators */}
            {showControls && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md ring-1 ring-white/15">
                {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => goTo(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === safeIndex
                        ? 'w-5 bg-white'
                        : 'w-1.5 bg-white/55 hover:bg-white/85'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    aria-current={dotIdx === safeIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            )}
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
};

export default CampSection;
