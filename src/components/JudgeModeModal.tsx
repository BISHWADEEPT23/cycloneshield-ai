import React from 'react';
import { Zap, X, ShieldAlert, Satellite, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function JudgeModeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-[0_25px_60px_rgba(15,23,42,0.20)] space-y-6 text-slate-800 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-mono font-bold text-[#D99B26]">
              <Zap className="w-3.5 h-3.5 fill-[#D99B26]" />
              HACKATHON JUDGE EVALUATION MODE — TRACK 5
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">CycloneShield AI: Architecture & Evaluation Brief</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-base transition"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-sky-700 font-bold text-sm flex items-center gap-1.5">
              <span>🎯</span> Problem & Track Alignment
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Traditional cyclone early warning focuses solely on landfall position and wind speed. CycloneShield AI pioneers <strong>multi-hazard compound modeling</strong>, linking meteorology with <strong>satellite SAR inundation, cascading infrastructure dependencies, and rapid parametric disaster liquidity</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
              <span>🛰️</span> Earth Observation Integration
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Sentinel-1 SAR synthetic aperture radar detects floodwater beneath heavy cyclonic cloud cover. Co-registered with Sentinel-2 MNDWI and SRTM elevation rasters, providing a modeled <strong>+10.5pt flood severity index elevation</strong> over un-enriched baseline precipitation models.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900">10-Stage Single Source of Truth Pipeline</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px] font-mono">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">1. GEE SAR Inundation</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">2. IMD Track & DWR</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">3. Holland Wind Vortex</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">4. Storm Surge Physics</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">5. Compound Hazard (88)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">6. Substation PS-07</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">7. Cascade Topology</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">8. Evacuation Clearance</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">9. Gemini AI Reasoner</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-700 font-medium">10. Parametric ₹7Cr Trigger</div>
          </div>
        </div>

        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
          <h4 className="text-amber-900 font-bold text-sm">Key Anchor Demo Numbers</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
              <div className="text-[11px] text-slate-500">Active Storm</div>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">VARUNA (Cat 4)</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
              <div className="text-[11px] text-slate-500">Compound Hazard</div>
              <div className="text-base font-bold text-[#D9383A] font-mono mt-0.5">88 / 100</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
              <div className="text-[11px] text-slate-500">Substation PS-07</div>
              <div className="text-base font-bold text-[#D99B26] font-mono mt-0.5">89% Fail Prob</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
              <div className="text-[11px] text-slate-500">Parametric Payout</div>
              <div className="text-base font-bold text-[#4B8359] font-mono mt-0.5">₹7.0 Cr (Tier 3)</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs transition shadow-md active:scale-95"
          >
            Resume Live Demo
          </button>
        </div>
      </div>
    </div>
  );
}