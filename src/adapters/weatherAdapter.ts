export interface WeatherStationReading {
  stationId: string;
  name: string;
  windSpeedKmh: number;
  gustSpeedKmh: number;
  barometricHpa: number;
  precipitationAccumMm: number;
}

export function fetchStationReadings(): WeatherStationReading[] {
  return [
    { stationId: 'AWS-PDP-01', name: 'Paradip Port Weather Station', windSpeedKmh: 142, gustSpeedKmh: 154, barometricHpa: 962.1, precipitationAccumMm: 248.5 },
    { stationId: 'AWS-KEN-02', name: 'Kendrapara Agro-Met Station', windSpeedKmh: 118, gustSpeedKmh: 132, barometricHpa: 978.4, precipitationAccumMm: 194.0 },
    { stationId: 'AWS-ERS-03', name: 'Ersama Coastal Observation Post', windSpeedKmh: 138, gustSpeedKmh: 151, barometricHpa: 965.8, precipitationAccumMm: 268.0 }
  ];
}