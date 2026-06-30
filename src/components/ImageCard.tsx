'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type ImageCardProps = {
  image: string;
  title: string;
  subtitle?: string;
  link: string;
  index: number;
};

const ImageCard = ({ image, title, subtitle = '', link, index }: ImageCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative overflow-hidden shadow-2xl group cursor-pointer mb-10 w-full max-w-7xl mx-auto md:h-[500px]"
  >
    <a href={link} aria-label={title} className="block relative aspect-[16/9] md:h-[500px] md:aspect-auto">
      <Image
        src={`/${image}`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1248px"
        quality={70}
        className="object-cover transform transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl opacity-95 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </a>
  </motion.div>
);

export default ImageCard;