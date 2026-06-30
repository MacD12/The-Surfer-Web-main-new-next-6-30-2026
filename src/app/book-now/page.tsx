// book-now/page.tsx - server-side wrapper that loads the client-only booking page.
// localStorage initializers in the booking flow can't safely run during SSR,
// so we lazy-load with ssr:false (which requires the wrapper to be 'use client').
'use client';
import dynamic from 'next/dynamic';
import BookingStepSkeleton from '@/components/booking_engine/BookingStepSkeleton';

const BookNowClient = dynamic(() => import('./BookNowClient'), {
  ssr: false,
  loading: () => <BookingStepSkeleton />,
});

export default function Page() {
  return <BookNowClient />;
}
