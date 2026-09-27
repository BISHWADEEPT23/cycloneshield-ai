export interface OperationalBrief {
  cycloneName: string;
  generatedAt: string;
  modelProvenance: 'GEMINI_1.5_PRO' | 'GEMINI_1.5_FLASH' | 'RULE_BASED_ENGINE_BACKUP';
  executiveSummary: string;
  tacticalDirectives: string[];
  infrastructureCriticalPoints: Array<{ asset: string; impact: string; action: string }>;
  evacuationWindows: Array<{ zone: string; hoursRemaining: number; advisory: string }>;
  uncertaintyDisclaimers: string[];
  rawReasoningTrace?: string;
}