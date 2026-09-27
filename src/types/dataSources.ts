export interface DataSourceInfo {
  id: string;
  name: string;
  provider: string;
  category: 'satellite' | 'meteorology' | 'gis' | 'dem' | 'civil';
  status: 'ONLINE' | 'DEGRADED' | 'FALLBACK_MOCK';
  latencyMs: number;
  lastUpdated: string;
  provenanceTag: string;
  resolution: string;
}