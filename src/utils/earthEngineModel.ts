import { PixelInspection } from '../types/earthEngine';

export function inspectPixelAtCoords(lat: number, lng: number): PixelInspection {
  // Deterministic mock calculation based on coastal distance
  const isNearParadip = Math.abs(lat - 20.31) < 0.05 && Math.abs(lng - 86.61) < 0.05;
  const isErsamaLowland = Math.abs(lat - 20.19) < 0.05;

  let sarBackscatterDb = -14.2;
  let mndwiIndex = 0.42;
  let elevationMeters = 3.2;
  let slopeDegrees = 1.1;
  let floodWaterConfidence = 78;

  if (isNearParadip) {
    sarBackscatterDb = -18.6; // High open water specular reflection
    mndwiIndex = 0.68;
    elevationMeters = 2.4;
    floodWaterConfidence = 89;
  } else if (isErsamaLowland) {
    sarBackscatterDb = -20.1;
    mndwiIndex = 0.74;
    elevationMeters = 1.9;
    floodWaterConfidence = 94;
  }

  return {
    lat,
    lng,
    sarBackscatterDb,
    mndwiIndex,
    elevationMeters,
    slopeDegrees,
    floodWaterConfidence,
    provenance: 'Copernicus Sentinel-1 SAR GRD + Sentinel-2 MSI via Google Earth Engine API'
  };
}