// src/components/CookieBannerWrapper.tsx
//
// Loads the cookie banner client-only. The banner reads localStorage which
// doesn't exist on the server. Next.js 15+ requires a Client Component to
// pass { ssr: false } to next/dynamic, so this wrapper itself is 'use client'.
'use client';

import dynamic from 'next/dynamic';

const CookieBanner = dynamic(() => import('./CookieBanner'), { ssr: false });

export default CookieBanner;
