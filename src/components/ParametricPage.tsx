import React from 'react';
import { simulateParametricTrigger } from '../utils/parametricEngine';
import { PARAMETRIC_TIERS } from '../data/parametricScenariosData';
import ProvenanceBadge from './ProvenanceBadge';
import { Coins, AlertTriangle, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function ParametricPage() {
  const result = simulateParametricTrigger();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Coins className="w-6 h-6 text-[#2563EB]" />
            Parametric Disaster Finance & Rapid Liquidity Trigger Simulator
          </h2>
          <p className="text-sm text-slate-500">Verifiable hazard thresholds enabling pre-impact emergency cash liquidity</p>
        </div>
        <ProvenanceBadge source="INCOIS-IMD-GEE-AUDIT" type="model" />
      </div>

      <div className="p-4 bg-amber-50/90 border border-amber-200/80 rounded-2xl text-xs text-amber-900 shadow-ambient flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#D99B26] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">PARAMETRIC FINANCE SIMULATION</strong> — This prototype does not price insurance, process contracts, or transfer funds. It demonstrates how verifiable earth observation indicators can unlock rapid liquidity for municipal relief.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-6 space-y-4 shadow-ambient">
          <h3 className="font-bold text-slate-900 text-base">Parametric Trigger Tiers & Threshold Evaluation</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white/90">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/90 text-slate-500 font-mono border-b border-slate-200">
                <tr>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Criteria (Wind / Surge / Rain)</th>
                  <th className="p-3">Payout %</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Trigger Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PARAMETRIC_TIERS.map((t) => (
                  <tr key={t.tier} className={t.status === 'MET' ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'}>
                    <td className="p-3 font-bold font-mono text-slate-900">Tier {t.tier}</td>
                    <td className="p-3 text-slate-600 font-mono">{t.windThresholdKmh} km/h | {t.surgeThresholdMeters}m | {t.rainThresholdMm}mm</td>
                    <td className="p-3 font-mono font-bold text-[#2563EB]">{t.payoutPercent}%</td>
                    <td className="p-3 font-mono font-bold text-slate-900">₹{t.payoutAmountCrore.toFixed(1)} Cr</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                          t.status === 'MET'
                            ? 'bg-emerald-50 text-[#4B8359] border-emerald-200'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-6 space-y-4 shadow-ambient">
          <h3 className="font-bold text-slate-900 text-base">Liquidity Disbursement</h3>
          <div className="text-center py-5 bg-slate-50/90 rounded-xl border border-slate-200/80">
            <div className="text-4xl font-black text-[#4B8359] font-mono">₹{result.liquidityPayoutCrore.toFixed(2)} Cr</div>
            <div className="text-xs text-slate-500 mt-1 font-medium flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Disbursable within {result.executionWindowHours} Hours
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Facility Cap:</span>
              <span className="font-bold text-slate-900 font-mono">₹{result.facilitySizeCrore.toFixed(1)} Cr</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Active Trigger:</span>
              <span className="font-bold text-[#4B8359] font-mono">Tier {result.highestTierTriggered} (70%)</span>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400 break-all leading-tight">
              Audit Proof: {result.auditEvidence.hashProof}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}