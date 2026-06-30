'use client';

import React, { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CAMPS, COUNTRY_THEME, type CampCountry } from './camps';

const TILE_LAYERS = {
  roadmap: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
  },
};

const buildPinIcon = (
  index: number,
  country: CampCountry,
  active: boolean,
) => {
  const theme = COUNTRY_THEME[country];
  const scale = active ? 1.15 : 1;
  const glow = active
    ? `0 0 0 6px ${theme.ring}, 0 8px 18px rgba(0,0,0,0.18)`
    : `0 6px 12px rgba(0,0,0,0.18)`;
  return L.divIcon({
    className: 'surfer-camp-pin',
    iconSize: [44, 56],
    iconAnchor: [22, 54],
    popupAnchor: [0, -50],
    html: `
      <div style="
        position:relative;
        width:44px;
        height:56px;
        transform: scale(${scale});
        transform-origin: 50% 100%;
        transition: transform 0.25s ease;
      ">
        <div style="
          width:44px;
          height:44px;
          border-radius:9999px;
          background:${theme.gradient};
          border:3px solid #ffffff;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#ffffff;
          font-family: var(--font-montserrat), 'Montserrat', system-ui, sans-serif;
          font-weight:800;
          font-size:13px;
          letter-spacing:0.04em;
          line-height:1;
          box-shadow: ${glow};
        ">
          ${String(index).padStart(2, '0')}
        </div>
        <div style="
          position:absolute;
          left:50%;
          top:38px;
          transform:translateX(-50%);
          width:0;
          height:0;
          border-left:7px solid transparent;
          border-right:7px solid transparent;
          border-top:14px solid ${theme.tail};
        "></div>
      </div>
    `,
  });
};

const FlyController = ({
  target,
  allPositions,
}: {
  target: LatLngTuple | null;
  allPositions: LatLngTuple[];
}) => {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, 17, { duration: 1.1 });
    } else if (allPositions.length > 1) {
      map.flyToBounds(allPositions, {
        duration: 1.0,
        padding: [40, 40],
        maxZoom: 13,
      });
    } else if (allPositions.length === 1) {
      map.flyTo(allPositions[0], 14, { duration: 1.0 });
    }
  }, [target, allPositions, map]);
  return null;
};

type Props = {
  mapType: 'roadmap' | 'satellite';
  activeCampId?: string | null;
  onActiveCampChange?: (id: string | null) => void;
};

export default function LeafletMap({
  mapType,
  activeCampId,
  onActiveCampChange,
}: Props) {
  const positions = useMemo(() => CAMPS.map((c) => c.position), []);

  // Sensible initial center across all camps (Sri Lanka & Morocco are far apart,
  // so flyToBounds will adjust to fit on mount via FlyController).
  const center = useMemo<LatLngTuple>(() => {
    const lat =
      positions.reduce((s, p) => s + p[0], 0) / positions.length;
    const lng =
      positions.reduce((s, p) => s + p[1], 0) / positions.length;
    return [lat, lng];
  }, [positions]);

  const activeCamp =
    CAMPS.find((c) => c.id === activeCampId) || null;
  const target: LatLngTuple | null = activeCamp
    ? activeCamp.position
    : null;

  const layer = TILE_LAYERS[mapType];

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
      className="isolate"
    >
      <TileLayer
        key={mapType}
        url={layer.url}
        attribution={layer.attribution}
        maxZoom={19}
      />
      {CAMPS.map((c, i) => (
        <Marker
          key={c.id}
          position={c.position}
          icon={buildPinIcon(i + 1, c.country, c.id === activeCampId)}
          eventHandlers={{
            click: () => onActiveCampChange?.(c.id),
          }}
        >
          <Popup className="surfer-camp-popup">
            <div style={{ minWidth: 210 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color:
                    c.country === 'sri-lanka' ? '#0e7490' : '#b45309',
                  marginBottom: 2,
                }}
              >
                {c.country === 'sri-lanka' ? 'Sri Lanka' : 'Morocco'} · Camp {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily:
                    'var(--font-montserrat), Montserrat, system-ui, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#6b7280',
                  marginBottom: 6,
                }}
              >
                {c.address}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                {c.plusCode}
              </div>
              <a
                href={c.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 9999,
                  background: COUNTRY_THEME[c.country].gradient,
                  color: '#ffffff',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: `0 4px 10px ${COUNTRY_THEME[c.country].ring}`,
                }}
              >
                Get directions →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      <FlyController target={target} allPositions={positions} />
    </MapContainer>
  );
}
