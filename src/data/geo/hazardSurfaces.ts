/**
 * hazardSurfaces.ts
 * 
 * Multi-peril spatial hazard surfaces for the Jagatsinghpur - Paradip Port Estuary focus region.
 * 
 * PROVENANCE & CALIBRATION NOTICE:
 * - Scenario: SIMULATED CYCLONE SCENARIO (VARUNA)
 * - Inundation Layer: SAR-INSPIRED / MODEL-DERIVED INUNDATION (PROTOTYPE MODEL PARAMETERS)
 *   Synthetic surface derived from hydrodynamic slope ponding and backscatter thresholds:
 *   -18.6 dB (estuary waterlogged soil) and -20.1 dB (open delta pooling).
 *   These represent prototype model parameters, not live satellite observations.
 * - Surge Layer: PROTOTYPE MODEL-DERIVED SURGE (2.1m Bathymetric Estimate)
 *   Estimated coastal water level based on astronomical tide (+0.8m) + 1.3m inverted barometer/wind stress.
 * - Wind Layer: Holland parametric vortex model (142 km/h eyewall at Rmax 32 km).
 * - Compound Layer: Multi-peril overlay synthesis (CHI 88 extreme collision).
 */

export interface HazardSurfaceData {
  id: string;
  name: string;
  classification: string;
  provenanceLabel: string;
  svgPath: string;
  fillGradientId: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray?: string;
  metrics: Record<string, string | number>;
}

// 1. COMPOUND HAZARD SURFACES (CHI 88 Extreme Peril Collision)
export const COMPOUND_HAZARD_SURFACES: HazardSurfaceData[] = [
  {
    id: 'CHI-EXTREME',
    name: 'Coastal Collision Core',
    classification: 'Extreme Compound Peril (CHI ≥ 85)',
    provenanceLabel: 'PROTOTYPE MODEL SYNTHESIS (Surge + Fluvial + Wind)',
    svgPath: 'M 440,290 Q 560,280 660,300 T 740,340 L 700,410 L 580,480 L 460,470 L 410,380 Z',
    fillGradientId: 'compoundExtremeGrad',
    strokeColor: '#ef4444',
    strokeWidth: 2.5,
    metrics: {
      chiScore: 88,
      primaryDrivers: 'Surge Penetration (2.1m) + Cyclonic Eye Wind (142 km/h) + Fluvial Ponding',
      populationExposed: 42700,
      criticalAssetsTrapped: 3
    }
  },
  {
    id: 'CHI-HIGH',
    name: 'Estuarine Fluvial & Surge Runup Zone',
    classification: 'High Compound Hazard (CHI 70-84)',
    provenanceLabel: 'PROTOTYPE MODEL SYNTHESIS (Fluvial + Wind)',
    svgPath: 'M 280,240 Q 420,230 560,260 T 760,300 L 750,420 L 620,510 L 420,490 L 320,380 Z',
    fillGradientId: 'compoundHighGrad',
    strokeColor: '#ea580c',
    strokeWidth: 1.8,
    metrics: {
      chiScore: 74,
      primaryDrivers: 'Mahanadi Floodplain Backwater + 120 km/h Gusts',
      populationExposed: 73500,
      criticalAssetsTrapped: 2
    }
  },
  {
    id: 'CHI-ELEVATED',
    name: 'Inland Peripheral Transition Zone',
    classification: 'Elevated Peril (CHI 50-69)',
    provenanceLabel: 'PROTOTYPE MODEL SYNTHESIS',
    svgPath: 'M 120,180 Q 280,160 480,220 T 780,250 L 840,320 L 760,460 L 520,540 L 320,500 L 180,360 Z',
    fillGradientId: 'compoundElevatedGrad',
    strokeColor: '#eab308',
    strokeWidth: 1.2,
    strokeDashArray: '4 3',
    metrics: {
      chiScore: 56,
      primaryDrivers: 'Gale Wind (90 km/h) + Moderate Runoff',
      populationExposed: 120000,
      criticalAssetsTrapped: 1
    }
  }
];

