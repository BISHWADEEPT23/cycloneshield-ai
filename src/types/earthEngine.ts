export interface GEEProductLayer {
  id: string;
  name: string;
  satellite: 'Sentinel-1 SAR' | 'Sentinel-2 MSI' | 'Landsat-8/9' | 'SRTM DEM';
  band: string;
  resolution: string;
  acquisitionDate: string;
  cloudCoverPercent: number;
  colorPalette: string[];
  metricDescription: string;
}

export interface PixelInspection {
  lat: number;
  lng: number;
  sarBackscatterDb: number;
  mndwiIndex: number;
  elevationMeters: number;
  slopeDegrees: number;
  floodWaterConfidence: number; // 0-100%
  provenance: string;
}