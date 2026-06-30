'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ExternalLink, Compass } from 'lucide-react';

type Props = {
  campName: string;
  streetAddress: string;
  locality: string;
  region?: string;
  postalCode?: string;
  country: string;
  plusCode?: string;
  phone?: string;
  email?: string;
  googleMapsUrl: string;
};

/**
 * Visible NAP (Name, Address, Phone) block with schema.org microdata.
 * Mirrors LocalBusiness JSON-LD so the same facts appear in markup -
 * better for local-pack ranking signals and accessibility.
 */
const CampLocationCard = ({
  campName,
  streetAddress,
  locality,
  region,
  postalCode,
  country,
  plusCode,
  phone,
  email,
  googleMapsUrl,
}: Props) => {
  return (
    <motion.div
      className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-md p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      itemScope
      itemType="https://schema.org/LodgingBusiness"
    >
      <meta itemProp="name" content={campName} />
      <div className="flex items-start gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 shrink-0">
          <Compass className="w-4 h-4 text-white" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 mb-0.5">
            Visit Us
          </span>
          <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-900 leading-tight">
            {campName}
          </h3>
        </div>
      </div>

      <ul className="space-y-3.5">
        {/* Address */}
        <li
          className="flex items-start gap-3"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 ring-1 ring-cyan-100 text-cyan-700">
            <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
          <div className="min-w-0 text-sm leading-relaxed">
            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
              Address
            </span>
            <span className="block text-gray-700" itemProp="streetAddress">
              {streetAddress}
            </span>
            <span className="block text-gray-700">
              <span itemProp="addressLocality">{locality}</span>
              {region ? (
                <>
                  ,{' '}
                  <span itemProp="addressRegion">{region}</span>
                </>
              ) : null}
              {postalCode ? (
                <>
                  {' '}
                  <span itemProp="postalCode">{postalCode}</span>
                </>
              ) : null}
            </span>
            <span className="block text-gray-700" itemProp="addressCountry">
              {country}
            </span>
            {plusCode ? (
              <span className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-50 ring-1 ring-gray-200 text-[11px] font-mono font-semibold text-gray-700 tabular-nums">
                {plusCode}
              </span>
            ) : null}
          </div>
        </li>

        {/* Phone */}
        {phone ? (
          <li className="flex items-start gap-3">
            <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 ring-1 ring-cyan-100 text-cyan-700">
              <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 text-sm">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
                Phone
              </span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-gray-800 font-medium hover:text-cyan-700 transition-colors"
                itemProp="telephone"
              >
                {phone}
              </a>
            </div>
          </li>
        ) : null}

        {/* Email */}
        {email ? (
          <li className="flex items-start gap-3">
            <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 ring-1 ring-cyan-100 text-cyan-700">
              <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 text-sm">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-gray-800 font-medium hover:text-cyan-700 transition-colors break-all"
                itemProp="email"
              >
                {email}
              </a>
            </div>
          </li>
        ) : null}
      </ul>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        itemProp="hasMap"
        className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800 transition-colors"
      >
        Open in Google Maps
        <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
      </a>
    </motion.div>
  );
};

export default CampLocationCard;
