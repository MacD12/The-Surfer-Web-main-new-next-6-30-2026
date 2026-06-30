export type CampCountry = 'sri-lanka' | 'morocco';

export type Camp = {
  id: string;
  country: CampCountry;
  name: string;
  short: string;
  address: string;
  plusCode: string;
  position: [number, number];
  directionsUrl: string;
};

export const CAMPS: Camp[] = [
  {
    id: 'beach',
    country: 'sri-lanka',
    name: 'The Surfer Beach Camp',
    short: 'Beachfront flagship · rooftop & pool',
    address: 'No 65, Wadana Watta, Pelena, Weligama 81700, Sri Lanka',
    plusCode: 'XC9W+WQ Weligama',
    position: [5.9698228, 80.4468871],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.9698228%2C80.4468871&destination_place_id=ChIJ8T3AnVsVrjsR7EwuLk09pb8',
  },
  {
    id: 'ts2',
    country: 'sri-lanka',
    name: 'The Surfer TS2 Camp',
    short: 'Quieter rooms · 5-min ride to the Beach Camp',
    address: 'No 176/12, 3rd Lane, Paranakade, Weligama 81700, Sri Lanka',
    plusCode: 'XCCG+Q6 Weligama',
    position: [5.9719421, 80.4256101],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.9719421%2C80.4256101&destination_place_id=ChIJeSPsQDoVrjsRMCGCUUIDNZo',
  },
  {
    id: 'soul',
    country: 'sri-lanka',
    name: 'Soul Surfer Camp',
    short: 'Independent retreat · rooftop infinity pool',
    address: 'No 140/13, 3rd Lane, Paranakade, Weligama 81700, Sri Lanka',
    plusCode: 'XCCG+M9P Weligama',
    position: [5.971719, 80.425939],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.971719%2C80.425939',
  },
  {
    id: 'surfstyle',
    country: 'morocco',
    name: 'The Surfer SurfStyle Surf Camp',
    short: 'Atlantic point breaks · Tamraght cliffs',
    address: 'Tamraght, Agadir, Morocco',
    plusCode: 'G889+J8 Agadir',
    position: [30.5165125, -9.6817112],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=30.5165125%2C-9.6817112&destination_place_id=ChIJfYpk3UAwO9sRmceK1lKAem4',
  },
];

export const COUNTRY_THEME: Record<
  CampCountry,
  { gradient: string; tail: string; ring: string }
> = {
  'sri-lanka': {
    gradient: 'linear-gradient(135deg, #0a67b3, #0891b2)',
    tail: '#0891b2',
    ring: 'rgba(10, 103, 179, 0.35)',
  },
  morocco: {
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    tail: '#f59e0b',
    ring: 'rgba(217, 119, 6, 0.35)',
  },
};
