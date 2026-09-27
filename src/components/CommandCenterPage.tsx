import React, { useState } from 'react';
import {
  Wind,
  Waves,
  CloudRain,
  Satellite,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import { getDemoSnapshot } from '../utils/demoScript';
import { INFRASTRUCTURE_ASSETS } from '../data/infrastructureData';
import ProvenanceBadge from './ProvenanceBadge';
import GEEInspectorModal from './GEEInspectorModal';
import HazardMapPage from './HazardMapPage';

export default function CommandCenterPage() {
  const snap = getDemoSnapshot();
  const [isInspectorOpen, setInspectorOpen] = useState(false);

  // Real data for Hazard Distribution Bar Chart
  const hazardDistributionData = [
    { peril: 'Wind', score: snap.hazards.windScore, value: `${snap.cyclone.sustainedWindKmh} km/h`, color: '#0284C7' },
    { peril: 'Surge', score: snap.hazards.surgeScore, value: `${snap.hazards.surgeMeters}m`, color: '#2563EB' },
    { peril: 'Rain', score: snap.hazards.rainScore, value: `${snap.hazards.rainfallMm}mm`, color: '#0284C7' },
    { peril: 'Inundation', score: snap.hazards.geeEnrichedFloodScore, value: 'SAR-derived', color: '#4B8359' },
    { peril: 'Compound', score: snap.hazards.compoundHazardIndex, value: 'CHI Coupled', color: '#D9383A' },
  ];

  // 24-hour severity trajectory based on cyclone approach and landfall timeline
  const trajectoryData = [
    { time: 'T-0h', chi: 74, wind: 142, surge: 1.6, phase: 'Current Observation' },
    { time: 'T+2h', chi: 79, wind: 146, surge: 1.8, phase: 'Outer Eyewall Approaching' },
    { time: 'T+5.5h', chi: 92, wind: 154, surge: 2.1, phase: 'Projected Landfall Peak' },
    { time: 'T+8h', chi: 85, wind: 135, surge: 1.9, phase: 'Estuarine Storm Surge Ponding' },
    { time: 'T+12h', chi: 69, wind: 105, surge: 1.2, phase: 'Inland Catchment Flood Peak' },
    { time: 'T+24h', chi: 46, wind: 65, surge: 0.5, phase: 'Post-Landfall Decay' },
  ];

  // Priority infrastructure table data sorted by systemic cascade priority
  const priorityAssets = [...INFRASTRUCTURE_ASSETS]
    .sort((a, b) => b.baseFragility - a.baseFragility)
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner - Executive Command Emergency Header */}
      <div className="bg-white/72 backdrop-blur-xl border border-rose-200/80 rounded-2xl p-5 shadow-ambient relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#D9383A] text-white text-[11px] font-extrabold rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                CRITICAL EMERGENCY ADVISORY
              </span>
              <span className="text-slate-500 text-xs font-mono font-medium">
                {snap.cyclone.classification}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-mono font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
                SIMULATED SCENARIO
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              CYCLONE {snap.cyclone.name} — {snap.cyclone.category} (142 km/h)
            </h1>

            <p className="text-slate-600 text-xs md:text-sm">
              Predicted Landfall Corridor: <strong className="text-slate-900">{snap.cyclone.predictedLandfall.location}</strong> in{' '}
              <span className="text-[#D9383A] font-bold">
                {snap.cyclone.predictedLandfall.etaHours} Hours ({snap.cyclone.predictedLandfall.etaTimestamp})
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 shadow-2xs">
              Center: <span className="font-bold text-slate-900">19.85°N, 87.25°E</span> (958 hPa)
            </div>

            <button
              onClick={() => setInspectorOpen(true)}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-[#4B8359] text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xs active:scale-95"
            >
              <Satellite className="w-4 h-4 text-[#4B8359]" />
              <span>Inspect GEE SAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Command Center Composition: LEFT ~60% GIS Hero | RIGHT ~40% Telemetry & Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT ~60% (col 1–7): Large Spatial Hazard Map / GIS Hero */}
        <div className="lg:col-span-7 bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-4 shadow-ambient flex flex-col justify-between">
          <HazardMapPage isHero={true} onInspectGEE={() => setInspectorOpen(true)} />
        </div>

        {/* RIGHT ~40% (col 8–12): 2x2 Telemetry Grid + Stacked Risk Intelligence */}
        <div className="lg:col-span-5 space-y-4">
          {/* 2×2 Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* 1. Holland Wind - Meteorological Cyan */}
            <div className="bg-white/72 backdrop-blur-xl border border-white/70 p-4 rounded-xl shadow-xs hover:shadow-elevated transition duration-200 group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">Sustained Wind</span>
                <ProvenanceBadge source="IMD-DWR" type="meteorology" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl md:text-3xl font-black font-mono text-[#0284C7] tracking-tight">
                  {snap.cyclone.sustainedWindKmh}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">km/h</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Gusts to {snap.cyclone.gustsKmh} km/h</span>
                <span className="text-slate-400 font-mono">Rmax 32km</span>
              </div>
            </div>

            {/* 2. Coastal Surge - Analytical Blue */}
            <div className="bg-white/72 backdrop-blur-xl border border-white/70 p-4 rounded-xl shadow-xs hover:shadow-elevated transition duration-200 group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">Peak Surge</span>
                <ProvenanceBadge source="INCOIS-GAUGE" type="model" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl md:text-3xl font-black font-mono text-[#2563EB] tracking-tight">
                  {snap.hazards.surgeMeters}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">m</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                High Tide Coincidence (Estuary)
              </div>
            </div>

            {/* 3. 24h Cumulative Rain - Meteorological Cyan */}
            <div className="bg-white/72 backdrop-blur-xl border border-white/70 p-4 rounded-xl shadow-xs hover:shadow-elevated transition duration-200 group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">24h Rainfall</span>
                <ProvenanceBadge source="AWS-NETWORK" type="meteorology" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl md:text-3xl font-black font-mono text-[#0284C7] tracking-tight">
                  {snap.hazards.rainfallMm}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">mm</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Saturated Catchment Runoff
              </div>
            </div>

            {/* 4. GEE SAR Inundation Index - Safe/Operational Teal */}
            <div className="bg-white/72 backdrop-blur-xl border border-white/70 p-4 rounded-xl shadow-xs hover:shadow-elevated transition duration-200 group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">SAR Flood Index</span>
                <ProvenanceBadge source="GEE-S1-SAR" type="satellite" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl md:text-3xl font-black font-mono text-[#4B8359] tracking-tight">
                  {snap.hazards.geeEnrichedFloodScore}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">/100</span>
              </div>
              <div className="text-[11px] text-[#4B8359] font-medium mt-1">
                +10.5pt vs baseline index ({snap.hazards.baselineFloodScore})
              </div>
            </div>
          </div>

          {/* Stacked Risk Intelligence Card 1: Compound Hazard Index 88 */}
          <div className="bg-white/72 backdrop-blur-xl border border-rose-200/70 rounded-2xl p-4 shadow-ambient space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#D9383A]" />
                <h3 className="font-bold text-slate-900 text-sm">Compound Hazard Index (CHI)</h3>
              </div>
              <span className="px-2 py-0.5 bg-rose-50 text-[#D9383A] text-xs font-mono font-extrabold rounded-md border border-rose-200">
                CRITICAL COINCIDENCE
              </span>
            </div>

            <div className="flex items-center gap-4 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
              <div className="text-4xl font-black text-[#D9383A] font-mono tracking-tight pl-2">
                {snap.hazards.compoundHazardIndex}
              </div>
              <div className="text-xs text-slate-600 leading-snug">
                Non-linear coupling of simultaneous <strong>142 km/h winds</strong>, <strong>2.1m surge backwater</strong>, and <strong>268mm precipitation</strong> creating catastrophic estuarine water trapping.
              </div>
            </div>
          </div>

          {/* Stacked Risk Intelligence Card 2: Infrastructure Cascade Alert */}
          <div className="bg-white/72 backdrop-blur-xl border border-amber-200/70 rounded-2xl p-4 shadow-ambient space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#D99B26]" />
                <h3 className="font-bold text-slate-900 text-sm">Infrastructure Cascade Alert</h3>
              </div>
              <span className="px-2 py-0.5 bg-amber-50 text-[#D99B26] text-xs font-mono font-extrabold rounded-md border border-amber-200">
                89% TRIP RISK
              </span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{snap.infrastructure.anchorAssetName}</span>
                <span className="text-[11px] font-mono font-bold text-[#D99B26]">ID: {snap.infrastructure.anchorAssetId}</span>
              </div>
              <div className="text-xs text-slate-600">
                Inundation Expected: <strong className="text-slate-900">{snap.infrastructure.expectedFloodDepthMeters}m</strong> (Trip Threshold 0.6m)
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200 pt-1.5">
                {snap.infrastructure.knockOnCascadeSummary}
              </p>
            </div>
          </div>

          {/* Stacked Risk Intelligence Card 3: Community Evacuation Clearance */}
          <div className="bg-white/72 backdrop-blur-xl border border-blue-200/70 rounded-2xl p-4 shadow-ambient space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-slate-900 text-sm">Community Evacuation Clearance</h3>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] text-xs font-mono font-extrabold rounded-md border border-blue-200">
                CLEARANCE ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Exposed Pop</div>
                <div className="font-bold font-mono text-slate-900 mt-0.5">{snap.community.exposedPopulation.toLocaleString()}</div>
              </div>
              <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Bed Deficit</div>
                <div className="font-bold font-mono text-[#D9383A] mt-0.5">-{snap.community.shelterBedDeficit.toLocaleString()}</div>
              </div>
              <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Safe Window</div>
                <div className="font-bold font-mono text-[#0284C7] mt-0.5">{snap.community.safePlanningWindowHours} Hours</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Evacuation corridor SH-12 remains clear for 3.8 hours before low-lying culvert backwater flooding at KM-14.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM INTELLIGENCE DOCK: 3 Columns with Recharts and High Legibility Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Dock Panel 1: Hazard Distribution Chart (Recharts BarChart) */}
        <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-5 shadow-ambient flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0284C7]" />
                Peril Intensity Distribution
              </h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Normalized 0–100</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Real-time multi-hazard component breakdown for Jagatsinghpur–Paradip estuary
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="peril" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                <Tooltip
                  cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-md text-xs font-sans">
                          <div className="font-bold text-slate-900">{data.peril} Hazard</div>
                          <div className="font-mono text-slate-700 mt-0.5">Score: <strong style={{ color: data.color }}>{data.score}/100</strong></div>
                          <div className="text-[11px] text-slate-500">Value: {data.value}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {hazardDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-200/70 font-mono">
            <span>Primary Driver: <strong className="text-slate-800">Wind-Surge Phase Coincidence</strong></span>
            <span className="text-[#D9383A] font-bold">CHI 88 Max</span>
          </div>
        </div>

        {/* Dock Panel 2: 24-Hour Severity Trajectory (Recharts AreaChart) */}
        <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-5 shadow-ambient flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                24-Hour Severity Trajectory
              </h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Hourly Forecast</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Projected Compound Hazard Index (CHI) profile across cyclone landfall timeline
            </p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                <YAxis domain={[30, 100]} tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-md text-xs font-sans">
                          <div className="font-bold text-slate-900">{data.time} — {data.phase}</div>
                          <div className="font-mono text-[#2563EB] font-bold mt-0.5">CHI: {data.chi}/100</div>
                          <div className="text-[11px] text-slate-500">Wind: {data.wind} km/h • Surge: {data.surge}m</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="chi"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#chiGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-200/70 font-mono">
            <span>Peak Window: <strong className="text-slate-800">T+5.5h (19:30 IST)</strong></span>
            <span className="text-[#2563EB] font-bold">154 km/h Peak Wind</span>
          </div>
        </div>

        {/* Dock Panel 3: Critical Infrastructure Priorities (High Legibility Solid/90 Table) */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-ambient flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D99B26]" />
                Critical Infrastructure Priorities
              </h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Cascade Ranked</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Direct physical fragility & directed downstream dependency ranking
            </p>
          </div>

          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase">
                  <th className="pb-2 font-bold">Asset</th>
                  <th className="pb-2 font-bold">Fragility</th>
                  <th className="pb-2 font-bold">Exp Flood</th>
                  <th className="pb-2 font-bold">Failure Prob</th>
                  <th className="pb-2 font-bold text-right">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {priorityAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 pr-2">
                      <div className="font-bold text-slate-900 text-xs">{asset.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{asset.id} • {asset.category} • {(asset.servesPopulation / 1000).toFixed(0)}k pop</div>
                    </td>
                    <td className="py-2.5 font-mono text-slate-700 font-semibold text-xs">
                      {asset.baseFragility}/100
                    </td>
                    <td className="py-2.5 font-mono text-slate-900 font-bold text-xs">
                      {asset.id === 'PS-07' ? '1.4m' : asset.id === 'WTP-03' ? '1.1m' : '0.8m'}
                    </td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        asset.status === 'at_risk' ? 'bg-rose-50 text-[#D9383A] border border-rose-200' : 'bg-emerald-50 text-[#4B8359] border border-emerald-200'
                      }`}>
                        {asset.id === 'PS-07' ? '89%' : asset.id === 'WTP-03' ? '78%' : '72%'}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono font-black text-xs text-[#D9383A]">
                      {asset.id === 'PS-07' ? '86' : asset.id === 'WTP-03' ? '80' : '74'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-200 font-mono">
            <span>Anchor: <strong className="text-slate-800">Jagatsinghpur 220kV Substation</strong></span>
            <span className="text-[#D99B26] font-bold">Cascade Impact: 3 Nodes</span>
          </div>
        </div>
      </div>

      {/* GEE SAR Inspector Modal */}
      <GEEInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </div>
  );
}