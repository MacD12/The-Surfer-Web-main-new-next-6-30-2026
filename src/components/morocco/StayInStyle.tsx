'use client';
import React from 'react'
import { motion as Motion } from 'framer-motion'
import RoomImageSlider from './RoomImageSlider'

const StayInStyle = () => {
  const roomImages = {
    dormitory: [
      "/morocco/3-bed-1.jpg",
      "/morocco/3-bed-2.jpg", 
      "/morocco/3-bed-3.jpg",
      "/morocco/3-bed-4.jpg"
    ],
    singleRoom: [
      "/morocco/2-bed-1.jpg",
      "/morocco/2-bed-2.jpg", 
      "/morocco/2-bed-3.jpg",
      "/morocco/2-bed-4.jpg"
    ],
    doubleRoom: [
      "/morocco/private-double-1.jpg",
      "/morocco/private-double-2.jpg", 
      "/morocco/private-double-3.jpg",
      "/morocco/private-double-4.jpg"
    ],
    tripleRoom: [
      "/morocco/balcony-1.jpg",
      "/morocco/balcony-2.jpg", 
      "/morocco/balcony-3.jpg",
      "/morocco/balcony-4.jpg"
    ]
  };

  return (
    <Motion.div
      className='flex flex-col items-center justify-center container mx-auto w-full overflow-hidden mt-16 mb-16 px-4'
      id='StayInStyle'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Motion.h1
        className='text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 mb-8 font-bold text-center text-neutral-400'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Stay in Style, the Island Way
      </Motion.h1>

      <Motion.p
        className='text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed text-center max-w-5xl px-1 mb-8'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Whether you're a solo surfer, a beach-loving couple, or a group of wave-chasers - we've got
         the perfect spot for you. Think breezy rooms, tropical touches, and all the essentials for
          a chill stay just steps from the sea. Laid-back comfort meets island style - because everyone
           deserves to sleep easy after a day in the surf.
      </Motion.p>

      <div className='w-full max-w-8xl'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          <Motion.div
            className='flex flex-col overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.03 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <RoomImageSlider
                images={roomImages.dormitory}
                altText="Mixed Dormitory"
                className='w-full aspect-[4/3] object-cover'
              />
            </Motion.div>

            <Motion.div
              className='p-4'
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed text-center'>
                <strong>3 Bed Shared Room</strong> – Surf Style Morocco Guest House offers a cozy shared room for surf lovers to enjoy Morocco’s vibrant culture and excellent surfing experiences.
              </p>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className='flex flex-col overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.03 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <RoomImageSlider
                images={roomImages.singleRoom}
                altText="Private Single Room Ensuite"
                className='w-full aspect-[4/3] object-cover'
              />
            </Motion.div>

            <Motion.div
              className='p-4'
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed text-center'>
                <strong>2 Bed Shared Room</strong> – Surf Style Morocco Guest House’s shared room combines comfort, Moroccan culture, and great surfing for an unforgettable camp experience.
              </p>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className='flex flex-col overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.03 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <RoomImageSlider
                images={roomImages.doubleRoom}
                altText="Private Double/Twin Room Ensuite"
                className='w-full aspect-[4/3] object-cover'
              />
            </Motion.div>

            <Motion.div
              className='p-4'
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed text-center'>
                <strong>Private Double Room</strong> – Surf Style Morocco Guest House’s double room blends comfort, Moroccan culture, and great surfing for an unforgettable camp experience.
              </p>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className='flex flex-col overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.03 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <RoomImageSlider
                images={roomImages.tripleRoom}
                altText="Private Triple Room Ensuite"
                className='w-full aspect-[4/3] object-cover'
              />
            </Motion.div>

            <Motion.div
              className='p-4'
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed text-center'>
                <strong>Private Double Room With Balcony</strong> – Surf Camp Morocco Guest House’s double room with terrace combines comfort, Moroccan culture, and excellent surfing for a memorable stay.
              </p>
            </Motion.div>
          </Motion.div>
        </div>

      </div>
    </Motion.div>
  )
}

export default StayInStyle