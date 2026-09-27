export type InfrastructureCategory = 'energy' | 'water' | 'telecom' | 'health' | 'transport' | 'emergency';
export type CriticalityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface InfrastructureAsset {
  id: string;
  name: string;
  category: InfrastructureCategory;
  criticality: CriticalityLevel;
  lat: number;
  lng: number;
  elevationMeters: number;
  replacementCostCrore: number;
  baseFragility: number; // 0-100
  floodThresholdMeters: number;
  windThresholdKmh: number;
  status: 'nominal' | 'at_risk' | 'failing' | 'offline';
  dependencies: string[]; // Asset IDs this asset depends on
  servesPopulation: number;
}

export interface VulnerabilityAssessment {
  assetId: string;
  assetName: string;
  category: InfrastructureCategory;
  floodDepthExpected: number;
  windSpeedExpected: number;
  physicalFragilityScore: number; // 0-100
  failureProbability: number; // 0-100%
  directLossEstimateCrore: number;
  systemicCascadePriority: number; // 0-100
  knockOnAssetsImpacted: string[];
}