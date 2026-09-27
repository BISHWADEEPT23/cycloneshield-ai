import { Cyclone, ForecastPoint } from '../types';

export const activeCyclone: Cyclone = {
  id: 'VARUNA-2026',
  name: 'VARUNA',
  basin: 'Bay of Bengal',
  status: 'ACTIVE',
  classification: 'Severe Cyclonic Storm',
  currentWindSpeedKmh: 142,
  centralPressureHpa: 972,
  movementDirection: 'NW (315°)',
  forwardSpeedKmh: 14,
  landfallETA: 'T+18 Hours (14:00 UTC)',
  landfallETAHours: 18,
  overallRiskLevel: 'SEVERE'
};

export const mockForecastPoints: ForecastPoint[] = [
  {
    label: 'CURRENT',
    hoursFromNow: 0,
    lat: 15.65,
    lng: 83.85,
    maxWindSpeedKmh: 142,
    centralPressureHpa: 972,
    intensityClassification: 'Severe Cyclonic Storm',
    movementDirection: 'NW',
    movementSpeedKmh: 14,
    forecastUncertaintyKm: 15
  },
  {
    label: '+6H',
    hoursFromNow: 6,
    lat: 16.10,
    lng: 83.30,
    maxWindSpeedKmh: 148,
    centralPressureHpa: 968,
    intensityClassification: 'Severe Cyclonic Storm',
    movementDirection: 'NW',
    movementSpeedKmh: 14,
    forecastUncertaintyKm: 25
  },
  {
    label: '+12H',
    hoursFromNow: 12,
    lat: 16.55,
    lng: 82.75,
    maxWindSpeedKmh: 152,
    centralPressureHpa: 964,
    intensityClassification: 'Very Severe Cyclonic Storm',
    movementDirection: 'NW',
    movementSpeedKmh: 14,
    forecastUncertaintyKm: 35
  },
  {
    label: '+18H (Landfall)',
    hoursFromNow: 18,
    lat: 16.98,
    lng: 82.24,
    maxWindSpeedKmh: 154,
    centralPressureHpa: 962,
    intensityClassification: 'Very Severe Cyclonic Storm',
    movementDirection: 'NW',
    movementSpeedKmh: 13,
    forecastUncertaintyKm: 45
  },
  {
    label: '+24H',
    hoursFromNow: 24,
    lat: 17.35,
    lng: 81.80,
    maxWindSpeedKmh: 110,
    centralPressureHpa: 980,
    intensityClassification: 'Severe Cyclonic Storm',
    movementDirection: 'NNW',
    movementSpeedKmh: 12,
    forecastUncertaintyKm: 60
  },
  {
    label: '+36H',
    hoursFromNow: 36,
    lat: 17.90,
    lng: 81.25,
    maxWindSpeedKmh: 75,
    centralPressureHpa: 994,
    intensityClassification: 'Cyclonic Storm',
    movementDirection: 'N',
    movementSpeedKmh: 10,
    forecastUncertaintyKm: 85
  },
  {
    label: '+48H',
    hoursFromNow: 48,
    lat: 18.40,
    lng: 80.85,
    maxWindSpeedKmh: 45,
    centralPressureHpa: 1002,
    intensityClassification: 'Deep Depression',
    movementDirection: 'N',
    movementSpeedKmh: 8,
    forecastUncertaintyKm: 110
  }
];
