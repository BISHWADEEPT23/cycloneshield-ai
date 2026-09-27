import { OperationalBrief } from '../types/aiAdvisor';
import { getDemoSnapshot } from './demoScript';

export function generateRuleBasedOperationalBrief(): OperationalBrief {
  const snap = getDemoSnapshot();
  return {
    cycloneName: snap.cyclone.name,
    generatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
    modelProvenance: 'RULE_BASED_ENGINE_BACKUP',
    executiveSummary: `Extremely Severe Cyclonic Storm VARUNA (Category 4 equivalent) is tracking NW with sustained winds of 142 km/h (gusts 154 km/h) toward the Jagatsinghpur/Kendrapara coastline. Expected landfall is 5.5 hours away. Compound Hazard Index has peaked at 88/100 due to synchronized wind, 2.1m storm surge, and 268mm rainfall with SAR-verified ground saturation.`,
    tacticalDirectives: [
      'Declare immediate mandatory evacuation for Paradip Port informal settlements (Zone A1) and Ersama coastal hamlets (Zone A2).',
      'Pre-stage heavy diesel dewatering pumps and elevate relay cabinets at 220kV Grid Substation PS-07 to mitigate anticipated 1.4m inundation.',
      'Dispatch backup water tankers to Paradip Sub-Divisional Hospital DH-02 in anticipation of cascading outage from WTP-03.',
      'Reroute Ersama evacuees away from compromised Canal Dyke Route 02 toward higher-elevation Balikuda bypass.',
      'Trigger pre-cleared ₹7.00 Crore parametric liquidity tranche to ensure unconditional cash liquidity for frontline shelters.'
    ],
    infrastructureCriticalPoints: [
      {
        asset: 'Substation PS-07 (Jagatsinghpur Grid)',
        impact: '89% probability of tripping due to 1.4m coincident surge and riverine backup.',
        action: 'Isolate non-essential feeder lines; protect main transformer busbars; stage mobile gen-sets.'
      },
      {
        asset: 'Mahanadi WTP-03 (Potable Water)',
        impact: 'Loss of raw water intake within 45 mins of grid power cutoff.',
        action: 'Switch immediately to dedicated auxiliary diesel feeder and seal raw water pump chambers.'
      },
      {
        asset: 'Paradip Hospital DH-02',
        impact: 'High casualty intake expected; grid failure expected; municipal water severed.',
        action: 'Top up 8-hour diesel gen-set tank; stock 48h emergency water; stage emergency surgical teams.'
      }
    ],
    evacuationWindows: [
      {
        zone: 'Paradip Coastal Slums (Zone A1)',
        hoursRemaining: 4.5,
        advisory: 'Critical window closing. Clear SH-12 expressway before 16:30 IST.'
      },
      {
        zone: 'Ersama Delta Hamlets (Zone A2)',
        hoursRemaining: 2.5,
        advisory: 'Imminent route inundation on Canal Road. Dispatch NDRF BAUT high-clearance trucks.'
      }
    ],
    uncertaintyDisclaimers: [
      'Storm surge timing is sensitive to 30-minute shifts in astronomical high tide peak.',
      'GEE SAR flood extent reflects 08:24 IST pass; subsequent rainfall has added ~45mm runoff.',
      'Parametric payout simulation is an advisory liquidity estimate and not an insurance binder.'
    ],
    rawReasoningTrace: `Operational Analysis:
1. Peril Coupling: 142 km/h wind stresses trees and unreinforced walls; 2.1m surge breaches low embankments (elevation 2.1-2.4m); 268mm rain prevents inland drainage (backwater effect).
2. Infrastructure Systemic Failure: PS-07 failure is the single point of failure (SPOF) for WTP-03, TC-12, and DH-02. Prioritizing PS-07 saves 3 downstream facilities.
3. Evacuation Calculus: 42,700 vulnerable citizens facing a 2,400 bed deficit; requires opening secondary high school concrete shelters in Kujang.`
  };
}