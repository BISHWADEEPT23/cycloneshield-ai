import React, { useState } from 'react';
import ProvenanceBadge from './ProvenanceBadge';
import GEEInspectorModal from './GEEInspectorModal';
import { COMMUNITY_ZONES } from '../data/communityData';
import { INFRASTRUCTURE_ASSETS } from '../data/infrastructureData';
import { EVACUATION_ROUTES } from '../data/roadNetworkData';
import { getTrackForecast } from '../adapters/cycloneAdapter';
import { inspectPixelAtCoords } from '../utils/earthEngineModel';
import { CommunityZone } from '../types/community';
import { InfrastructureAsset } from '../types/infrastructure';
import { EvacuationRoute } from '../types/evacuation';

// Locally bundled geographic geometries & projection
import {
  ODISHA_COASTAL_BBOX,
  SVG_VIEW_WIDTH,
  SVG_VIEW_HEIGHT,
  projectToSvg,
  unprojectFromSvg,
  OCEAN_BASIN_PATH,
  CONTINENTAL_SHELF_PATH,
  COASTLINE_PATH,
  JAGATSINGHPUR_DISTRICT_PATH,
  KENDRAPARA_DISTRICT_PATH,
  MAHANADI_MAIN_RIVER_PATH,
  ERSAMA_TIDAL_CREEK_PATH,
  PARADIP_PORT_BASIN,
  DISTRICT_METADATA,
  GEO_ATTRIBUTION
} from '../data/geo/odishaCoastalDistricts';

// Multi-peril hazard geometries & scenario parameters
import {
  COMPOUND_HAZARD_SURFACES,
  SAR_INUNDATION_SURFACES,
  STORM_SURGE_SURFACE,
  HOLLAND_VORTEX_PARAMETERS
} from '../data/geo/hazardSurfaces';

type SelectedFeature =
  | { type: 'asset'; data: InfrastructureAsset }
  | { type: 'community'; data: CommunityZone }
  | { type: 'route'; data: EvacuationRoute }
  | { type: 'landfall'; data: { lat: number; lng: number; windKmh: number; pressureHpa: number } }
  | null;

export interface HazardMapPageProps {
  isHero?: boolean;
  onInspectGEE?: () => void;
}

