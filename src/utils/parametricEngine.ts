import { ParametricSimulationResult } from '../types/parametric';
import { getDemoSnapshot } from './demoScript';

export function simulateParametricTrigger(): ParametricSimulationResult {
  const snap = getDemoSnapshot();
  return {
    policyId: snap.parametric.policyId,
    beneficiary: 'Odisha State Disaster Management Authority (OSDMA) Emergency Fund',
    facilitySizeCrore: snap.parametric.facilitySizeCrore,
    activeCyclone: snap.cyclone.name,
    observedWindKmh: snap.cyclone.sustainedWindKmh,
    observedSurgeMeters: snap.hazards.surgeMeters,
    observedRainMm: snap.hazards.rainfallMm,
    highestTierTriggered: snap.parametric.activeTierTriggered,
    payoutPercent: snap.parametric.payoutPercent,
    liquidityPayoutCrore: snap.parametric.payoutCrore,
    executionWindowHours: 12,
    auditEvidence: {
      windSource: 'IMD Doppler Weather Radar Paradip + Automated Weather Station AWS-OD-04',
      surgeSource: 'INCOIS Coastal Tide Gauge Paradip Port Station ID 4321',
      sarFloodSource: 'Copernicus Sentinel-1 SAR IW Dual-Pol GRD Scene 2026-09-27T08:24:12Z',
      timestamp: new Date().toISOString(),
      hashProof: 'SHA256: 4e82b7c6d9a1f29038ecbb58129034aa8f10c3d98129e73541c8f192aa09b78c'
    }
  };
}