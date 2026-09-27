import React from 'react';
import { COMMUNITY_ZONES } from '../data/communityData';
import { EVACUATION_ROUTES } from '../data/roadNetworkData';
import { evaluateCommunityVulnerability } from '../utils/communityModel';
import ProvenanceBadge from './ProvenanceBadge';
import { Navigation, Users, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function EvacuationPage() {
  const zonesEvaluated = COMMUNITY_ZONES.map((z) => evaluateCommunityVulnerability(z, 88));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Navigation className="w-6 h-6 text-[#0284C7]" />
            Community Risk & Dynamic Evacuation Clearance
          </h2>
          <p className="text-sm text-slate-500">Demographic vulnerability indexing & route inundation risk bottlenecks</p>
        </div>
        <ProvenanceBadge source="OSDMA-CENSUS" type="model" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Community Zones */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D99B26]" />
            Vulnerable Settlement Clusters
          </h3>
          {zonesEvaluated.map((z) => (
            <div key={z.zoneId} className="bg-white/72 backdrop-blur-xl border border-white/70 p-4 rounded-xl space-y-2.5 shadow-ambient hover:shadow-elevated transition duration-200">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">{z.zoneName}</h4>
                <span className="px-2 py-0.5 bg-rose-50 text-[#D9383A] rounded text-xs font-mono font-bold border border-rose-200">
                  CVI: {z.cviScore}/100
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/70">
                <div>
                  <div className="text-slate-500 font-medium">Priority</div>
                  <div className="font-bold text-[#D9383A] font-mono mt-0.5">{z.evacuationPriority}/100</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Urgency</div>
                  <div className="font-bold text-[#0284C7] uppercase font-mono mt-0.5">{z.evacuationUrgency}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Bed Deficit</div>
                  <div className="font-bold text-[#D99B26] font-mono mt-0.5">-{z.shelterDeficit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evacuation Routes */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#2563EB]" />
            Evacuation Corridors & Clearance Windows
          </h3>
          {EVACUATION_ROUTES.map((route) => (
            <div key={route.id} className="bg-white/72 backdrop-blur-xl border border-white/70 p-4 rounded-xl space-y-2.5 shadow-ambient hover:shadow-elevated transition duration-200">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">{route.name}</h4>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${
                    route.status === 'clear'
                      ? 'bg-emerald-50 text-[#4B8359] border-emerald-200'
                      : 'bg-rose-50 text-[#D9383A] border-rose-200'
                  }`}
                >
                  {route.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/70">
                <div>
                  <div className="text-slate-500 font-medium">Distance</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">{route.distanceKm} km</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Clearance</div>
                  <div className="font-bold text-[#0284C7] font-mono mt-0.5">{route.estimatedClearanceHours}h</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Flood Risk</div>
                  <div className="font-bold text-[#D99B26] font-mono mt-0.5">{route.inundationRiskScore}/100</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}