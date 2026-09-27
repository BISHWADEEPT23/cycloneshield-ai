export function calculateCompoundHazardIndex(
  windScore: number,
  surgeScore: number,
  rainfallScore: number,
  floodScore: number
): { chi: number; classification: string; primaryDriver: string } {
  // Weighted base combination
  const baseScore = (windScore * 0.25) + (surgeScore * 0.30) + (rainfallScore * 0.20) + (floodScore * 0.25);
  // Non-linear compound amplifier if 3 or more perils cross 70
  const highPerilsCount = [windScore, surgeScore, rainfallScore, floodScore].filter(s => s >= 70).length;
  const compoundBonus = highPerilsCount >= 3 ? 6.5 : highPerilsCount === 2 ? 3.0 : 0.0;
  const chi = Math.min(100, Math.round(baseScore + compoundBonus));

  let classification = 'MODERATE';
  if (chi >= 85) classification = 'EXTREME COMPOUND HAZARD';
  else if (chi >= 70) classification = 'HIGH COMPOUND HAZARD';
  else if (chi >= 50) classification = 'ELEVATED RISK';

  let primaryDriver = 'Storm Surge & Coastal Inundation';
  if (windScore > surgeScore && windScore > floodScore) primaryDriver = 'Extreme Cyclonic Winds';
  else if (floodScore > surgeScore) primaryDriver = 'Coincident Fluvial & Estuarine Inundation';

  return { chi, classification, primaryDriver };
}