export interface CoastalLocation {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  elevation: number;
  distanceToCoastKm: number;
}

export const COASTAL_LOCATIONS: CoastalLocation[] = [
  { id: 'LOC-01', name: 'Paradip Port Town', district: 'Jagatsinghpur', lat: 20.316, lng: 86.611, elevation: 3.2, distanceToCoastKm: 0.8 },
  { id: 'LOC-02', name: 'Kendrapara Delta Lowlands', district: 'Kendrapara', lat: 20.501, lng: 86.422, elevation: 4.1, distanceToCoastKm: 12.0 },
  { id: 'LOC-03', name: 'Ersama Coastal Belt', district: 'Jagatsinghpur', lat: 20.183, lng: 86.583, elevation: 2.1, distanceToCoastKm: 1.5 },
  { id: 'LOC-04', name: 'Dhamra Port Sector', district: 'Bhadrak', lat: 20.796, lng: 86.953, elevation: 4.5, distanceToCoastKm: 2.2 },
  { id: 'LOC-05', name: 'Astaranga Fishing Harbour', district: 'Puri', lat: 19.982, lng: 86.265, elevation: 2.8, distanceToCoastKm: 0.5 },
  { id: 'LOC-06', name: 'Chandbali Riverine Reach', district: 'Bhadrak', lat: 20.781, lng: 86.744, elevation: 5.0, distanceToCoastKm: 18.0 }
];