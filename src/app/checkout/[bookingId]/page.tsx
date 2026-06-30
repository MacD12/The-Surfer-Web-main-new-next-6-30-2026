// checkout/[bookingId]/page.tsx
import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';
import { use } from 'react';

export default function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = use(params);
  
  return (
    <Suspense fallback={<BookingStepSkeleton />}>
      <CheckoutClient bookingId={bookingId} />
    </Suspense>
  );
}

function BookingStepSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0a67b3] to-cyan-500 shadow-lg shadow-cyan-500/30">
          <div className="w-7 h-7 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
        <div className="text-lg font-semibold text-slate-800">Loading checkout…</div>
        <div className="text-sm text-slate-500 mt-1">Preparing your payment</div>
      </div>
    </div>
  );
}