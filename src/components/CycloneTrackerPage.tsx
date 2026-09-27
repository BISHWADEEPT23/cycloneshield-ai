import React from 'react';
import { getTrackForecast } from '../adapters/cycloneAdapter';
import ProvenanceBadge from './ProvenanceBadge';
import { Wind, Compass, Gauge, AlertCircle } from 'lucide-react';

export default function CycloneTrackerPage() {
  const track = getTrackForecast();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Wind className="w-6 h-6 text-[#0284C7]" />
            Cyclone VARUNA: Trajectory & Vortex Structure
          </h2>
          <p className="text-sm text-slate-500">Holland parametric wind profile calibrated with IMD Doppler Radar Paradip</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200/70">
            SIMULATED CYCLONE SCENARIO
          </span>
          <ProvenanceBadge source="IMD-DWR-PARADIP" type="meteorology" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-6 space-y-4 shadow-ambient">
          <h3 className="font-bold text-slate-900 text-base">Forecast Waypoint Track Sequence</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white/90">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/90 text-slate-500 font-mono border-b border-slate-200">
                <tr>
                  <th className="p-3">Offset</th>
                  <th className="p-3">Lat / Lng</th>
                  <th className="p-3">Wind (km/h)</th>
                  <th className="p-3">Pressure (hPa)</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {track.map((pt, i) => (
                  <tr key={i} className={pt.timeOffsetHours === 0 ? 'bg-sky-50/60 font-semibold' : 'hover:bg-slate-50/50'}>
                    <td className="p-3 font-mono text-slate-700">{pt.timeOffsetHours > 0 ? `+${pt.timeOffsetHours}h` : `${pt.timeOffsetHours}h`}</td>
                    <td className="p-3 font-mono text-slate-900">{pt.lat.toFixed(2)}°N, {pt.lng.toFixed(2)}°E</td>
                    <td className="p-3 font-mono font-bold text-[#0284C7]">{pt.windKmh}</td>
                    <td className="p-3 font-mono text-[#2563EB]">{pt.pressureHpa}</td>
                    <td className="p-3">
                      {pt.timeOffsetHours === 0 ? (
                        <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-[10px] font-bold border border-sky-200">CURRENT OBS</span>
                      ) : pt.timeOffsetHours === 5.5 ? (
                        <span className="px-2 py-0.5 bg-rose-50 text-[#D9383A] rounded text-[10px] font-bold border border-rose-200">PROJECTED LANDFALL</span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">Forecast Waypoint</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/72 backdrop-blur-xl border border-white/70 rounded-2xl p-6 space-y-4 shadow-ambient">
          <h3 className="font-bold text-slate-900 text-base">Vortex Kinematics</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
              <div className="text-slate-500 font-medium">Radius of Maximum Wind (Rmax)</div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">32 km</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Determined by Holland shape parameter</div>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
              <div className="text-slate-500 font-medium">Holland B Parameter</div>
              <div className="text-xl font-bold font-mono text-[#0284C7] mt-1">1.35</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Peaked eyewall pressure gradient</div>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
              <div className="text-slate-500 font-medium">Forward Speed / Heading</div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">16 km/h (315° NW)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Tracking into Mahanadi river delta</div>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
              <div className="text-slate-500 font-medium">Central Pressure Deficit (ΔP)</div>
              <div className="text-xl font-bold font-mono text-[#D99B26] mt-1">55 hPa</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Ambient 1013 hPa vs Central 958 hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}