'use client';
import CampRatesSection from '@/components/CampRatesSection';

/**
 * TS2 Camp rates - rendered in the same format as the /rates page,
 * driven by the shared `ts2Packages` i18n data.
 */
const Package = () => <CampRatesSection ns="ts2Packages" />;

export default Package;
