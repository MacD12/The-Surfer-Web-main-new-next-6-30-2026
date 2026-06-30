'use client';
import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import SurfCampCard from "../../components/SurfCard";
import Difference from "./Difference";
import { useTranslation } from '@/lib/i18n-compat';

const ImageCard = () => {
  const { t } = useTranslation();

  // Static meta (non-translatable): images & links
  const meta = [
    { key: 'beach', pic: 'surfcard1.jpg', link: '/beach-camp' },
    { key: 'ts2',   pic: 'surfcard2.jpg', link: '/ts2-camp' },
    { key: 'wave',  pic: 'surfcard3.jpg', link: '/wave-camp' }
  ];

  // Pull localized text per card key
  const cards = meta.map((m) => ({
    pic: m.pic,
    link: m.link,
    topic: t(`camps.cards.${m.key}.topic`),
    body1: t(`camps.cards.${m.key}.body`),
  }));

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SurfCampCard
              pic={card.pic}
              topic={card.topic}
              body1={card.body1}
              body2={card.body2}  // keep if your card supports an optional second line
              link={card.link}
              index={index}
            />
          </motion.div>
        ))}
      </div>

      {/* Difference section stays as-is */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <Difference />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
