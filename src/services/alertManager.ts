import { EarlyWarningAdvisory } from '../types/alerts';
import { evaluateWarningTriggers } from '../utils/warningTriggerEngine';

class AlertManager {
  private activeAdvisory: EarlyWarningAdvisory;

  constructor() {
    this.activeAdvisory = evaluateWarningTriggers();
  }

  getAdvisory(): EarlyWarningAdvisory {
    return this.activeAdvisory;
  }

  approveAdvisory(officerName: string): EarlyWarningAdvisory {
    this.activeAdvisory = {
      ...this.activeAdvisory,
      status: 'APPROVED',
      approvedBy: officerName,
      approvedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
    };
    return this.activeAdvisory;
  }

  dispatchAdvisory(): EarlyWarningAdvisory {
    this.activeAdvisory = {
      ...this.activeAdvisory,
      status: 'DISPATCHED'
    };
    return this.activeAdvisory;
  }
}

export const alertManager = new AlertManager();