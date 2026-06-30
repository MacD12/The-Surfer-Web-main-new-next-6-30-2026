'use client';
import React, { useState } from "react";
import { motion as Motion } from "framer-motion";

const RoomImageSlider = ({ images, altText, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  if (!images || images.length <= 1) {
    return (
      <img
        src={images?.[0] || "/beach_camp/room_1.jpg"}
        alt={altText}
        className={className}
      />
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden">
      {images.map((image, idx) => (
        <Motion.img
          key={idx}
          src={image}
          alt={`${altText} - Image ${idx + 1}`}
          className={`absolute inset-0 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: idx === currentImageIndex ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      ))}

      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-1 rounded-full transition-all duration-300 z-20 cursor-pointer hover:bg-gray-400"
        aria-label="Previous image"
      >
        <svg className="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-1 rounded-full transition-all duration-300 z-20 cursor-pointer hover:bg-gray-400"
        aria-label="Next image"
      >
        <svg className="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goToImage(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentImageIndex
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomImageSlider;