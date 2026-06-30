'use client';
import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n-compat'

const ImageSlider = () => {
  const { t } = useTranslation();

  // Alt text arrays from i18n
  const slider1Alts = t('imageSlider.slider1Alts', { returnObjects: true });
  const slider2Alts = t('imageSlider.slider2Alts', { returnObjects: true });

  const sliderData = [
    { id: 1, image: "/beach_camp/s1.jpg" },
    { id: 2, image: "/beach_camp/s2.jpg" },
    { id: 3, image: "/beach_camp/s3.jpg" },
    { id: 4, image: "/beach_camp/s4.jpg" },
    { id: 5, image: "/beach_camp/s5.jpg" },
    { id: 6, image: "/beach_camp/s6.jpg" }
  ];

  const sliderData2 = [
    { id: 1, image: "/beach_camp/s6.jpg" },
    { id: 2, image: "/beach_camp/s5.jpg" },
    { id: 3, image: "/beach_camp/s4.jpg" },
    { id: 4, image: "/beach_camp/s3.jpg" },
    { id: 5, image: "/beach_camp/s2.jpg" },
    { id: 6, image: "/beach_camp/s1.jpg" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentSlide2, setCurrentSlide2] = useState(0)
  const imagesPerView = 3

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + 1 > sliderData.length - imagesPerView ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderData.length - imagesPerView : prev - 1
    )
  }

  const nextSlide2 = () => {
    setCurrentSlide2((prev) =>
      prev + 1 > sliderData2.length - imagesPerView ? 0 : prev + 1
    )
  }

  const prevSlide2 = () => {
    setCurrentSlide2((prev) =>
      prev === 0 ? sliderData2.length - imagesPerView : prev - 1
    )
  }

  return (
    <Motion.div 
      className='flex flex-col items-center justify-center container mx-auto w-full overflow-hidden mt-16 mb-10'
      id='ImageSlider'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Slider 1 */}
      <Motion.div 
        className='relative max-w-8xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <button
          onClick={prevSlide}
          className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white/95 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110'
          aria-label={t('imageSlider.aria.prev')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className='overflow-hidden'>
          <Motion.div 
            className='flex gap-6'
            animate={{ x: -currentSlide * (100 / imagesPerView) + '%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {sliderData.map((item, index) => (
              <Motion.div
                key={item.id}
                className='flex-shrink-0 w-1/3'
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <img
                  src={item.image}
                  alt={slider1Alts?.[index] || 'Image'}
                  className='w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg'
                />
              </Motion.div>
            ))}
          </Motion.div>
        </div>

        <button
          onClick={nextSlide}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white/95 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110'
          aria-label={t('imageSlider.aria.next')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Motion.div>

      {/* Slider 2 */}
      <Motion.div 
        className='relative max-w-8xl mx-auto mt-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <button
          onClick={prevSlide2}
          className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white/95 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110'
          aria-label={t('imageSlider.aria.prev')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className='overflow-hidden'>
          <Motion.div 
            className='flex gap-6'
            animate={{ x: -currentSlide2 * (100 / imagesPerView) + '%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {sliderData2.map((item, index) => (
              <Motion.div
                key={item.id}
                className='flex-shrink-0 w-1/3'
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <img
                  src={item.image}
                  alt={slider2Alts?.[index] || 'Image'}
                  className='w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg'
                />
              </Motion.div>
            ))}
          </Motion.div>
        </div>

        <button
          onClick={nextSlide2}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white/95 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110'
          aria-label={t('imageSlider.aria.next')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Motion.div>
    </Motion.div>
  )
}

export default ImageSlider
