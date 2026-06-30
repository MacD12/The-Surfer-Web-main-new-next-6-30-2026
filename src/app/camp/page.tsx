// camp/page.tsx - server-side wrapper that loads the client-only booking page.
// localStorage initializers in the booking flow can't safely run during SSR,
// so we lazy-load with ssr:false (which requires the wrapper to be 'use client').
'use client';
import dynamic from 'next/dynamic';

const CampClient = dynamic(() => import('./CampClient'), { ssr: false });

export default function Page() {
  return <CampClient />;
}
