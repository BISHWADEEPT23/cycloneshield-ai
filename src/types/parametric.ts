export interface ParametricTriggerTier {
  tier: number;
  name: string;
  windThresholdKmh: number;
  surgeThresholdMeters: number;
  rainThresholdMm: number;
  payoutPercent: number;
  payoutAmountCrore: number;
  status: 'MET' | 'UNMET';
}

export interface ParametricSimulationResult {
  policyId: string;
  beneficiary: string;
  facilitySizeCrore: number;
  activeCyclone: string;
  observedWindKmh: number;
  observedSurgeMeters: number;
  observedRainMm: number;
  highestTierTriggered: number;
  payoutPercent: number;
  liquidityPayoutCrore: number;
  executionWindowHours: number;
  auditEvidence: {
    windSource: string;
    surgeSource: string;
    sarFloodSource: string;
    timestamp: string;
    hashProof: string;
  };
}