import { getDemoSnapshot } from './demoScript';

export function buildRiskContextPayload(): string {
  const snap = getDemoSnapshot();
  return JSON.stringify(
    {
      cyclone: snap.cyclone,
      hazards: snap.hazards,
      anchorInfrastructure: snap.infrastructure,
      vulnerableCommunity: snap.community,
      parametricLiquidity: snap.parametric,
      contextTimestamp: new Date().toISOString()
    },
    null,
    2
  );
}