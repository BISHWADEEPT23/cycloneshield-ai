import React, { useState } from 'react';
import {
  LayoutDashboard,
  Wind,
  Map,
  Building2,
  Navigation,
  Sparkles,
  Bell,
  Coins,
  Database,
  Activity,
  Zap,
  Filter,
  Layers,
  ChevronDown
} from 'lucide-react';
import CommandCenterPage from './components/CommandCenterPage';
import CycloneTrackerPage from './components/CycloneTrackerPage';
import HazardMapPage from './components/HazardMapPage';
import InfrastructurePage from './components/InfrastructurePage';
import EvacuationPage from './components/EvacuationPage';
import AIAdvisorPage from './components/AIAdvisorPage';
import AlertsPage from './components/AlertsPage';
import ParametricPage from './components/ParametricPage';
import DataSourcesPage from './components/DataSourcesPage';
import SystemStatusPage from './components/SystemStatusPage';
import JudgeModeModal from './components/JudgeModeModal';

type ActiveTab =
  | 'command'
  | 'tracker'
  | 'map'
  | 'infra'
  | 'evac'
  | 'ai'
  | 'alerts'
  | 'parametric'
  | 'sources'
  | 'system';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('command');
  const [isJudgeModeOpen, setJudgeModeOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<'all' | 'jagatsinghpur' | 'kendrapara'>('all');
  const [selectedInfraFilter, setSelectedInfraFilter] = useState<'all' | 'critical' | 'at_risk'>('critical');

  const navItems: NavItem[] = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard, tag: 'Executive Overview' },
    { id: 'tracker', label: 'Cyclone Tracker', icon: Wind, tag: 'Holland Vortex Kinematics' },
    { id: 'map', label: 'Hazard Map', icon: Map, tag: 'Spatial GIS & Multi-Peril' },
    { id: 'infra', label: 'Infrastructure', icon: Building2, tag: 'Cascade Failure Graph' },
    { id: 'evac', label: 'Evacuation', icon: Navigation, tag: 'Clearance Windows' },
    { id: 'ai', label: 'AI Advisor', icon: Sparkles, tag: 'Gemini Operational Reasoning' },
    { id: 'alerts', label: 'Alerts & CAP', icon: Bell, tag: 'Official Authority Advisory' },
    { id: 'parametric', label: 'Parametric Finance', icon: Coins, tag: 'Rapid Liquidity Trigger' },
    { id: 'sources', label: 'Data Sources', icon: Database, tag: 'Sentinel & IMD Ingestion' },
    { id: 'system', label: 'System Status', icon: Activity, tag: 'Runtime Audit Checklist' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#0F172A] flex font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      {/* Slim Left Icon Rail with Lucide Icons and Tooltips */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 bg-white/72 backdrop-blur-xl border-r border-slate-200/70 z-40 flex flex-col items-center py-3 justify-between shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        {/* Top Logo Mark */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setActiveTab('command')}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 hover:scale-105 transition active:scale-95 group relative"
            title="CycloneShield AI — Track 5"
          >
            <Wind className="w-5 h-5 text-white" />
            <div className="absolute left-16 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50">
              CycloneShield AI (Track 5)
            </div>
          </button>
        </div>

        {/* Navigation Icon Stack */}
        <nav className="flex flex-col items-center gap-1.5 w-full px-2 my-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="relative group w-full flex justify-center">
                <button
                  onClick={() => setActiveTab(item.id)}
                  aria-label={item.label}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-sky-600/10 text-sky-700 border border-sky-600/30 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600 stroke-[2.3]' : 'stroke-[1.8]'}`} />
                </button>

                {/* Hover Tooltip for Immediate Evaluation Understanding */}
                <div className="absolute left-16 px-3 py-1.5 bg-slate-900/95 backdrop-blur-md text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 transform scale-95 group-hover:scale-100 whitespace-nowrap z-50 flex flex-col gap-0.5 border border-slate-700">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">{item.tag}</div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Judge Mode Trigger in Rail */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative group">
            <button
              onClick={() => setJudgeModeOpen(true)}
              className="w-10 h-10 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#D99B26] border border-amber-500/30 flex items-center justify-center transition shadow-xs"
              title="Open Hackathon Judge Mode"
            >
              <Zap className="w-5 h-5 fill-[#D99B26]/30 text-[#D99B26]" />
            </button>
            <div className="absolute left-16 px-2.5 py-1 bg-slate-900 text-amber-300 text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50 border border-slate-700">
              ⚡ Open Judge Mode
            </div>
          </div>
        </div>
      </aside>

      {/* Main Execution View Canvas (Offset ml-16 for rail) */}
      <div className="ml-16 flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Control Bar with Glass Filter Pills & Identity */}
        <header className="sticky top-0 z-30 bg-white/72 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_20px_rgba(15,23,42,0.03)] px-4 sm:px-6 lg:px-8 xl:px-9 py-2.5">
          <div className="w-full mx-auto flex flex-wrap items-center justify-between gap-4">
            {/* Left Identity: CycloneShield AI + Track 5 */}
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                    CycloneShield AI
                  </h1>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/80">
                    Track 5: Disaster Forecaster
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Multi-Hazard Physics Hydrodynamics & Infrastructure Cascading Fragility
                </p>
              </div>
            </div>

            {/* Middle: Compact Glass / White Filter Pills */}
            <div className="flex items-center flex-wrap gap-2 text-xs">
              {/* Filter 1: Districts */}
              <div className="relative inline-flex items-center bg-white/88 backdrop-blur-md border border-slate-200/80 rounded-lg px-2.5 py-1 shadow-xs text-slate-700 font-medium">
                <span className="text-slate-400 mr-1.5 text-[11px]">Region:</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value as any)}
                  className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer pr-1"
                >
                  <option value="all">All Coastal Districts (Odisha)</option>
                  <option value="jagatsinghpur">Jagatsinghpur (Estuary)</option>
                  <option value="kendrapara">Kendrapara (North Reach)</option>
                </select>
              </div>

              {/* Filter 2: Critical Infrastructure */}
              <div className="relative inline-flex items-center bg-white/88 backdrop-blur-md border border-slate-200/80 rounded-lg px-2.5 py-1 shadow-xs text-slate-700 font-medium">
                <span className="text-slate-400 mr-1.5 text-[11px]">Assets:</span>
                <select
                  value={selectedInfraFilter}
                  onChange={(e) => setSelectedInfraFilter(e.target.value as any)}
                  className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer pr-1"
                >
                  <option value="critical">Critical Infrastructure</option>
                  <option value="at_risk">At-Risk Assets Only</option>
                  <option value="all">All Monitored Assets</option>
                </select>
              </div>

              {/* Filter 3: Cyclone Scenario Pill */}
              <div className="inline-flex items-center gap-1.5 bg-white/88 backdrop-blur-md border border-slate-200/80 rounded-lg px-2.5 py-1 shadow-xs text-slate-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-semibold text-slate-900">Cyclone VARUNA</span>
                <span className="text-[10px] font-mono text-slate-500">(ESCS Cat 4)</span>
              </div>

              {/* Filter 4: Forecast Window */}
              <div className="inline-flex items-center gap-1 bg-white/88 backdrop-blur-md border border-slate-200/80 rounded-lg px-2.5 py-1 shadow-xs text-slate-700 font-medium">
                <span className="text-slate-400 text-[11px]">Window:</span>
                <span className="font-semibold text-slate-900">Forecast Next 12h</span>
              </div>
            </div>

            {/* Right: Live Scenario Status & Judge Mode Trigger */}
            <div className="flex items-center gap-3">
              {/* VARUNA Live Status Badge with Strict Provenance Indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-rose-50/90 border border-rose-200/80 rounded-xl text-xs font-mono text-[#D9383A] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D9383A] animate-ping" />
                <span className="font-bold">SIMULATED SCENARIO</span>
                <span className="text-slate-400">|</span>
                <span>142 km/h</span>
                <span className="text-slate-400">|</span>
                <span>Landfall: 5.5h</span>
              </div>

              {/* Refined Prominent Judge Mode Control */}
              <button
                onClick={() => setJudgeModeOpen(true)}
                className="px-3.5 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-1.5 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Judge Mode</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views: Viewport utilization 88-94% of desktop width */}
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-9 py-5">
          {activeTab === 'command' && <CommandCenterPage />}
          {activeTab === 'tracker' && <CycloneTrackerPage />}
          {activeTab === 'map' && <HazardMapPage />}
          {activeTab === 'infra' && <InfrastructurePage />}
          {activeTab === 'evac' && <EvacuationPage />}
          {activeTab === 'ai' && <AIAdvisorPage />}
          {activeTab === 'alerts' && <AlertsPage />}
          {activeTab === 'parametric' && <ParametricPage />}
          {activeTab === 'sources' && <DataSourcesPage />}
          {activeTab === 'system' && <SystemStatusPage />}
        </main>

        {/* Executive Light Footer */}
        <footer className="bg-white/58 backdrop-blur-lg border-t border-slate-200/60 text-slate-500 text-xs py-3.5 px-4 sm:px-6 lg:px-8 xl:px-9 text-center mt-auto">
          <div className="w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-medium text-slate-600">
              CycloneShield AI Prototype • Track 5: Multi-Hazard Forecaster & Infrastructure Vulnerability Platform
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Scientific Provenance: Sentinel-1 SAR (GEE Derived), IMD Doppler Radar, Holland Vortex & Parametric Models.
            </p>
          </div>
        </footer>

        {/* Judge Mode Modal */}
        <JudgeModeModal
          isOpen={isJudgeModeOpen}
          onClose={() => setJudgeModeOpen(false)}
        />
      </div>
    </div>
  );
}