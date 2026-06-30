'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PackageCard = ({ image, title, subtitle, description, features, index }) => {
  return (
    <motion.div 
      className="bg-white shadow-lg overflow-hidden mb-4 sm:mb-6 md:mb-8 w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto transform transition-all duration-500 hover:scale-102 hover:shadow-xl border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="flex flex-col lg:flex-row">
        <motion.div 
          className="w-full lg:w-2/5 relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={image}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
        
        <div className="w-full lg:w-4/5 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-gray-50 to-white">
          <motion.div 
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 leading-tight">
              {title}
            </h3>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wide">{subtitle}</p>
              {description && (
                <p className="text-xs sm:text-sm text-gray-500 italic">{description}</p>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-4 sm:mb-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 border-b border-cyan-200 pb-1">
              Following Included in the package
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {features.map((feature, featureIndex) => (
                <motion.li 
                  key={featureIndex} 
                  className="text-xs sm:text-sm text-gray-700 flex items-start py-1 px-2 hover:bg-cyan-50 transition-colors duration-200"
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.2 + 0.3 + featureIndex * 0.05 
                  }}
                  viewport={{ once: true }}
                >
                  <span className="text-cyan-500 mr-2 font-bold text-sm sm:text-base">•</span>
                  <span className="leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
            viewport={{ once: true }}
          >
            <button className="group border-2 border-cyan-500 hover:border-cyan-600 text-cyan-500 hover:text-cyan-600 px-4 sm:px-6 py-2 font-bold text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 w-full sm:w-auto">
              <span className="relative z-10">BOOK NOW</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SurfLessonPackages = () => {
  const packages = [
    {
      image: "/pkg1.jpg",
      title: "Moderate Surf Lesson Package",
      subtitle: "Beginners, Level 01 / Level 02 / Intermediate",
      description: "OR MODERATE SURF GUIDING Advanced",
      features: [
        "07 nights accommodation",
        "06 surf lessons or guiding sessions",
        "Surf Theory",
        "Everyday Breakfast",
        "Dinner - Everyday except Sunday",
        "02 Complimentary Yoga Sessions",
        "Free Transport To Different Surf Spots",
        "Free Use Of Surf Boards During Surf Sessions",
        "Small Groups Surf Teaching 6ppl Max per Group",
        "Daily Social Fun Activities"
      ]
    },
    {
      image: "/pkg2.jpg",
      title: "Full Surf Lesson Package",
      subtitle: "Beginners, Level 01 / Level 02 / Intermediate",
      description: "OR FULL SURF GUIDING PACKAGE Advanced Surfers",
      features: [
        "07 nights accommodation",
        "11 surf lessons or guiding sessions",
        "Surf Theory",
        "Everyday Breakfast",
        "Dinner - Everyday except Sunday",
        "02 Complimentary Yoga Sessions",
        "Free Transport To Different Surf Spots",
        "Free Use Of Surf Boards During Surf Sessions",
        "Small Groups Surf Teaching 6ppl Max per Group",
        "Daily Social Fun Activities"
      ]
    },
    {
      image: "/pkg3.jpg",
      title: "Surf and Yoga Package",
      subtitle: "Surf Lessons OR Surf Guiding with Yoga",
      description: "",
      features: [
        "07 nights accommodation",
        "Morning or evening everyday yoga",
        "06 surf lessons or guiding sessions",
        "Surf Theory",
        "Everyday Breakfast",
        "Dinner - Everyday except Sunday",
        "Free Transport To Different Surf Spots",
        "Free Use Of Surf Boards During Surf Sessions",
        "Small Groups Surf Teaching 6ppl Max per Group",
        "Daily Social Fun Activities"
      ]
    }
  ];

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-cyan-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {packages.map((pkg, index) => (
            <PackageCard
              key={index}
              index={index}
              image={pkg.image}
              title={pkg.title}
              subtitle={pkg.subtitle}
              description={pkg.description}
              features={pkg.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurfLessonPackages;