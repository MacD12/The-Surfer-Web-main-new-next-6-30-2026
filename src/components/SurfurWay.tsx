import React from 'react';
import { Award, Users, Home, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const PillarCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    {/* Icon circle */}
    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
      <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
    </div>

    {/* Title */}
    <h3 className="text-gray-800 font-semibold text-sm mb-3 leading-tight">
      {title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
      {description}
    </p>
  </div>
);

export default function SurfurWay() {
  const pillars = [
    {
      icon: Award,
      title: "Community First",
      description: "We're more than a camp - we're a family."
    },
    {
      icon: Users,
      title: "Respect the Ocean",
      description: "We teach with mindfulness for nature and local culture."
    },
    {
      icon: Home,
      title: "Progress with Purpose",
      description: "Every level of surfers deserves coaching that moves them forward."
    },
    {
      icon: Globe,
      title: "Fun is Part of the Lesson",
      description: "We believe joy makes better surfers."
    }
  ];

  return (
    <motion.div className="bg-blue-400/50 py-10 mt-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              The Surfer Way
            </h2>
            <p className="text-gray-600 text-lg">
              4 Values You Could Highlight:
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="transform transition-transform duration-300 hover:scale-105">
                <PillarCard
                  icon={pillar.icon}
                  title={pillar.title}
                  description={pillar.description}
                />
              </div>
            ))}
          </div>
        </div>
    </motion.div>
  );
}