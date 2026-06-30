'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type CampPin = {
  id: string;
  name: string;
  plusCode: string;
  position: LatLngTuple;
  directionsUrl: string;
};

const buildPinIcon = (index: number) =>
  L.divIcon({
    className: 'surfer-camp-pin',
    iconSize: [44, 56],
    iconAnchor: [22, 54],
    popupAnchor: [0, -48],
    html: `
      <div style="
        position:relative;
        width:44px;
        height:56px;
        filter: drop-shadow(0 6px 10px rgba(10, 103, 179, 0.35));
      ">
        <div style="
          width:44px;
          height:44px;
          border-radius:9999px;
          background:linear-gradient(135deg, #0a67b3, #0891b2);
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
          border-top:14px solid #0891b2;
        "></div>
      </div>
    `,
  });

const FitView = ({
  positions,
  singleZoom = 16,
}: {
  positions: LatLngTuple[];
  singleZoom?: number;
}) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], singleZoom);
    } else {
      map.fitBounds(positions as LatLngBoundsExpression, {
        padding: [40, 40],
        maxZoom: 16,
      });
    }
  }, [map, positions, singleZoom]);
  return null;
};

type Props = {
  camps: CampPin[];
};

const CampsMap = ({ camps }: Props) => {
  const positions = camps.map((c) => c.position);

  // Compute a sensible default center so the map can mount before FitView runs.
  const center: LatLngTuple = positions.length
    ? [
        positions.reduce((a, p) => a + p[0], 0) / positions.length,
        positions.reduce((a, p) => a + p[1], 0) / positions.length,
      ]
    : [5.9710, 80.4365];

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="rounded-3xl isolate"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {camps.map((camp, idx) => (
        <Marker
          key={camp.id}
          position={camp.position}
          icon={buildPinIcon(idx + 1)}
        >
          <Popup className="surfer-camp-popup">
            <div style={{ minWidth: 200 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#0e7490',
                marginBottom: 2,
              }}>
                Camp {String(idx + 1).padStart(2, '0')}
              </div>
              <div style={{
                fontFamily: 'var(--font-montserrat), Montserrat, system-ui, sans-serif',
                fontSize: 15,
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.2,
                marginBottom: 6,
              }}>
                {camp.name}
              </div>
              <div style={{
                fontSize: 11,
                color: '#6b7280',
                marginBottom: 10,
                letterSpacing: '0.04em',
              }}>
                {camp.plusCode}
              </div>
              <a
                href={camp.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 9999,
                  background: 'linear-gradient(135deg, #0a67b3, #0891b2)',
                  color: '#ffffff',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(10, 103, 179, 0.3)',
                }}
              >
                Get directions →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      <FitView positions={positions} />
    </MapContainer>
  );
};

export default CampsMap;
