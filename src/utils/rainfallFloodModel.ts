export function calculateInundationDepth(
  rainfall24hMm: number,
  elevationMeters: number,
  soilSaturationIndex: number = 0.85,
  hasSarWetnessConfirmation: boolean = true
): { floodDepthMeters: number; floodScore: number } {
  const runoffFactor = 0.65 + (soilSaturationIndex * 0.25);
  const effectiveRainMm = rainfall24hMm * runoffFactor;
  const terrainAccumulation = Math.max(0.1, 5.0 - elevationMeters);
  let depth = (effectiveRainMm / 1000) * (terrainAccumulation * 0.8);
  if (hasSarWetnessConfirmation) depth *= 1.15; // +15% SAR empirical calibration
  depth = Number(Math.max(0, depth).toFixed(2));
  const floodScore = Math.min(100, Math.round((depth / 2.0) * 100));
  return { floodDepthMeters: depth, floodScore };
}