import React from 'react';
import { inspectPixelAtCoords } from '../utils/earthEngineModel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lat?: number;
  lng?: number;
}

export default function GEEInspectorModal({ isOpen, onClose, lat = 20.31, lng = 86.61 }: Props) {
  if (!isOpen) return null;
  const inspection = inspectPixelAtCoords(lat, lng);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-2xl max-w-xl w-full p-6 shadow-[0_25px_60px_rgba(15,23,42,0.20)] space-y-5 text-slate-800 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛰️</span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Earth Engine Pixel Inspector</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
          Target Coordinates: <span className="font-mono text-[#0284C7] font-bold">{lat.toFixed(4)}°N, {lng.toFixed(4)}°E</span> (Paradip Coastal Reach)
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Sentinel-1 SAR Backscatter</div>
            <div className="text-xl font-bold font-mono text-[#0284C7] mt-1">{inspection.sarBackscatterDb} dB</div>
            <div className="text-[11px] text-slate-400 mt-1">Specular water absorption signature</div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Sentinel-2 MNDWI Index</div>
            <div className="text-xl font-bold font-mono text-[#4B8359] mt-1">+{inspection.mndwiIndex}</div>
            <div className="text-[11px] text-slate-400 mt-1">Modified Normalized Difference Water</div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">NASADEM Elevation</div>
            <div className="text-xl font-bold font-mono text-[#D99B26] mt-1">{inspection.elevationMeters} m</div>
            <div className="text-[11px] text-slate-400 mt-1">Slope: {inspection.slopeDegrees}° (High flatland ponding)</div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Floodwater Confidence</div>
            <div className="text-xl font-bold font-mono text-[#D9383A] mt-1">{inspection.floodWaterConfidence}%</div>
            <div className="text-[11px] text-slate-400 mt-1">Multi-temporal threshold verified</div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-[#0284C7] flex items-center gap-1.5">
            <span>🛡️</span> Data Provenance & Calibration
          </div>
          <div>{inspection.provenance}</div>
          <div className="text-slate-400 text-[11px]">Processed using EE reducer pipeline with Lee-Sigma speckle filtering.</div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}