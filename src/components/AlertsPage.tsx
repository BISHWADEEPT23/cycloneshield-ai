import React, { useState } from 'react';
import { alertManager } from '../services/alertManager';
import ProvenanceBadge from './ProvenanceBadge';
import { Bell, CheckCircle2, Send, ShieldAlert, FileText } from 'lucide-react';

export default function AlertsPage() {
  const [advisory, setAdvisory] = useState(alertManager.getAdvisory());

  function handleApprove() {
    const updated = alertManager.approveAdvisory('Special Relief Commissioner (SRC) / Joint Secretary DM');
    setAdvisory({ ...updated });
  }

  function handleDispatch() {
    const updated = alertManager.dispatchAdvisory();
    setAdvisory({ ...updated });
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#D9383A]" />
            Early Warning & Official Authority Advisory
          </h2>
          <p className="text-sm text-slate-500">Human-in-the-loop review workflow and simulated Common Alerting Protocol (CAP) dispatch</p>
        </div>
        <ProvenanceBadge source="OSDMA-SEOC" type="model" />
      </div>

      <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-6 space-y-5 shadow-ambient">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono text-slate-500 font-medium">Advisory Bulletin ID: {advisory.id}</div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              Status: <span className="text-[#D9383A]">{advisory.severity}</span>
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                advisory.status === 'DISPATCHED'
                  ? 'bg-emerald-50 text-[#4B8359] border-emerald-200'
                  : 'bg-amber-50 text-[#D99B26] border-amber-200'
              }`}
            >
              {advisory.status}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-800 bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 leading-relaxed font-normal">
          {advisory.bulletinSummary}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0284C7]" />
            Mandatory Civil Actions
          </h4>
          <ul className="space-y-2">
            {advisory.mandatoryActions.map((act, i) => (
              <li key={i} className="text-xs text-slate-800 flex items-start gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-[#4B8359] shrink-0 mt-0.5" />
                <span className="leading-snug">{act}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 space-y-1 font-sans">
            <div>Sign-off Authority: <strong className="text-slate-900">{advisory.approvedBy || 'Pending Signature'}</strong></div>
            <div>Approved Timestamp: <span className="font-mono text-sky-700 font-semibold">{advisory.approvedAt || 'Pending'}</span></div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              Simulate Authority Approval
            </button>
            <button
              onClick={handleDispatch}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <Send className="w-4 h-4" />
              Simulate CAP Broadcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}