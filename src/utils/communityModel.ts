import { CommunityZone, CommunityVulnerabilityAssessment } from '../types/community';

export function evaluateCommunityVulnerability(
  zone: CommunityZone,
  chi: number
): CommunityVulnerabilityAssessment {
  const exposureScore = Math.min(100, Math.round(chi * (1.0 - Math.min(0.5, zone.coastalDistanceKm / 10))));
  const sensitivityScore = Math.round((zone.kutchaHousingRatio * 50) + (zone.povertyRate * 30) + ((zone.vulnerablePopulation / zone.totalPopulation) * 20));
  const adaptiveCapacityScore = Math.max(10, Math.round((zone.shelterCapacityWithin5km / Math.max(100, zone.totalPopulation)) * 100));
  
  const cvi = Math.min(100, Math.round((exposureScore * 0.45) + (sensitivityScore * 0.45) - (adaptiveCapacityScore * 0.10) + 10));
  const evacuationPriority = Math.min(100, Math.round((cvi * 0.7) + (exposureScore * 0.3)));
  
  let evacuationUrgency: 'immediate' | 'urgent' | 'monitored' | 'low' = 'low';
  if (evacuationPriority >= 80) evacuationUrgency = 'immediate';
  else if (evacuationPriority >= 65) evacuationUrgency = 'urgent';
  else if (evacuationPriority >= 45) evacuationUrgency = 'monitored';

  const shelterDeficit = Math.max(0, Math.round((zone.vulnerablePopulation * 1.1) - zone.shelterCapacityWithin5km));

  return {
    zoneId: zone.id,
    zoneName: zone.name,
    cviScore: cvi,
    exposureScore,
    sensitivityScore,
    adaptiveCapacityScore,
    evacuationPriority,
    evacuationUrgency,
    shelterDeficit
  };
}