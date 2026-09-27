export interface CycloneTrackPoint {
  timeOffsetHours: number;
  lat: number;
  lng: number;
  windKmh: number;
  pressureHpa: number;
  isForecast: boolean;
}

export function getTrackForecast(): CycloneTrackPoint[] {
  return [
    { timeOffsetHours: -12, lat: 18.20, lng: 88.40, windKmh: 110, pressureHpa: 984, isForecast: false },
    { timeOffsetHours: -6,  lat: 19.10, lng: 87.80, windKmh: 130, pressureHpa: 968, isForecast: false },
    { timeOffsetHours: 0,   lat: 19.85, lng: 87.25, windKmh: 142, pressureHpa: 958, isForecast: false },
    { timeOffsetHours: 3,   lat: 20.15, lng: 86.85, windKmh: 145, pressureHpa: 954, isForecast: true },
    { timeOffsetHours: 5.5, lat: 20.31, lng: 86.61, windKmh: 140, pressureHpa: 959, isForecast: true },
    { timeOffsetHours: 12,  lat: 20.70, lng: 86.10, windKmh: 95,  pressureHpa: 982, isForecast: true }
  ];
}