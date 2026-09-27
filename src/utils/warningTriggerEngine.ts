import { EarlyWarningAdvisory, AlertSeverity } from '../types/alerts';
import { getDemoSnapshot } from './demoScript';

export function evaluateWarningTriggers(): EarlyWarningAdvisory {
  const snap = getDemoSnapshot();
  let severity: AlertSeverity = 'EXTREME_DANGER';
  if (snap.hazards.compoundHazardIndex < 60) severity = 'ALERT';
  else if (snap.hazards.compoundHazardIndex < 75) severity = 'WARNING';

  return {
    id: 'ADV-2026-VARUNA-04',
    cycloneName: snap.cyclone.name,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
    severity,
    targetDistricts: ['Jagatsinghpur', 'Kendrapara', 'Bhadrak', 'Puri Coastal Belt'],
    compoundHazardIndex: snap.hazards.compoundHazardIndex,
    windSpeedKmh: snap.cyclone.sustainedWindKmh,
    stormSurgeMeters: snap.hazards.surgeMeters,
    rainfallMm: snap.hazards.rainfallMm,
    leadTimeHours: snap.cyclone.predictedLandfall.etaHours,
    status: 'APPROVED',
    approvedBy: 'Special Relief Commissioner (SRC) / Joint Collector Disaster Management',
    approvedAt: '14:15 IST (Simulated Authority Sign-off)',
    bulletinSummary: `ESCS VARUNA approaches Jagatsinghpur-Kendrapara coastline with 142 km/h winds, 2.1m surge coinciding with astronomical high tide, and 268mm severe rainfall. Compound Hazard Index stands at 88/100 (EXTREME). Evacuate all low-lying zones immediately.`,
    mandatoryActions: [
      'Execute mandatory mass evacuation across coastal zones within 5km buffer before 16:30 IST',
      'Deploy mobile generator and dewatering pumps to Substation PS-07 and Water Treatment Plant WTP-03',
      'Suspend all operations at Paradip Port and secure gantry cranes in storm stowage position',
      'Activate satellite phone links and VHF frequency channels 14 & 16 across emergency medical units'
    ],
    dispatchedChannels: ['CAP_XML', 'SMS_CELL_BROADCAST', 'STATE_EOC', 'PUBLIC_SIREN']
  };
}