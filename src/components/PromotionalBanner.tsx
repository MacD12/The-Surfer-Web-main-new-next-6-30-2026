'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Star, Zap } from "lucide-react";

const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      // Check if user has already dismissed the popup
      const hasDismissed = localStorage.getItem('promoBannerDismissed');
      if (!hasDismissed) {
        setIsVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Remember user's choice for 24 hours
    // localStorage.setItem('promoBannerDismissed', 'true');
    setTimeout(() => {
    //   localStorage.removeItem('promoBannerDismissed');
    }, 24 * 60 * 60 * 1000); // 24 hours
  };

  const handleImageClick = () => {
    // You can redirect to booking page or scroll to booking section
    window.location.href = '/book-now';
    handleClose();
  };

  return (
     <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[5000] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all duration-200 p-2 rounded-full hover:scale-110 z-10 shadow-lg cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Promotional Image - Clickable */}
            <Image
              src="/banner.png"
              alt="Limited Time Offer - 10% Off from October 4th to 25th 2025"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={handleImageClick}
              onError={() => {
                console.error('Failed to load promotional banner image');
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionalBanner;