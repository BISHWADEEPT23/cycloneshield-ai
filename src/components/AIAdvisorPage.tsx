import React, { useState, useEffect } from 'react';
import { OperationalBrief } from '../types/aiAdvisor';
import { fetchOperationalBrief } from '../services/geminiService';
import ProvenanceBadge from './ProvenanceBadge';
import { Sparkles, RefreshCw, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AIAdvisorPage() {
  const [brief, setBrief] = useState<OperationalBrief | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrief();
  }, []);

  async function loadBrief() {
    setLoading(true);
    const data = await fetchOperationalBrief();
    setBrief(data);
    setLoading(false);
  }

  if (loading || !brief) {
    return (
      <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-12 text-center shadow-ambient space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-sky-600 border-t-transparent animate-spin mx-auto" />
        <div className="text-slate-600 font-medium text-xs font-mono">Synthesizing Gemini Operational Reasoning Brief from Multi-Hazard Telemetry...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#2563EB]" />
            Gemini Operational Reasoning Engine
          </h2>
          <p className="text-sm text-slate-500">Contextual civil defense directives synthesized from multi-hazard telemetry</p>
        </div>
        <div className="flex items-center gap-2">
          <ProvenanceBadge source={brief.modelProvenance} type="ai" />
          <button
            onClick={loadBrief}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg text-slate-700 transition shadow-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            Regenerate
          </button>
        </div>
      </div>

      <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-6 space-y-5 shadow-ambient">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          Executive Operational Summary
        </h3>
        <p className="text-slate-800 text-sm leading-relaxed bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 font-normal">
          {brief.executiveSummary}
        </p>

        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            Tactical Directives for District EOC
          </h4>
          <ul className="space-y-2">
            {brief.tacticalDirectives.map((d, i) => (
              <li key={i} className="text-xs text-slate-800 flex items-start gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
                <span className="text-[#0284C7] font-bold font-mono text-sm leading-none">{i + 1}.</span>
                <span className="leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D99B26]" />
              Infrastructure Critical Interventions
            </h4>
            {brief.infrastructureCriticalPoints.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs space-y-1">
                <div className="font-bold text-slate-900">{item.asset}</div>
                <div className="text-slate-600">{item.impact}</div>
                <div className="text-[#D99B26] font-semibold mt-1">Action: {item.action}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              Operational Uncertainties & Disclaimers
            </h4>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs space-y-2">
              {brief.uncertaintyDisclaimers.map((u, idx) => (
                <div key={idx} className="text-slate-600 flex items-start gap-1.5">
                  <span className="text-slate-400">•</span>
                  <span>{u}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}