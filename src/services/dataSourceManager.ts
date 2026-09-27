import { DataSourceInfo } from '../types/dataSources';

export function getDataSourceRegistry(): DataSourceInfo[] {
  return [
    {
      id: 'DS-01',
      name: 'Sentinel-1 Synthetic Aperture Radar (SAR)',
      provider: 'European Space Agency (ESA) / Google Earth Engine',
      category: 'satellite',
      status: 'ONLINE',
      latencyMs: 142,
      lastUpdated: '10 mins ago (08:24 UTC Scene)',
      provenanceTag: 'GEE:COPERNICUS/S1_GRD',
      resolution: '10m spatial / All-weather radar'
    },
    {
      id: 'DS-02',
      name: 'Doppler Weather Radar (DWR) & AWS Feed',
      provider: 'India Meteorological Department (IMD)',
      category: 'meteorology',
      status: 'ONLINE',
      latencyMs: 65,
      lastUpdated: '5 mins ago',
      provenanceTag: 'IMD-DWR-PARADIP-SURFACE',
      resolution: '1km radial velocity & reflectivity'
    },
    {
      id: 'DS-03',
      name: 'Sentinel-2 MSI Surface Water Index (MNDWI)',
      provider: 'Copernicus / Google Earth Engine',
      category: 'satellite',
      status: 'ONLINE',
      latencyMs: 180,
      lastUpdated: '2 hours ago',
      provenanceTag: 'GEE:COPERNICUS/S2_SR_HARMONIZED',
      resolution: '10m multi-spectral'
    },
    {
      id: 'DS-04',
      name: 'NASADEM Global Elevation Model',
      provider: 'NASA / GEE',
      category: 'dem',
      status: 'ONLINE',
      latencyMs: 35,
      lastUpdated: 'Static Baseline',
      provenanceTag: 'GEE:NASA/NASADEM_HGT/001',
      resolution: '30m vertical resolution 1m'
    },
    {
      id: 'DS-05',
      name: 'Critical Infrastructure & Road GIS Topology',
      provider: 'Odisha State Geo-Spatial Data Infrastructure (OSDI) & OSM',
      category: 'gis',
      status: 'ONLINE',
      latencyMs: 40,
      lastUpdated: '1 day ago',
      provenanceTag: 'OSDI-INFRA-GEOJSON',
      resolution: 'Vector Point & Line Geometry'
    }
  ];
}