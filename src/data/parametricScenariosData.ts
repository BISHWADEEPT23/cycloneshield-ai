import { ParametricTriggerTier } from '../types/parametric';

export const PARAMETRIC_TIERS: ParametricTriggerTier[] = [
  {
    tier: 1,
    name: 'Precautionary Early Response Tier',
    windThresholdKmh: 100,
    surgeThresholdMeters: 1.0,
    rainThresholdMm: 120,
    payoutPercent: 20,
    payoutAmountCrore: 2.0,
    status: 'MET'
  },
  {
    tier: 2,
    name: 'Severe Impact Response Tier',
    windThresholdKmh: 125,
    surgeThresholdMeters: 1.5,
    rainThresholdMm: 200,
    payoutPercent: 45,
    payoutAmountCrore: 4.5,
    status: 'MET'
  },
  {
    tier: 3,
    name: 'Catastrophic Cyclone Emergency Liquidity Tier',
    windThresholdKmh: 140,
    surgeThresholdMeters: 2.0,
    rainThresholdMm: 250,
    payoutPercent: 70,
    payoutAmountCrore: 7.0,
    status: 'MET'
  },
  {
    tier: 4,
    name: 'Super Cyclonic Maximum Exhaustion Tier',
    windThresholdKmh: 180,
    surgeThresholdMeters: 3.2,
    rainThresholdMm: 350,
    payoutPercent: 100,
    payoutAmountCrore: 10.0,
    status: 'UNMET'
  }
];