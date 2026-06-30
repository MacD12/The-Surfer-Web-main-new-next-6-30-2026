'use client';
import React from 'react'
import Image from 'next/image'
import { motion as Motion } from 'framer-motion'

const Packages = () => {
  const packages = [
    {
      id: 1,
      title: "Moderate Surf Lesson Package",
      subtitle: "Beginners, Level 01 / Expert 02 / Intermediate",
      des: "OR",
      description: "MODERATE SURF GUIDING",
      features: "Advanced Surfers",
      image: "/beach_camp/package_1.jpg",
      pricing: [
        { type: "MIXED DORMITORY BED - Max ( 05 people )", price: "350 €" },
        { type: "PRIVATE SINGLE ROOM Per Week", price: "600 €" },
        { type: "PRIVATE DOUBLE ROOM Per Person Per Week", price: "490 €" },
        { type: "PRIVATE TRIPLE ROOM Per Person Per Week", price: "450 €" }
      ],
      included: [
        "07 nights accommodation",
        "Breakfast Everyday",
        "Dinner - Everyday except Sunday",
        "Surf Theory Classes",
        "Video Analysis",
        "Daily Social Activities",
        "Surf Lessons - 06 surf lessons or guiding",
        "Yoga - 02 sessions Per week / day",
      ]
    },
    {
      id: 2,
      title: "Full Surf Lesson Package",
      subtitle: "Beginners, Level 01 / Expert 02 / Intermediate",
      des: "OR",
      description: "FULL SURF GUIDING PACKAGE",
      features: "Advanced Surfers",
      image: "/beach_camp/package_2.jpg",
      pricing: [
        { type: "MIXED DORMITORY BED - Max ( 05 people )", price: "450 €" },
        { type: "PRIVATE SINGLE ROOM Per Week", price: "700 €" },
        { type: "PRIVATE DOUBLE ROOM Per Person Per Week", price: "550 €" },
        { type: "PRIVATE TRIPLE ROOM Per Person Per Week", price: "500 €" }
      ],
      included: [
       "07 nights accommodation",
        "Breakfast Everyday",
        "Dinner - Everyday except Sunday",
        "Surf Theory Classes",
        "Video Analysis",
        "Daily Social Activities",
        "Surf Lessons - 11 surf lessons",
        "Yoga - 02 sessions Per week / day",
      ]
    },
    {
      id: 3,
      title: "Surf & Yoga Package",
      subtitle: "Surf Lessons",
      des: "OR",
      description: "Surf Guiding",
      features: "with Yoga",
      image: "/beach_camp/package_3.jpg",
      pricing: [
        { type: "MIXED DORMITORY BED - Max ( 05 people )", price: "400 €" },
        { type: "PRIVATE SINGLE ROOM Per Week", price: "650 €" },
        { type: "PRIVATE DOUBLE ROOM Per Person Per Week", price: "520 €" },
        { type: "PRIVATE TRIPLE ROOM Per Person Per Week", price: "490 €" }
      ],
      included: [
        "07 nights accommodation",
        "Breakfast Everyday",
        "Dinner - Everyday except Sunday",
        "Surf Theory Classes",
        "Video Analysis",
        "Daily Social Activities",
        "Surf Lessons - 06 surf lessons or guiding Per week / day",
        "Yoga - sunrise or sunset everyday",
      ]
    }
  ]

  return (
    <Motion.div 
      className='flex flex-col items-center justify-center container mx-auto w-full overflow-hidden mt-12 px-4'
      id='Packages'
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
        Book Your Surf Experience
      </Motion.h1>

      <div className='w-full max-w-4xl space-y-12'>
        {packages.map((pkg, index) => (
          <Motion.div
            key={pkg.id}
            className='flex flex-col bg-white/90 shadow-md overflow-hidden border border-gray-100'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className='flex flex-col lg:flex-row items-start gap-6'>
              <Motion.div 
                className='lg:w-1/3 w-full'
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  width={1200}
                  height={800}
                  className='w-full h-56 lg:h-72 object-cover'
                />
              </Motion.div>

              <Motion.div 
                className='lg:w-2/3 w-full p-4 lg:p-6'
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Motion.div 
                  className='mb-4'
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <h2 className='text-lg lg:text-xl font-bold text-neutral-700 mb-2'>
                    {pkg.title}
                  </h2>
                  <p className='text-xs sm:text-sm text-neutral-500 mb-1'>{pkg.subtitle}</p>
                  <p className='text-xs sm:text-sm font-medium text-neutral-600 mb-1'>{pkg.des}</p>
                  <p className='text-xs sm:text-sm font-medium text-neutral-600 mb-1'>{pkg.description}</p>
                  <p className='text-xs sm:text-sm text-neutral-500'>{pkg.features}</p>
                </Motion.div>

                <Motion.div 
                  className='mb-4'
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className='space-y-2'>
                    {pkg.pricing.map((price, priceIndex) => (
                      <Motion.div 
                        key={priceIndex} 
                        className='flex justify-between items-center py-1 border-b border-neutral-100 last:border-b-0'
                        whileHover={{ x: 2, transition: { duration: 0.1 } }}
                      >
                        <p className='text-xs sm:text-sm text-neutral-600'>{price.type}</p>
                        <p className='text-sm sm:text-base font-bold text-neutral-700'>{price.price}</p>
                      </Motion.div>
                    ))}
                  </div>
                </Motion.div>
              </Motion.div>
            </div>

            <hr className='border-t border-neutral-300 mx-4 lg:mx-6' />

            <Motion.div
              className='w-full px-4 lg:px-6 pb-4 pt-4 lg:pb-6'
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.07 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className='text-sm sm:text-base font-semibold text-neutral-700 mb-4 text-center'>
                Following Included in the package
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2'>
                {pkg.included.map((item, itemIndex) => (
                  <Motion.div 
                    key={itemIndex} 
                    className='flex items-start'
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: (index * 0.03) + (itemIndex * 0.01) }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <span className='text-neutral-600 mr-2 mt-1 text-xs'>•</span>
                    <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed'>{item}</p>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          </Motion.div>
        ))}
      </div>
    </Motion.div>
  )
}

export default Packages