// 2. SAR-INSPIRED / MODEL-DERIVED INUNDATION SURFACES
export const SAR_INUNDATION_SURFACES: HazardSurfaceData[] = [
  {
    id: 'SAR-ERSAMA-DEPRESSION',
    name: 'Ersama Deltaic Lowland Inundation',
    classification: 'Severe Water Absorption (Slope < 2°)',
    provenanceLabel: 'SAR-INSPIRED / MODEL-DERIVED INUNDATION (PROTOTYPE MODEL PARAMETER)',
    svgPath: 'M 440,430 Q 500,420 540,460 T 560,510 L 480,530 L 430,490 Z',
    fillGradientId: 'sarFloodGrad',
    strokeColor: '#06b6d4',
    strokeWidth: 2,
    metrics: {
      syntheticBackscatterDb: -20.1,
      modeledFloodConfidence: '94% (Prototype Model)',
      estimatedDepthMeters: 1.8,
      affectedAcreage: 14200
    }
  },
  {
    id: 'SAR-PARADIP-PERIPHERY',
    name: 'Paradip Port Slum & Creek Inundation',
    classification: 'High Estuarine Soil Saturation',
    provenanceLabel: 'SAR-INSPIRED / MODEL-DERIVED INUNDATION (PROTOTYPE MODEL PARAMETER)',
    svgPath: 'M 520,300 Q 600,290 680,310 T 710,360 L 650,390 L 560,370 L 510,330 Z',
    fillGradientId: 'sarFloodGrad',
    strokeColor: '#06b6d4',
    strokeWidth: 2,
    metrics: {
      syntheticBackscatterDb: -18.6,
      modeledFloodConfidence: '89% (Prototype Model)',
      estimatedDepthMeters: 1.4,
      affectedAcreage: 8600
    }
  },
  {
    id: 'SAR-MAHANADI-RIBBON',
    name: 'Mahanadi Overbank Flow Corridor',
    classification: 'Fluvial Drainage Stagnation',
    provenanceLabel: 'SAR-INSPIRED / MODEL-DERIVED INUNDATION (PROTOTYPE MODEL PARAMETER)',
    svgPath: 'M 220,265 Q 320,270 410,275 T 510,285 L 500,310 L 320,300 L 220,285 Z',
    fillGradientId: 'sarFloodGrad',
    strokeColor: '#22d3ee',
    strokeWidth: 1.5,
    metrics: {
      syntheticBackscatterDb: -16.4,
      modeledFloodConfidence: '78% (Prototype Model)',
      estimatedDepthMeters: 0.9,
      affectedAcreage: 6400
    }
  }
];

// 3. PROTOTYPE MODEL-DERIVED STORM SURGE SURFACES
export const STORM_SURGE_SURFACE = {
  id: 'SURGE-2_1M-ENVELOPE',
  name: 'Coastal Storm Surge Penetration Envelope',
  provenanceLabel: 'PROTOTYPE MODEL-DERIVED SURGE (2.1m Bathymetric Estimate)',
  crestIsoPath: 'M 410,500 Q 480,440 540,410 T 630,290 Q 680,260 740,240',
  runupIsoPath: 'M 370,480 Q 440,410 500,380 T 590,260 Q 640,230 700,210',
  fullEnvelopePath: 'M 436,560 L 410,500 Q 480,440 540,410 T 630,290 Q 680,260 740,240 L 780,260 L 726,293 Q 790,240 847,178 T 896,12 L 920,0 L 920,560 Z',
  metrics: {
    peakSurgeMeters: 2.10,
    astronomicalTideMeters: 0.80,
    totalCrestMslMeters: 2.90,
    inlandPenetrationMaxKm: 5.8,
    shoalingFactor: 1.25
  },
  flowVectors: [
    { x: 740, y: 380, rot: -40, label: '315° NW' },
    { x: 670, y: 440, rot: -45, label: '315° NW' },
    { x: 590, y: 490, rot: -50, label: '315° NW' },
    { x: 780, y: 280, rot: -35, label: '315° NW' }
  ]
};

// 4. HOLLAND WIND VORTEX PARAMETERS (SIMULATED CYCLONE SCENARIO: VARUNA)
export const HOLLAND_VORTEX_PARAMETERS = {
  scenarioName: 'SIMULATED CYCLONE SCENARIO (VARUNA)',
  landfallCoords: { lat: 20.31, lng: 86.61 },
  rmaxKm: 32,
  hollandB: 1.35,
  centralPressureHpa: 959,
  ambientPressureHpa: 1013,
  maxSustainedKmh: 142,
  peakGustKmh: 178,
  radii: {
    eyewallKm: 32, // Rmax
    destructiveStormKm: 60, // 120 km/h
    galeBoundaryKm: 100 // 90 km/h
  }
};
