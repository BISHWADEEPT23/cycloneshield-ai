export interface DemoSnapshot {
  cyclone: {
    name: string;
    category: string;
    classification: string;
    sustainedWindKmh: number;
    gustsKmh: number;
    centralPressureHpa: number;
    translationSpeedKmh: number;
    bearingDegrees: number;
    currentCoords: { lat: number; lng: number };
    predictedLandfall: {
      location: string;
      etaHours: number;
      etaTimestamp: string;
    };
  };
  hazards: {
    windScore: number;
    surgeMeters: number;
    surgeScore: number;
    rainfallMm: number;
    rainScore: number;
    baselineFloodScore: number;
    geeEnrichedFloodScore: number;
    geeEnrichmentDeltaPercent: number;
    compoundHazardIndex: number; // 88
    compoundClassification: string;
  };
  infrastructure: {
    anchorAssetId: string;
    anchorAssetName: string;
    expectedFloodDepthMeters: number;
    structuralFragilityScore: number;
    failureProbabilityPercent: number;
    systemicCascadePriority: number;
    knockOnCascadeSummary: string;
  };
  community: {
    exposedPopulation: number;
    vulnerablePopulation: number;
    communityVulnerabilityIndex: number; // 88
    evacuationPriority: number; // 88
    safePlanningWindowHours: number; // 4.5
    shelterBedDeficit: number; // 2400
  };
  parametric: {
    policyId: string;
    facilitySizeCrore: number;
    activeTierTriggered: number;
    payoutPercent: number;
    payoutCrore: number; // 7.00
    payoutStatus: string;
  };
  earlyWarning: {
    advisoryId: string;
    severity: string;
    status: string;
    leadTimeHours: number;
  };
}

export function getDemoSnapshot(): DemoSnapshot {
  return {
    cyclone: {
      name: 'VARUNA',
      category: 'Category 4',
      classification: 'Extremely Severe Cyclonic Storm (ESCS)',
      sustainedWindKmh: 142,
      gustsKmh: 154,
      centralPressureHpa: 958,
      translationSpeedKmh: 16,
      bearingDegrees: 315, // NW
      currentCoords: { lat: 19.85, lng: 87.25 },
      predictedLandfall: {
        location: 'Between Paradip Port & Kendrapara Coast (Odisha)',
        etaHours: 5.5,
        etaTimestamp: 'Today, 19:30 IST'
      }
    },
    hazards: {
      windScore: 78,
      surgeMeters: 2.1,
      surgeScore: 82,
      rainfallMm: 268,
      rainScore: 85,
      baselineFloodScore: 76,
      geeEnrichedFloodScore: 84,
      geeEnrichmentDeltaPercent: 10.5,
      compoundHazardIndex: 88,
      compoundClassification: 'EXTREME MULTI-HAZARD COINCIDENCE'
    },
    infrastructure: {
      anchorAssetId: 'PS-07',
      anchorAssetName: 'Jagatsinghpur 220kV Grid Substation',
      expectedFloodDepthMeters: 1.4,
      structuralFragilityScore: 85,
      failureProbabilityPercent: 89,
      systemicCascadePriority: 86,
      knockOnCascadeSummary: 'Tripping cuts power to Mahanadi WTP-03, Paradip Telecom TC-12 & puts District Hospital DH-02 on diesel reserves (8h run-time).'
    },
    community: {
      exposedPopulation: 42700,
      vulnerablePopulation: 17000,
      communityVulnerabilityIndex: 88,
      evacuationPriority: 88,
      safePlanningWindowHours: 4.5,
      shelterBedDeficit: 2400
    },
    parametric: {
      policyId: 'ODISHA-RAPID-LIQ-2026-T5',
      facilitySizeCrore: 10.0,
      activeTierTriggered: 3,
      payoutPercent: 70,
      payoutCrore: 7.0,
      payoutStatus: 'TRIGGERED (READY FOR IMMEDIATE PRE-DISASTER DISBURSEMENT)'
    },
    earlyWarning: {
      advisoryId: 'ADV-2026-VARUNA-04',
      severity: 'EXTREME_DANGER',
      status: 'APPROVED & SIMULATED DISPATCH',
      leadTimeHours: 5.5
    }
  };
}