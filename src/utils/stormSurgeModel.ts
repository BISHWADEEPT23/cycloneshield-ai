export function calculateStormSurge(
  windSpeedKmh: number,
  centralPressureHpa: number,
  tideElevationMeters: number = 0.8,
  bathymetrySlopeFactor: number = 1.25
): { surgeMeters: number; totalWaterLevelMeters: number; severity: string } {
  const pressureDeficit = Math.max(0, 1013 - centralPressureHpa);
  const invertedBarometerSurgeMeters = (pressureDeficit * 0.01); // ~1cm per hPa
  const windStressMeters = Math.pow(windSpeedKmh / 100, 2) * 0.9 * bathymetrySlopeFactor;
  const surgeMeters = Number((invertedBarometerSurgeMeters + windStressMeters).toFixed(2));
  const totalWaterLevelMeters = Number((surgeMeters + tideElevationMeters).toFixed(2));
  
  let severity = 'MODERATE';
  if (totalWaterLevelMeters >= 2.5) severity = 'CATASTROPHIC';
  else if (totalWaterLevelMeters >= 1.8) severity = 'CRITICAL';
  else if (totalWaterLevelMeters >= 1.2) severity = 'HIGH';

  return { surgeMeters, totalWaterLevelMeters, severity };
}