import React from 'react';
import { INFRASTRUCTURE_ASSETS } from '../data/infrastructureData';
import { evaluateInfrastructureVulnerability } from '../utils/vulnerabilityModel';
import ProvenanceBadge from './ProvenanceBadge';
import { Building2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function InfrastructurePage() {
  const evaluated = INFRASTRUCTURE_ASSETS.map((asset) =>
    evaluateInfrastructureVulnerability(asset, 1.4, 142)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#2563EB]" />
            Critical Infrastructure Vulnerability & Cascade Topology
          </h2>
          <p className="text-sm text-slate-500">Physical fragility curves and directed dependency propagation</p>
        </div>
        <ProvenanceBadge source="OSDI-GIS-TOPOLOGY" type="model" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {evaluated.map((item) => (
          <div key={item.assetId} className="bg-white/72 backdrop-blur-xl border border-white/70 p-5 rounded-2xl space-y-3.5 shadow-ambient hover:shadow-elevated transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">{item.assetId}</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{item.assetName}</h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${
                  item.failureProbability >= 80
                    ? 'bg-rose-50 text-[#D9383A] border border-rose-200'
                    : 'bg-emerald-50 text-[#4B8359] border border-emerald-200'
                }`}
              >
                {item.failureProbability}% FAIL PROB
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-xs bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
              <div>
                <div className="text-slate-500 font-medium">Exp. Flood</div>
                <div className="font-bold text-slate-900 font-mono text-sm mt-0.5">{item.floodDepthExpected}m</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Fragility</div>
                <div className="font-bold text-[#D99B26] font-mono text-sm mt-0.5">{item.physicalFragilityScore}/100</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Cascade Rank</div>
                <div className="font-bold text-[#D9383A] font-mono text-sm mt-0.5">{item.systemicCascadePriority}/100</div>
              </div>
            </div>

            {item.knockOnAssetsImpacted.length > 0 && (
              <div className="text-xs space-y-1 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                <span className="text-amber-800 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D99B26]" />
                  Cascading Knock-On Effects:
                </span>
                <ul className="list-disc list-inside text-slate-700 space-y-0.5 pl-1 pt-1">
                  {item.knockOnAssetsImpacted.map((dep, idx) => (
                    <li key={idx} className="leading-snug">{dep}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}