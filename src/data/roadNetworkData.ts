import { EvacuationRoute } from '../types/evacuation';

export const EVACUATION_ROUTES: EvacuationRoute[] = [
  {
    id: 'ROUTE-01',
    name: 'SH-12 Inland Express (Paradip -> Kujang Higher Ground)',
    originZoneId: 'ZONE-A1',
    destinationShelterId: 'SHELTER-KUJANG-CENTRAL',
    distanceKm: 24.2,
    laneCount: 4,
    capacityVehiclesPerHour: 1800,
    inundationRiskScore: 42,
    status: 'clear',
    estimatedClearanceHours: 3.8,
    criticalWaypoints: [
      { lat: 20.310, lng: 86.600, name: 'Port Toll Plaza' },
      { lat: 20.335, lng: 86.550, name: 'Mahanadi Causeway' },
      { lat: 20.350, lng: 86.480, name: 'Kujang Relief Node' }
    ]
  },
  {
    id: 'ROUTE-02',
    name: 'Coastal Canal Dyke Road (Ersama -> Balikuda High School)',
    originZoneId: 'ZONE-A2',
    destinationShelterId: 'SHELTER-BALIKUDA-01',
    distanceKm: 18.5,
    laneCount: 2,
    capacityVehiclesPerHour: 650,
    inundationRiskScore: 84,
    status: 'compromised',
    estimatedClearanceHours: 6.2,
    criticalWaypoints: [
      { lat: 20.180, lng: 86.570, name: 'Ersama Culvert #4' },
      { lat: 20.210, lng: 86.520, name: 'Low Inundation Dip' },
      { lat: 20.240, lng: 86.450, name: 'Balikuda Safe Haven' }
    ]
  }
];