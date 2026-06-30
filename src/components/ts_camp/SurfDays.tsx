'use client';
import React from 'react'
import { motion as Motion } from 'framer-motion'

const SurfDays = () => {

  return (
    <Motion.div
      className='flex flex-col items-center justify-center container mx-auto w-full overflow-hidden my-16 px-4'
      id='SurfDays'
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
        What Your Surf Days Look Like at TS2
      </Motion.h1>

      <div className='w-full max-w-7xl space-y-12'>

        <Motion.div
          className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 lg:flex-row'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Motion.div
            className='lg:w-1/3 w-full max-w-xs'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <img
              src="/ts2_camp/surfdays_1.jpg"
              alt="Surf Day Image"
              loading="lazy"
              decoding="async"
              className='w-full h-40 lg:h-48 object-cover shadow-md'
            />
          </Motion.div>

          <Motion.div
            className='lg:w-2/3 w-full flex items-center flex-col text-center lg:text-left'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className='text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed text-justify lg:text-left'>
              Each day at TS2 starts slow and steady-coffee in hand, ocean in view, and no alarm clocks (except maybe
              the birds or waves).
            </p>
          </Motion.div>
        </Motion.div>

        <Motion.div
          className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 lg:flex-row-reverse'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Motion.div
            className='lg:w-1/3 w-full max-w-xs'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <img
              src="/ts2_camp/surfdays_2.jpg"
              alt="Surf Day Image"
              loading="lazy"
              decoding="async"
              className='w-full h-40 lg:h-48 object-cover shadow-md'
            />
          </Motion.div>

          <Motion.div
            className='lg:w-2/3 w-full flex items-center flex-col text-center lg:text-left'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className='text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed text-justify lg:text-left'>
              Morning surf sessions are small-group and personalized, led by instructors who remember your name, your level,
              and your goals. You’ll paddle out at the right time and tide, and come back with sun on your skin and new
              skills in your soul.
            </p>
          </Motion.div>
        </Motion.div>

        <Motion.div
          className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 lg:flex-row'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Motion.div
            className='lg:w-1/3 w-full max-w-xs'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <img
              src="/ts2_camp/surfdays_3.jpg"
              alt="Surf Day Image"
              loading="lazy"
              decoding="async"
              className='w-full h-40 lg:h-48 object-cover shadow-md'
            />
          </Motion.div>

          <Motion.div
            className='lg:w-2/3 w-full flex items-center flex-col text-center lg:text-left'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className='text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed text-justify lg:text-left'>
              Afterward, grab your breakfast, relax in a hammock, journal on the terrace, or plan your free time.
              You can join an optional yoga session, visit Weligama town, or simply unwind in your room. Evenings
              are calm, with home-cooked dinners, light conversation, or reading under palm trees.
            </p>
          </Motion.div>
        </Motion.div>

        <Motion.div
          className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 lg:flex-row-reverse'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Motion.div
            className='lg:w-1/3 w-full max-w-xs'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <img
              src="/ts2_camp/surfdays_4.jpg"
              alt="Surf Day Image"
              loading="lazy"
              decoding="async"
              className='w-full h-40 lg:h-48 object-cover shadow-md'
            />
          </Motion.div>

          <Motion.div
            className='lg:w-2/3 w-full flex items-center flex-col text-center lg:text-left'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className='text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed text-justify lg:text-left'>
              TS2 is the kind of place where you get to reset. There’s always space to connect-but never
              pressure to socialize.
            </p>
          </Motion.div>
        </Motion.div>

      </div>
    </Motion.div>
  )
}

export default SurfDays