export default function HazardMapPage({ isHero = false, onInspectGEE }: HazardMapPageProps = {}) {
  const [activeLayer, setActiveLayer] = useState<'compound' | 'sar' | 'surge' | 'wind'>('compound');
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectCoords, setInspectCoords] = useState<{ lat: number; lng: number }>({ lat: 20.31, lng: 86.61 });
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({ lat: 20.31, lng: 86.61 });
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature>(null);

  // Overlay layer visibility toggles
  const [showCycloneTrack, setShowCycloneTrack] = useState(true);
  const [showInfrastructure, setShowInfrastructure] = useState(true);
  const [showCommunities, setShowCommunities] = useState(true);
  const [showEvacRoutes, setShowEvacRoutes] = useState(true);
  const [showDistrictBorders, setShowDistrictBorders] = useState(true);

  // Forecast points from adapter
  const cycloneTracks = getTrackForecast();
  const landfallPoint = cycloneTracks.find((p) => p.timeOffsetHours === 5.5) || {
    timeOffsetHours: 5.5,
    lat: HOLLAND_VORTEX_PARAMETERS.landfallCoords.lat,
    lng: HOLLAND_VORTEX_PARAMETERS.landfallCoords.lng,
    windKmh: HOLLAND_VORTEX_PARAMETERS.maxSustainedKmh,
    pressureHpa: HOLLAND_VORTEX_PARAMETERS.centralPressureHpa,
    isForecast: true
  };
  const [landfallX, landfallY] = projectToSvg(landfallPoint.lat, landfallPoint.lng);

  // Interactive mouse move for real-time cursor coordinate readout
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * SVG_VIEW_WIDTH;
    const clickY = ((e.clientY - rect.top) / rect.height) * SVG_VIEW_HEIGHT;
    const [lat, lng] = unprojectFromSvg(clickX, clickY);
    setCursorCoords({ lat, lng });
  };

  // Map click selects point and updates inspector target
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * SVG_VIEW_WIDTH;
    const clickY = ((e.clientY - rect.top) / rect.height) * SVG_VIEW_HEIGHT;
    const [lat, lng] = unprojectFromSvg(clickX, clickY);
    setInspectCoords({ lat, lng });
  };

  const currentPixelData = inspectPixelAtCoords(inspectCoords.lat, inspectCoords.lng);

  // Grid Substation PS-07 coordinates for dependency line rendering
  const ps07 = INFRASTRUCTURE_ASSETS.find((a) => a.id === 'PS-07');
  const [ps07X, ps07Y] = ps07 ? projectToSvg(ps07.lat, ps07.lng) : [0, 0];

  return (
    <div className="space-y-4">
      {/* Header & Badges (Conditional for Hero vs Full Page) */}
      {!isHero ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Spatial Hazard Explorer & Multi-Layer GIS</h2>
            <p className="text-sm text-slate-500">
              Regional offline geospatial vector model for Jagatsinghpur–Paradip estuary and coastal lowlands
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-amber-50 text-[#D99B26] border border-amber-200/80 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D99B26] animate-pulse" />
              {HOLLAND_VORTEX_PARAMETERS.scenarioName}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-700 border border-sky-200/80">
              OFFLINE VECTOR GIS
            </span>
            <ProvenanceBadge source="OSM-ODbL-VARDHAN" type="model" />
            <ProvenanceBadge source="NATURAL-EARTH" type="model" />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9383A] animate-ping" />
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
              Spatial Multi-Hazard Vector GIS — Odisha Coastal Reach
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-50 text-[#D9383A] border border-rose-200/80 font-bold">
              ESCS LANDFALL T-5.5h
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ProvenanceBadge source="OSM-ODbL-VARDHAN" type="model" />
            <ProvenanceBadge source="GEE-S1-SAR" type="satellite" />
          </div>
        </div>
      )}

      {/* Primary Peril Layer Controls & Feature Overlay Filter Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white/72 backdrop-blur-xl p-3 rounded-2xl border border-white/70 shadow-ambient">
        {/* Peril Layer Switching */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 uppercase tracking-wider font-mono">Peril Layer:</span>
          
          <button
            onClick={() => setActiveLayer('compound')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
              activeLayer === 'compound'
                ? 'bg-[#D9383A] text-white shadow-sm ring-1 ring-[#D9383A]'
                : 'bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Compound Hazard (CHI 88)
          </button>

          <button
            onClick={() => setActiveLayer('sar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
              activeLayer === 'sar'
                ? 'bg-[#4B8359] text-white shadow-sm ring-1 ring-[#4B8359]'
                : 'bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            SAR Inundation
          </button>

          <button
            onClick={() => setActiveLayer('surge')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
              activeLayer === 'surge'
                ? 'bg-[#2563EB] text-white shadow-sm ring-1 ring-[#2563EB]'
                : 'bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Surge (2.1m)
          </button>

          <button
            onClick={() => setActiveLayer('wind')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
              activeLayer === 'wind'
                ? 'bg-[#0284C7] text-white shadow-sm ring-1 ring-[#0284C7]'
                : 'bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Wind (142 km/h)
          </button>
        </div>

        {/* Feature Overlays Toggle Pills */}
        <div className="flex flex-wrap items-center gap-1 text-[11px] pt-1 lg:pt-0 border-t lg:border-t-0 border-slate-200/60">
          <span className="text-slate-400 mr-1 font-mono uppercase">Overlays:</span>
          
          <button
            onClick={() => setShowCycloneTrack(!showCycloneTrack)}
            className={`px-2 py-1 rounded-lg border transition font-medium shadow-2xs ${
              showCycloneTrack ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold' : 'bg-white/60 border-slate-200 text-slate-500'
            }`}
          >
            🌪️ Track & Eye
          </button>

          <button
            onClick={() => setShowInfrastructure(!showInfrastructure)}
            className={`px-2 py-1 rounded-lg border transition font-medium shadow-2xs ${
              showInfrastructure ? 'bg-blue-50 border-blue-300 text-blue-800 font-semibold' : 'bg-white/60 border-slate-200 text-slate-500'
            }`}
          >
            ⚡ Assets ({INFRASTRUCTURE_ASSETS.length})
          </button>

          <button
            onClick={() => setShowCommunities(!showCommunities)}
            className={`px-2 py-1 rounded-lg border transition font-medium shadow-2xs ${
              showCommunities ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold' : 'bg-white/60 border-slate-200 text-slate-500'
            }`}
          >
            👥 Communities ({COMMUNITY_ZONES.length})
          </button>

          <button
            onClick={() => setShowEvacRoutes(!showEvacRoutes)}
            className={`px-2 py-1 rounded-lg border transition font-medium shadow-2xs ${
              showEvacRoutes ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' : 'bg-white/60 border-slate-200 text-slate-500'
            }`}
          >
            🛣️ Evacuation
          </button>

          <button
            onClick={() => setShowDistrictBorders(!showDistrictBorders)}
            className={`px-2 py-1 rounded-lg border transition font-medium shadow-2xs ${
              showDistrictBorders ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold' : 'bg-white/60 border-slate-200 text-slate-500'
            }`}
          >
            🏛️ Districts
          </button>
        </div>
      </div>

      {/* Main Dimensional Map Spatial Canvas */}
      <div className="bg-[#07111F] border border-slate-300/80 rounded-2xl relative overflow-hidden shadow-ambient flex flex-col justify-between">
        
        {/* Top Floating GIS Telemetry Bar */}
        <div className="absolute top-3 left-3 right-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2 z-20 pointer-events-none">
          <div className="p-3 bg-white/90 backdrop-blur-xl rounded-xl border border-white/80 text-xs space-y-1 shadow-ambient pointer-events-auto max-w-md text-slate-800">
            <div className="font-bold text-slate-900 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                Focus: Jagatsinghpur - Paradip Port Estuary
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                WGS84 EPSG:4326
              </span>
            </div>
            
            <div className="text-slate-500 font-mono text-[11px]">
              BBOX: {ODISHA_COASTAL_BBOX.latMin}°N, {ODISHA_COASTAL_BBOX.lngMin}°E to {ODISHA_COASTAL_BBOX.latMax}°N, {ODISHA_COASTAL_BBOX.lngMax}°E
            </div>

            {/* Strict Provenance Attribution Notice */}
            <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-200 font-mono">
              <div className="text-[#4B8359]">
                Boundary Data: <span className="text-slate-600">{GEO_ATTRIBUTION.administrative}</span>
              </div>
              <div className="text-[#D99B26]">
                Hazard Surfaces: <span className="text-slate-600">
                  {activeLayer === 'sar'
                    ? 'SAR-INSPIRED / MODEL-DERIVED INUNDATION (PROTOTYPE MODEL PARAMETER)'
                    : activeLayer === 'surge'
                    ? STORM_SURGE_SURFACE.provenanceLabel
                    : activeLayer === 'wind'
                    ? 'HOLLAND PARAMETRIC VORTEX MODEL (SIMULATED)'
                    : 'MULTI-PERIL COMPOUND SYNTHESIS (PROTOTYPE MODEL)'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Inspection Telemetry & Modal Trigger */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="hidden md:flex flex-col items-end px-3 py-1.5 bg-white/90 backdrop-blur-xl rounded-xl border border-white/80 text-xs shadow-ambient font-mono text-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Target Pixel:</span>
                <span className="text-[#0284C7] font-bold">
                  {inspectCoords.lat.toFixed(3)}°N, {inspectCoords.lng.toFixed(3)}°E
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Cursor: {cursorCoords.lat.toFixed(3)}°N, {cursorCoords.lng.toFixed(3)}°E
              </div>
            </div>

            <button
              onClick={() => onInspectGEE ? onInspectGEE() : setInspectorOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95"
            >
              <span>🔍</span> Inspect GEE SAR
            </button>
          </div>
        </div>

        {/* Floating Selected Feature Analytics Card */}
        {selectedFeature && (
          <div className="absolute top-28 right-3 z-30 w-84 bg-white/92 backdrop-blur-xl border border-white/80 rounded-xl p-4 shadow-elevated text-xs space-y-3 animate-fadeIn text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                {selectedFeature.type === 'asset' && <span className="text-[#2563EB]">⚡ Critical Infrastructure Asset</span>}
                {selectedFeature.type === 'community' && <span className="text-[#D99B26]">👥 Vulnerable Settlement Cluster</span>}
                {selectedFeature.type === 'route' && <span className="text-[#4B8359]">🛣️ Evacuation Corridor</span>}
                {selectedFeature.type === 'landfall' && <span className="text-[#D9383A]">🎯 Projected Landfall</span>}
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-slate-700 font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {selectedFeature.type === 'asset' && (
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-sky-700 uppercase tracking-wider font-bold">{selectedFeature.data.id}</span>
                  <div className="font-semibold text-slate-900 text-sm">{selectedFeature.data.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Category</span>
                    <span className="font-mono uppercase text-slate-800 font-bold">{selectedFeature.data.category}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Risk Status</span>
                    <span className={`font-mono uppercase font-bold ${selectedFeature.data.status === 'at_risk' ? 'text-[#D9383A]' : 'text-[#4B8359]'}`}>
                      {selectedFeature.data.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Fragility Index</span>
                    <span className="font-mono text-[#D99B26] font-bold">{selectedFeature.data.baseFragility}/100</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Flood Threshold</span>
                    <span className="font-mono text-slate-800 font-bold">{selectedFeature.data.floodThresholdMeters}m</span>
                  </div>
                </div>

                <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200 flex justify-between">
                  <span>Pop. Served:</span>
                  <span className="text-slate-900 font-mono font-semibold">{selectedFeature.data.servesPopulation.toLocaleString()}</span>
                </div>
              </div>
            )}

            {selectedFeature.type === 'community' && (
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider font-bold">{selectedFeature.data.id}</span>
                  <div className="font-semibold text-slate-900 text-sm">{selectedFeature.data.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Total Population</span>
                    <span className="font-mono text-slate-800 font-bold">{selectedFeature.data.totalPopulation.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Vulnerable Pop.</span>
                    <span className="font-mono text-[#D9383A] font-bold">{selectedFeature.data.vulnerablePopulation.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Kutcha Housing</span>
                    <span className="font-mono text-[#D99B26] font-bold">{Math.round(selectedFeature.data.kutchaHousingRatio * 100)}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Mean Elevation</span>
                    <span className="font-mono text-slate-800 font-bold">{selectedFeature.data.meanElevationMeters}m MSL</span>
                  </div>
                </div>

                <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200 flex justify-between">
                  <span>Shelter Deficit:</span>
                  <span className="text-[#D9383A] font-mono font-bold">
                    {Math.max(0, selectedFeature.data.vulnerablePopulation - selectedFeature.data.shelterCapacityWithin5km).toLocaleString()} beds
                  </span>
                </div>
              </div>
            )}

            {selectedFeature.type === 'route' && (
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-teal-700 uppercase tracking-wider font-bold">{selectedFeature.data.id}</span>
                  <div className="font-semibold text-slate-900 text-sm">{selectedFeature.data.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Route Status</span>
                    <span className={`font-mono uppercase font-bold ${selectedFeature.data.status === 'clear' ? 'text-[#4B8359]' : 'text-[#D9383A]'}`}>
                      {selectedFeature.data.status}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Distance</span>
                    <span className="font-mono text-slate-800 font-bold">{selectedFeature.data.distanceKm} km</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Clearance Window</span>
                    <span className="font-mono text-[#0284C7] font-bold">{selectedFeature.data.estimatedClearanceHours}h</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Inundation Risk</span>
                    <span className="font-mono text-[#D99B26] font-bold">{selectedFeature.data.inundationRiskScore}/100</span>
                  </div>
                </div>
              </div>
            )}

            {selectedFeature.type === 'landfall' && (
              <div className="space-y-2">
                <div className="font-semibold text-[#D9383A] text-sm">Paradip Coastal Reach Landfall</div>
                <div className="text-slate-500 text-[11px]">
                  Projected Landfall ETA: <span className="font-bold text-slate-800">T+5.5 Hours (14:00 UTC)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Max Sustained</span>
                    <span className="font-mono text-[#D9383A] font-bold">{selectedFeature.data.windKmh} km/h</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Central Pressure</span>
                    <span className="font-mono text-[#0284C7] font-bold">{selectedFeature.data.pressureHpa} hPa</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* DOMINANT GEOGRAPHIC CANVAS: Native Dimensional SVG Map */}
        <div className={`relative w-full aspect-[92/56] ${isHero ? 'min-h-[520px] max-h-[700px]' : 'min-h-[580px] max-h-[820px]'} bg-[#07111F] cursor-crosshair overflow-hidden`}>
          <svg
            viewBox={`0 0 ${SVG_VIEW_WIDTH} ${SVG_VIEW_HEIGHT}`}
            className="w-full h-full select-none"
            onClick={handleMapClick}
            onMouseMove={handleMouseMove}
          >
            <defs>
              {/* Dimensional Terrain & Elevation Relief Gradients */}
              <linearGradient id="terrainReliefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1728" />
                <stop offset="45%" stopColor="#07111F" />
                <stop offset="85%" stopColor="#061c1d" />
                <stop offset="100%" stopColor="#051618" />
              </linearGradient>

              {/* Bay of Bengal Deep Ocean & Shelf Gradients */}
              <linearGradient id="oceanBasinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#021c3d" />
                <stop offset="35%" stopColor="#03152d" />
                <stop offset="75%" stopColor="#011024" />
                <stop offset="100%" stopColor="#000914" />
              </linearGradient>

              <linearGradient id="shelfShoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
              </linearGradient>

              {/* Multi-Peril Gradients */}
              <linearGradient id="compoundExtremeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC3545" stopOpacity="0.70" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0.45" />
              </linearGradient>

              <linearGradient id="compoundHighGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.50" />
                <stop offset="100%" stopColor="#c2410c" stopOpacity="0.25" />
              </linearGradient>

              <linearGradient id="compoundElevatedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.12" />
              </linearGradient>

              {/* SAR Synthetic Radar Stipple Pattern */}
              <pattern id="sarStipple" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#22D3EE" fillOpacity="0.7" />
                <circle cx="6" cy="6" r="1.2" fill="#2DD4BF" fillOpacity="0.7" />
              </pattern>

              <linearGradient id="sarFloodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.40" />
              </linearGradient>

              {/* Surge Radial Shoaling Gradient */}
              <radialGradient id="surgeEnvelopeRadial" cx="72%" cy="62%" r="65%">
                <stop offset="0%" stopColor="#F05252" stopOpacity="0.70" />
                <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#22D3EE" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>

              {/* Holland Wind Eyewall Vortex Radial Gradient */}
              <radialGradient id="vortexEyewallRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#07111F" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#DC3545" stopOpacity="0.80" />
                <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.45" />
                <stop offset="85%" stopColor="#22D3EE" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#07111F" stopOpacity="0" />
              </radialGradient>

              {/* Hazard Warning Diagonal Pattern */}
              <pattern id="warningStripe" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="12" stroke="#DC3545" strokeWidth="2.5" strokeOpacity="0.4" />
              </pattern>

              {/* Dimensional Drop Shadow Filter */}
              <filter id="dimensionalShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.75" />
              </filter>
            </defs>

            {/* BASE LAYER 1: Dimensional Coastal Plain Landmass */}
            <rect width={SVG_VIEW_WIDTH} height={SVG_VIEW_HEIGHT} fill="url(#terrainReliefGrad)" />

            {/* BASE LAYER 2: Bay of Bengal Ocean Basin */}
            <path d={OCEAN_BASIN_PATH} fill="url(#oceanBasinGrad)" />

            {/* BASE LAYER 3: Continental Shelf Shoaling Zone (< 20m depth) */}
            <path d={CONTINENTAL_SHELF_PATH} fill="url(#shelfShoalGrad)" />

            {/* BASE LAYER 4: Shoreline Contour Boundary */}
            <path
              d={COASTLINE_PATH}
              fill="none"
              stroke="#203651"
              strokeWidth="2.5"
              strokeOpacity="0.8"
            />

            {/* BASE LAYER 5: Mahanadi River Estuarine Drainage Network */}
            {/* Main Mahanadi River channel */}
            <path
              d={MAHANADI_MAIN_RIVER_PATH}
              fill="none"
              stroke="#0369a1"
              strokeWidth="11"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
            {/* South distributary creek into Ersama lowlands */}
            <path
              d={ERSAMA_TIDAL_CREEK_PATH}
              fill="none"
              stroke="#0369a1"
              strokeWidth="5"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />
            {/* Paradip Port Deepwater Harbour Basin */}
            <ellipse
              cx={PARADIP_PORT_BASIN.cx}
              cy={PARADIP_PORT_BASIN.cy}
              rx={PARADIP_PORT_BASIN.rx}
              ry={PARADIP_PORT_BASIN.ry}
              fill="#0284c7"
              fillOpacity="0.75"
              stroke="#22D3EE"
              strokeWidth="1.5"
            />

            {/* OVERLAY: District Boundaries (OpenStreetMap / Vardhan Maps alignment) */}
            {showDistrictBorders && (
              <g className="transition-opacity duration-300">
                {/* Jagatsinghpur District Outline */}
                <path
                  d={JAGATSINGHPUR_DISTRICT_PATH}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  strokeOpacity="0.4"
                />
                {/* Kendrapara District Outline */}
                <path
                  d={KENDRAPARA_DISTRICT_PATH}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  strokeOpacity="0.3"
                />

                {/* District Watermark Labels */}
                {DISTRICT_METADATA.map((dist) => (
                  <g key={dist.id} transform={`translate(${dist.x}, ${dist.y})`} pointerEvents="none">
                    <text fill="#475569" fillOpacity="0.80" fontSize="12.5" fontWeight="bold" letterSpacing="1.5">
                      {dist.name}
                    </text>
                    <text y="15" fill="#64748B" fillOpacity="0.70" fontSize="9.5" fontWeight="600">
                      {dist.subtext}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Geographic Graticule Coordinate Grid (WGS84 EPSG:4326) */}
            <g stroke="#203651" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.5" pointerEvents="none">
              <line x1="0" y1="127" x2={SVG_VIEW_WIDTH} y2="127" />
              <line x1="0" y1="254" x2={SVG_VIEW_WIDTH} y2="254" />
              <line x1="0" y1="381" x2={SVG_VIEW_WIDTH} y2="381" />
              <line x1="0" y1="509" x2={SVG_VIEW_WIDTH} y2="509" />
              <line x1="242" y1="0" x2="242" y2={SVG_VIEW_HEIGHT} />
              <line x1="484" y1="0" x2="484" y2={SVG_VIEW_HEIGHT} />
              <line x1="726" y1="0" x2="726" y2={SVG_VIEW_HEIGHT} />
            </g>

            {/* Graticule Latitude/Longitude Text Labels */}
            <g fill="#94A3B8" fontSize="9.5" fontFamily="monospace" fontWeight="600" pointerEvents="none">
              <text x="8" y="124">20.46°N</text>
              <text x="8" y="251">20.36°N</text>
              <text x="8" y="378">20.26°N</text>
              <text x="8" y="506">20.16°N</text>
              <text x="246" y={SVG_VIEW_HEIGHT - 8}>86.48°E</text>
              <text x="488" y={SVG_VIEW_HEIGHT - 8}>86.58°E</text>
              <text x="730" y={SVG_VIEW_HEIGHT - 8}>86.68°E (Paradip)</text>
              <text x="770" y="445" fill="#0284c7" fontSize="13" fontWeight="bold" letterSpacing="2">
                BAY OF BENGAL
              </text>
            </g>

            {/* DYNAMIC PERIL LAYER 1: COMPOUND HAZARD (CHI 88) */}
            {activeLayer === 'compound' && (
              <g className="transition-opacity duration-300">
                {COMPOUND_HAZARD_SURFACES.map((surface) => (
                  <g key={surface.id} filter="url(#dimensionalShadow)">
                    <path
                      d={surface.svgPath}
                      fill={`url(#${surface.fillGradientId})`}
                      stroke={surface.strokeColor}
                      strokeWidth={surface.strokeWidth}
                      strokeDasharray={surface.strokeDashArray}
                    />
                    {surface.id === 'CHI-EXTREME' && (
                      <path d={surface.svgPath} fill="url(#warningStripe)" />
                    )}
                  </g>
                ))}

                {/* Callout Badges on the Map */}
                <g transform="translate(560, 310)">
                  <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#101827" stroke="#DC3545" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#F05252" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                    CHI: 88 (EXTREME HAZARD)
                  </text>
                </g>

                <g transform="translate(480, 480)">
                  <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#101827" stroke="#ea580c" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#ffedd5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                    ERSAMA DELTA: CHI 85
                  </text>
                </g>
              </g>
            )}

            {/* DYNAMIC PERIL LAYER 2: SAR-INSPIRED / MODEL-DERIVED INUNDATION */}
            {activeLayer === 'sar' && (
              <g className="transition-opacity duration-300">
                {SAR_INUNDATION_SURFACES.map((surf) => (
                  <g key={surf.id} filter="url(#dimensionalShadow)">
                    <path
                      d={surf.svgPath}
                      fill="url(#sarFloodGrad)"
                      stroke="#2DD4BF"
                      strokeWidth={surf.strokeWidth}
                    />
                    <path d={surf.svgPath} fill="url(#sarStipple)" />
                  </g>
                ))}

                {/* Specific Prototype Model Parameters Badges */}
                <g transform="translate(640, 370)">
                  <rect x="-80" y="-12" width="160" height="24" rx="6" fill="#0C1829" stroke="#2DD4BF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#2DD4BF" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    MODEL: -18.6 dB (89% CONF)
                  </text>
                </g>

                <g transform="translate(480, 520)">
                  <rect x="-80" y="-12" width="160" height="24" rx="6" fill="#0C1829" stroke="#2DD4BF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#2DD4BF" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    MODEL: -20.1 dB (94% CONF)
                  </text>
                </g>
              </g>
            )}

            {/* DYNAMIC PERIL LAYER 3: PROTOTYPE MODEL-DERIVED SURGE (2.1m Bathymetric Estimate) */}
            {activeLayer === 'surge' && (
              <g className="transition-opacity duration-300">
                {/* 2.1m Penetration Envelope */}
                <path
                  d={STORM_SURGE_SURFACE.fullEnvelopePath}
                  fill="url(#surgeEnvelopeRadial)"
                />

                {/* 2.1m Surge Penetration Crest Iso-line */}
                <path
                  d={STORM_SURGE_SURFACE.crestIsoPath}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                />

                {/* 1.5m Runup Iso-line */}
                <path
                  d={STORM_SURGE_SURFACE.runupIsoPath}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Hydrodynamic Surge Vectors (Direction: 315° NW up the Estuary) */}
                {STORM_SURGE_SURFACE.flowVectors.map((v, i) => (
                  <g key={i} transform={`translate(${v.x}, ${v.y}) rotate(${v.rot})`}>
                    <line x1="-25" y1="0" x2="25" y2="0" stroke="#3B82F6" strokeWidth="3" />
                    <polygon points="25,0 12,-6 12,6" fill="#3B82F6" />
                    <circle cx="-25" cy="0" r="3" fill="#22D3EE" />
                  </g>
                ))}

                {/* Surge Height Indicator */}
                <g transform="translate(680, 270)">
                  <rect x="-85" y="-14" width="170" height="28" rx="6" fill="#101827" stroke="#3B82F6" strokeWidth="1.8" />
                  <text x="0" y="4" fill="#60A5FA" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                    PEAK SURGE: 2.1m (+0.8m TIDE)
                  </text>
                </g>
              </g>
            )}

            {/* DYNAMIC PERIL LAYER 4: HOLLAND WIND VORTEX (142 km/h) */}
            {activeLayer === 'wind' && (
              <g className="transition-opacity duration-300">
                {/* Vortex Radial Gradient Field centered at Landfall (landfallX, landfallY) */}
                <circle cx={landfallX} cy={landfallY} r="240" fill="url(#vortexEyewallRadial)" />

                {/* 100km Gale Force Ring (90 km/h) */}
                <circle
                  cx={landfallX}
                  cy={landfallY}
                  r="240"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <text x={landfallX + 175} y={landfallY - 165} fill="#22D3EE" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  90 km/h GALE (100km)
                </text>

                {/* 60km Destructive Storm Ring (120 km/h) */}
                <circle
                  cx={landfallX}
                  cy={landfallY}
                  r="145"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <text x={landfallX + 105} y={landfallY - 100} fill="#FBBF24" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  120 km/h STORM (60km)
                </text>

                {/* Eyewall / Rmax = 32 km Ring (142 km/h peak) */}
                <circle
                  cx={landfallX}
                  cy={landfallY}
                  r="77"
                  fill="#DC3545"
                  fillOpacity="0.25"
                  stroke="#F05252"
                  strokeWidth="3.5"
                  strokeDasharray="8 4"
                />
                <text x={landfallX + 45} y={landfallY - 55} fill="#F05252" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  Rmax 32km: 142 km/h
                </text>

                {/* Cyclonic Streamlines */}
                {[90, 150, 210].map((radius, i) => (
                  <path
                    key={i}
                    d={`M ${landfallX + radius},${landfallY} A ${radius},${radius} 0 0,0 ${landfallX},${landfallY - radius}`}
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    strokeDasharray="8 6"
                  />
                ))}
              </g>
            )}

            {/* OVERLAY: Evacuation Corridors & Clearance Windows */}
            {showEvacRoutes && (
              <g className="transition-opacity duration-300">
                {EVACUATION_ROUTES.map((route) => {
                  const points = route.criticalWaypoints.map((wp) => projectToSvg(wp.lat, wp.lng));
                  const pathStr = points.reduce((acc, [x, y], idx) => (idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`), '');
                  const isClear = route.status === 'clear';

                  return (
                    <g
                      key={route.id}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeature({ type: 'route', data: route });
                      }}
                    >
                      {/* Wide hover stroke hitbox */}
                      <path d={pathStr} fill="none" stroke="transparent" strokeWidth="20" />

                      {/* Corridor Line */}
                      <path
                        d={pathStr}
                        fill="none"
                        stroke={isClear ? '#2DD4BF' : '#F05252'}
                        strokeWidth="5"
                        strokeDasharray={isClear ? undefined : '8 5'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Waypoint Markers */}
                      {points.map(([wx, wy], wIdx) => (
                        <circle
                          key={wIdx}
                          cx={wx}
                          cy={wy}
                          r="4.5"
                          fill={isClear ? '#0f766e' : '#991b1b'}
                          stroke={isClear ? '#2DD4BF' : '#F05252'}
                          strokeWidth="2"
                        />
                      ))}

                      {/* Midway Tag */}
                      {points[1] && (
                        <g transform={`translate(${points[1][0]}, ${points[1][1] - 14})`}>
                          <rect
                            x="-56"
                            y="-11"
                            width="112"
                            height="22"
                            rx="5"
                            fill="#0B1728"
                            stroke={isClear ? '#2DD4BF' : '#F05252'}
                            strokeWidth="1.4"
                          />
                          <text
                            x="0"
                            y="4.5"
                            fill={isClear ? '#2DD4BF' : '#F05252'}
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {isClear ? 'SH-12 CLEAR' : 'ROUTE FLOODED'}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* OVERLAY: Vulnerable Settlement Clusters */}
            {showCommunities && (
              <g className="transition-opacity duration-300">
                {COMMUNITY_ZONES.map((zone) => {
                  const [zx, zy] = projectToSvg(zone.lat, zone.lng);
                  const radius = zone.id === 'ZONE-A1' ? 32 : 26;

                  return (
                    <g
                      key={zone.id}
                      transform={`translate(${zx}, ${zy})`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeature({ type: 'community', data: zone });
                      }}
                    >
                      <circle
                        r={radius}
                        fill="#FBBF24"
                        fillOpacity="0.14"
                        stroke="#FBBF24"
                        strokeWidth="1.8"
                        strokeDasharray="4 3"
                        className="group-hover:fill-opacity-25 transition"
                      />
                      <circle r="6" fill="#FBBF24" stroke="#07111F" strokeWidth="1.5" />

                      <rect
                        x="-50"
                        y={radius + 4}
                        width="100"
                        height="20"
                        rx="5"
                        fill="#0B1728"
                        stroke="#FBBF24"
                        strokeWidth="1.2"
                      />
                      <text
                        x="0"
                        y={radius + 17.5}
                        fill="#FDE68A"
                        fontSize="9.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        👥 {(zone.totalPopulation / 1000).toFixed(1)}k pop
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* OVERLAY: Critical Infrastructure & Power Topology Lines */}
            {showInfrastructure && (
              <g className="transition-opacity duration-300">
                {/* Dependency lines radiating from Substation PS-07 */}
                {ps07 &&
                  INFRASTRUCTURE_ASSETS.filter((a) => a.dependencies.includes('PS-07')).map((depAsset) => {
                    const [dx, dy] = projectToSvg(depAsset.lat, depAsset.lng);
                    return (
                      <line
                        key={`dep-${depAsset.id}`}
                        x1={ps07X}
                        y1={ps07Y}
                        x2={dx}
                        y2={dy}
                        stroke="#FBBF24"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        strokeOpacity="0.45"
                      />
                    );
                  })}

                {/* Asset Pins */}
                {INFRASTRUCTURE_ASSETS.map((asset) => {
                  const [ax, ay] = projectToSvg(asset.lat, asset.lng);
                  const isAtRisk = asset.status === 'at_risk';

                  const iconText =
                    asset.category === 'energy'
                      ? '⚡'
                      : asset.category === 'water'
                      ? '💧'
                      : asset.category === 'telecom'
                      ? '📡'
                      : asset.category === 'health'
                      ? '🏥'
                      : asset.category === 'transport'
                      ? '🌉'
                      : '🛡️';

                  return (
                    <g
                      key={asset.id}
                      transform={`translate(${ax}, ${ay})`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeature({ type: 'asset', data: asset });
                      }}
                    >
                      {isAtRisk && (
                        <circle
                          r="18"
                          fill="none"
                          stroke="#DC3545"
                          strokeWidth="2"
                          strokeOpacity="0.6"
                          className="animate-ping"
                        />
                      )}

                      <circle
                        r="13"
                        fill={isAtRisk ? '#101827' : '#042f2e'}
                        stroke={isAtRisk ? '#DC3545' : '#2DD4BF'}
                        strokeWidth="2"
                        className="group-hover:scale-125 transition-transform"
                      />

                      <text x="0" y="4.5" fontSize="11" textAnchor="middle">
                        {iconText}
                      </text>

                      <rect
                        x="-26"
                        y="-28"
                        width="52"
                        height="16"
                        rx="4"
                        fill="#0B1728"
                        stroke={isAtRisk ? '#DC3545' : '#2DD4BF'}
                        strokeWidth="1.2"
                      />
                      <text
                        x="0"
                        y="-17"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {asset.id}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* OVERLAY: Cyclone Trajectory, Uncertainty Cone & Landfall */}
            {showCycloneTrack && (
              <g className="transition-opacity duration-300">
                {/* 35km Uncertainty Swath Envelope */}
                <path
                  d={`M ${SVG_VIEW_WIDTH},${SVG_VIEW_HEIGHT - 40} L ${landfallX + 35},${landfallY + 30} L 240,110 L 190,135 L ${landfallX - 35},${landfallY - 30} L ${SVG_VIEW_WIDTH - 60},${SVG_VIEW_HEIGHT} Z`}
                  fill="#22D3EE"
                  fillOpacity="0.10"
                  stroke="#22D3EE"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Central Trajectory Line */}
                <line
                  x1={SVG_VIEW_WIDTH - 20}
                  y1={SVG_VIEW_HEIGHT - 10}
                  x2={landfallX}
                  y2={landfallY}
                  stroke="#22D3EE"
                  strokeWidth="3.5"
                  strokeDasharray="8 4"
                />
                <line
                  x1={landfallX}
                  y1={landfallY}
                  x2={210}
                  y2={120}
                  stroke="#22D3EE"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  strokeOpacity="0.6"
                />

                {/* Landfall Focal Node */}
                <g
                  transform={`translate(${landfallX}, ${landfallY})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature({
                      type: 'landfall',
                      data: {
                        lat: landfallPoint.lat,
                        lng: landfallPoint.lng,
                        windKmh: landfallPoint.windKmh,
                        pressureHpa: landfallPoint.pressureHpa
                      }
                    });
                  }}
                >
                  <circle r="26" fill="none" stroke="#DC3545" strokeWidth="2.5" strokeOpacity="0.8" className="animate-ping" />
                  <circle r="18" fill="#101827" stroke="#DC3545" strokeWidth="2.5" />
                  <circle r="6" fill="#F1F5F9" />
                  <text x="0" y="4" fontSize="13" textAnchor="middle">
                    🌀
                  </text>

                  <g transform="translate(0, -34)">
                    <rect x="-95" y="-13" width="190" height="26" rx="6" fill="#101827" stroke="#DC3545" strokeWidth="1.6" />
                    <text x="0" y="4.5" fill="#F05252" fontSize="9.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                      PROJECTED LANDFALL (T+5.5h)
                    </text>
                  </g>
                </g>
              </g>
            )}

            {/* Target Reticle for Selected Inspection Pixel */}
            {(() => {
              const [ix, iy] = projectToSvg(inspectCoords.lat, inspectCoords.lng);
              return (
                <g transform={`translate(${ix}, ${iy})`} pointerEvents="none">
                  <circle r="12" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="3 2" />
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#2DD4BF" strokeWidth="1.5" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#2DD4BF" strokeWidth="1.5" />
                  <circle r="2" fill="#2DD4BF" />
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Legend, Scale & Metadata Footer */}
        <div className="p-3 bg-white/90 backdrop-blur-xl rounded-b-2xl border-t border-slate-200/80 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 z-10 shadow-ambient text-slate-700">
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="text-slate-400 font-semibold uppercase tracking-wider font-mono text-[11px]">Active Legend:</span>
            
            {activeLayer === 'compound' && (
              <>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#D9383A]" /> Extreme Hazard (CHI ≥ 85)</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#D99B26]" /> High Peril (CHI 70-84)</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /> Elevated Risk (CHI 50-69)</div>
              </>
            )}

            {activeLayer === 'sar' && (
              <>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#4B8359]" /> Modeled Flood Pooling (&lt; -18 dB)</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#0284C7]" /> High Soil Saturation</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-300" /> Baseline Topography</div>
              </>
            )}

            {activeLayer === 'surge' && (
              <>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#2563EB]" /> 2.1m Surge Crest Line</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#0284C7]" /> 1.5m Runup Buffer</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-400" /> Continental Shelf (&lt; 20m)</div>
              </>
            )}

            {activeLayer === 'wind' && (
              <>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#D9383A]" /> Eyewall Rmax 32km (142 km/h)</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#D99B26]" /> 60km Storm Ring (120 km/h)</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#0284C7]" /> 100km Gale Ring (90 km/h)</div>
              </>
            )}

            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9383A] animate-ping" />
              <span className="text-slate-600">At-Risk Asset</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4B8359]" />
              <span className="text-slate-600">Nominal Asset</span>
            </div>
          </div>

          {/* Graphic Scale Bar & Pixel Telemetry */}
          <div className="flex items-center gap-4 text-slate-600 font-mono text-[11px]">
            {/* Scale Bar: ~24 km span across SVG width 920px (10 km ~ 235px) */}
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
              <span className="text-slate-400">Scale:</span>
              <div className="w-16 h-1.5 bg-slate-100 border border-slate-300 relative rounded-sm overflow-hidden flex">
                <div className="w-1/2 h-full bg-[#0284C7]" />
                <div className="w-1/2 h-full bg-slate-300" />
              </div>
              <span className="text-slate-900 font-bold">10 km</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Pixel: <strong className="text-[#0284C7]">{currentPixelData.sarBackscatterDb} dB</strong></span>
              <span>•</span>
              <span>Elevation: <strong className="text-[#D99B26]">{currentPixelData.elevationMeters}m</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* GEE Inspector Modal */}
      <GEEInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        lat={inspectCoords.lat}
        lng={inspectCoords.lng}
      />
    </div>
  );
}