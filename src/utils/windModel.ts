export function calculateHollandWind(
  distanceKm: number,
  centralPressureHpa: number,
  ambientPressureHpa: number = 1013,
  radiusMaxWindKm: number = 32,
  hollandB: number = 1.35
): { sustainedKmh: number; gustKmh: number } {
  if (distanceKm <= 0) distanceKm = 1;
  const deltaP = (ambientPressureHpa - centralPressureHpa) * 100; // Pa
  const density = 1.15; // kg/m3
  const rRatio = radiusMaxWindKm / distanceKm;
  const term1 = hollandB * (deltaP / density);
  const term2 = Math.pow(rRatio, hollandB);
  const term3 = Math.exp(-Math.pow(rRatio, hollandB));
  const vMs = Math.sqrt(Math.max(0, term1 * term2 * term3));
  const sustainedKmh = Math.round(vMs * 3.6);
  const gustKmh = Math.round(sustainedKmh * 1.25);
  return { sustainedKmh, gustKmh };
}