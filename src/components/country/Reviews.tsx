'use client';
import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useTranslation } from '@/lib/i18n-compat';

const QuoteIcon = ({ className = '' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36 1 24.832 4.32 28 8.32 28c3.776 0 6.56-3.04 6.56-6.624 0-3.584-2.496-6.208-5.76-6.208-.64 0-1.504.128-1.728.224.576-3.872 4.224-8.448 7.872-10.72L9.352 4zm18.4 0c-4.832 3.456-8.288 9.12-8.288 15.36 0 5.472 3.328 8.64 7.328 8.64 3.776 0 6.56-3.04 6.56-6.624 0-3.584-2.496-6.208-5.76-6.208-.64 0-1.472.128-1.696.224.576-3.872 4.192-8.448 7.84-10.72L27.752 4z" />
  </svg>
);

const ReviewsCard = ({ img, name, date, description, lang, idx }) => {
  const formattedDate = new Date(date).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className='relative w-full md:w-1/3 bg-white rounded-2xl ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300 p-6'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Decorative quote mark */}
      <QuoteIcon className="absolute top-4 right-5 w-8 h-8 text-cyan-100" />

      <div className='flex items-center gap-3'>
        <motion.img
          className='rounded-full w-14 h-14 object-cover shadow-md ring-2 ring-cyan-100'
          src={img}
          alt={`${name} avatar`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className='flex flex-col'>
          <h3 className='font-bold text-gray-800 text-base tracking-tight leading-tight'>
            {name}
          </h3>
          <p className='text-gray-400 text-xs font-medium mt-0.5'>
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Star row */}
      <div role="img" className='flex items-center gap-0.5 mt-3' aria-label="5 out of 5 stars">
        {[0, 1, 2, 3, 4].map((s) => (
          <svg key={s} className='w-4 h-4 text-amber-400' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.374-2.452a1 1 0 00-1.175 0l-3.374 2.452c-.785.57-1.84-.197-1.54-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.965z' />
          </svg>
        ))}
      </div>

      <p className='text-sm sm:text-[15px] text-gray-600 leading-relaxed mt-4'>
        {description}
      </p>
    </motion.div>
  );
};

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const reviewsData = t('reviews.items', { returnObjects: true }) || [];
  const title = t('reviews.title');

  return (
    <div className='py-14 sm:py-16 flex flex-col items-center justify-center px-4 sm:px-6 bg-gradient-to-b from-white via-cyan-50/30 to-white'>
      <motion.h2
        className='font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 text-center'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className='mt-4 sm:mt-5 mb-10 sm:mb-12 flex justify-center'
      >
        <span className='block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]' />
      </motion.div>

      <div className='flex flex-col md:flex-row gap-5 sm:gap-6 max-w-6xl mx-auto w-full'>
        {reviewsData.map((review, idx) => (
          <ReviewsCard
            key={idx}
            idx={idx}
            img={review.img}
            name={review.name}
            date={review.date}
            description={review.description}
            lang={i18n.language}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
