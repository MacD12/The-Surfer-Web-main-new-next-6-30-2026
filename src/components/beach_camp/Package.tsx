'use client';
import CampRatesSection from '@/components/CampRatesSection';

/**
 * Beach Camp rates - rendered in the same format as the /rates page,
 * driven by the shared `beachPackages` i18n data.
 */
const Package = () => <CampRatesSection ns="beachPackages" />;

export default Package;
