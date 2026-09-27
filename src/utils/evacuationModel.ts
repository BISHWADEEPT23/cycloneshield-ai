export function calculateEvacuationWindow(
  distanceKm: number,
  trafficDensityFactor: number = 1.6,
  inundationRisk: number = 80,
  cycloneLeadTimeHours: number = 5.5
): { safeWindowHours: number; status: 'CRITICAL_WINDOW' | 'CAUTION' | 'ADEQUATE' } {
  const transitHours = (distanceKm / 20) * trafficDensityFactor;
  const safetyBufferHours = 1.0 + (inundationRisk / 100);
  const totalRequiredHours = Number((transitHours + safetyBufferHours).toFixed(1));
  const safeWindowHours = Number(Math.max(0.5, cycloneLeadTimeHours - totalRequiredHours).toFixed(1));

  let status: 'CRITICAL_WINDOW' | 'CAUTION' | 'ADEQUATE' = 'ADEQUATE';
  if (safeWindowHours <= 2.0) status = 'CRITICAL_WINDOW';
  else if (safeWindowHours <= 4.5) status = 'CAUTION';

  return { safeWindowHours, status };
}