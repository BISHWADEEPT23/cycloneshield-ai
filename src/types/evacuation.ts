export interface EvacuationRoute {
  id: string;
  name: string;
  originZoneId: string;
  destinationShelterId: string;
  distanceKm: number;
  laneCount: number;
  capacityVehiclesPerHour: number;
  inundationRiskScore: number; // 0-100
  status: 'clear' | 'congested' | 'flooded' | 'compromised';
  estimatedClearanceHours: number;
  criticalWaypoints: Array<{ lat: number; lng: number; name: string }>;
}

export interface EvacuationPlan {
  zoneId: string;
  zoneName: string;
  recommendedWindowHours: number;
  safeWindowCloseTime: string;
  suggestedRoutes: string[];
  allocatedShelters: Array<{ name: string; capacity: number; assigned: number }>;
  priorityLevel: 'MANDATORY' | 'RECOMMENDED' | 'VOLUNTARY';
}