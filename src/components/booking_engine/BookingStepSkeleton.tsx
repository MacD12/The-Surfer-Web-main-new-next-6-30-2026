'use client';
import React from 'react';

/**
 * Lightweight placeholder shown while a booking-engine step's client bundle
 * downloads and mounts. All step pages use `dynamic(..., { ssr: false })`
 * because they read localStorage during initialization, so without this the
 * user sees a blank white screen for the duration of the JS download +
 * React mount on slow connections.
 *
 * Mirrors the BookingNavbar bar height (~64px) and shows a centered spinner
 * so the page never looks broken.
 */
const BookingStepSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <div className="h-16 sm:h-[68px] bg-white border-b border-gray-200 flex items-center px-4 sm:px-6">
      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
      <div className="ml-auto h-6 w-20 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
        <span className="text-xs text-gray-500 tracking-wide">Loading…</span>
      </div>
    </div>
  </div>
);

export default BookingStepSkeleton;
