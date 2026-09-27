export interface CommunityZone {
  id: string;
  name: string;
  district: string;
  totalPopulation: number;
  vulnerablePopulation: number; // elderly, children, disabled
  kutchaHousingRatio: number; // 0.0 - 1.0
  povertyRate: number; // 0.0 - 1.0
  coastalDistanceKm: number;
  meanElevationMeters: number;
  shelterCapacityWithin5km: number;
  lat: number;
  lng: number;
}

export interface CommunityVulnerabilityAssessment {
  zoneId: string;
  zoneName: string;
  cviScore: number; // Community Vulnerability Index 0-100
  exposureScore: number;
  sensitivityScore: number;
  adaptiveCapacityScore: number;
  evacuationPriority: number; // 0-100
  evacuationUrgency: 'immediate' | 'urgent' | 'monitored' | 'low';
  shelterDeficit: number; // deficit in beds
}