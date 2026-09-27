export type AlertSeverity = 'WATCH' | 'ALERT' | 'WARNING' | 'EXTREME_DANGER';
export type ApprovalStatus = 'PENDING_HUMAN_APPROVAL' | 'APPROVED' | 'REJECTED' | 'DISPATCHED';

export interface EarlyWarningAdvisory {
  id: string;
  cycloneName: string;
  timestamp: string;
  severity: AlertSeverity;
  targetDistricts: string[];
  compoundHazardIndex: number;
  windSpeedKmh: number;
  stormSurgeMeters: number;
  rainfallMm: number;
  leadTimeHours: number;
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  bulletinSummary: string;
  mandatoryActions: string[];
  dispatchedChannels: Array<'CAP_XML' | 'SMS_CELL_BROADCAST' | 'STATE_EOC' | 'PUBLIC_SIREN'>;
}