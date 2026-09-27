export type IntensityClassification =
  | 'Depression'
  | 'Deep Depression'
  | 'Cyclonic Storm'
  | 'Severe Cyclonic Storm'
  | 'Very Severe Cyclonic Storm'
  | 'Extremely Severe Cyclonic Storm'
  | 'Super Cyclonic Storm';

export interface ForecastPoint {
  label: string;
  hoursFromNow: number;
  lat: number;
  lng: number;
  maxWindSpeedKmh: number;
  centralPressureHpa: number;
  intensityClassification: IntensityClassification;
  movementDirection: string;
  movementSpeedKmh: number;
  forecastUncertaintyKm: number;
}

export interface Cyclone {
  id: string;
  name: string;
  basin: string;
  status: 'ACTIVE' | 'DISSIPATED';
  classification: IntensityClassification;
  currentWindSpeedKmh: number;
  centralPressureHpa: number;
  movementDirection: string;
  forwardSpeedKmh: number;
  landfallETA: string;
  landfallETAHours: number;
  overallRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE' | 'EXTREME';
}

export interface LocationRisk {
  name: string;
  region: string;
  lat: number;
  lng: number;
  isCoastal: boolean;
  elevationMeters: number;
  distanceToCoastKm: number;
}
