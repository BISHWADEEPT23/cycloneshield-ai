import React from 'react';
import { getDataSourceRegistry } from '../services/dataSourceManager';
import { Database, Activity, CheckCircle2, Clock } from 'lucide-react';

export default function DataSourcesPage() {
  const sources = getDataSourceRegistry();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Database className="w-6 h-6 text-[#0284C7]" />
            Data Feeds & Satellite Ingestion Registry
          </h2>
          <p className="text-sm text-slate-500">Real-time telemetry status, resolution specs, and caching monitors</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sources.map((s) => (
          <div key={s.id} className="bg-white/72 backdrop-blur-xl border border-white/70 p-5 rounded-2xl space-y-3.5 shadow-ambient hover:shadow-elevated transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">{s.name}</h4>
                <div className="text-xs text-slate-500 font-medium">{s.provider}</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-[#4B8359] text-xs font-mono font-bold rounded-md border border-emerald-200">
                {s.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
              <div>
                <div className="text-slate-500 font-medium">Latency</div>
                <div className="font-bold text-[#0284C7] font-mono text-sm mt-0.5">{s.latencyMs} ms</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Updated</div>
                <div className="font-bold text-slate-900 font-mono text-sm mt-0.5">{s.lastUpdated}</div>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-500 flex justify-between pt-1 border-t border-slate-100">
              <span className="text-sky-700 font-semibold">{s.provenanceTag}</span>
              <span>{s.resolution}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}