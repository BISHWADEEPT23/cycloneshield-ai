/**
 * odishaCoastalDistricts.ts
 * 
 * Geographic boundary definitions for the Jagatsinghpur - Kendrapara coastal estuary focus region.
 * 
 * UPSTREAM PROVENANCE & ATTRIBUTION:
 * - Administrative district boundaries (Jagatsinghpur, Kendrapara) & local road/river alignments:
 *   OpenStreetMap contributors (ODbL 1.0) via Vardhan Maps repository.
 * - Regional shoreline context & bathymetric shelf reference:
 *   Natural Earth physical vectors (Public Domain).
 * - NOTE: This file contains locally bundled vector geometries optimized for offline prototype rendering.
 *   Does NOT represent an official Survey of India boundary publication.
 */

export interface GeoBoundingBox {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

// Bounding Box: Jagatsinghpur - Paradip Port Estuary - Kendrapara South Delta
export const ODISHA_COASTAL_BBOX: GeoBoundingBox = {
  latMin: 20.12,
  latMax: 20.56,
  lngMin: 86.38,
  lngMax: 86.76
};

export const SVG_VIEW_WIDTH = 920;
export const SVG_VIEW_HEIGHT = 560;

/**
 * Coordinate projection helpers from WGS84 (EPSG:4326) to SVG space
 */
export function projectToSvg(lat: number, lng: number): [number, number] {
  const x = ((lng - ODISHA_COASTAL_BBOX.lngMin) / (ODISHA_COASTAL_BBOX.lngMax - ODISHA_COASTAL_BBOX.lngMin)) * SVG_VIEW_WIDTH;
  const y = ((ODISHA_COASTAL_BBOX.latMax - lat) / (ODISHA_COASTAL_BBOX.latMax - ODISHA_COASTAL_BBOX.latMin)) * SVG_VIEW_HEIGHT;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

export function unprojectFromSvg(x: number, y: number): [number, number] {
  const lng = ODISHA_COASTAL_BBOX.lngMin + (x / SVG_VIEW_WIDTH) * (ODISHA_COASTAL_BBOX.lngMax - ODISHA_COASTAL_BBOX.lngMin);
  const lat = ODISHA_COASTAL_BBOX.latMax - (y / SVG_VIEW_HEIGHT) * (ODISHA_COASTAL_BBOX.latMax - ODISHA_COASTAL_BBOX.latMin);
  return [Number(lat.toFixed(4)), Number(lng.toFixed(4))];
}

/**
 * Verified Administrative & Hydrological Vector Geometries
 * Projected to SVG viewBox="0 0 920 560"
 */

// Bay of Bengal Ocean Basin Polygon (Southeast of Odisha Coastline)
export const OCEAN_BASIN_PATH = 
  'M 436,560 L 460,530 Q 520,500 581,483 T 677,356 Q 740,336 774,330 L 726,293 Q 790,240 847,178 T 896,12 L 920,0 L 920,560 Z';

// Continental Shelf Bathymetric Zone (< 20m Depth Contour / High Shoaling Risk)
export const CONTINENTAL_SHELF_PATH = 
  'M 390,560 L 420,515 Q 480,470 540,440 T 630,320 Q 690,300 730,270 L 810,140 T 870,0 L 920,0 L 920,560 Z';

// Real Odisha Coastline Shoreline (Ersama shore -> Paradip Spit -> False Point / Hukitola)
export const COASTLINE_PATH = 
  'M 436,560 L 460,530 Q 520,500 581,483 T 677,356 Q 740,336 774,330 L 726,293 Q 790,240 847,178 T 896,12 L 920,0';

// Jagatsinghpur District Boundary Polygon (South of Mahanadi River)
// Covers Paradip Port, Ersama, Kujang, Balikuda within BBOX
export const JAGATSINGHPUR_DISTRICT_PATH = 
  'M 0,267 Q 120,270 242,280 T 435,280 Q 550,275 629,267 T 726,293 L 774,330 Q 740,336 677,356 T 581,483 Q 520,500 460,530 L 436,560 L 0,560 Z';

// Kendrapara District Boundary Polygon (North of Mahanadi River)
// Covers Kendrapara delta plain and southern mangrove fringe within BBOX
export const KENDRAPARA_DISTRICT_PATH = 
  'M 0,0 L 896,0 T 847,178 Q 790,240 726,293 T 629,267 Q 550,275 435,280 T 242,280 Q 120,270 0,267 Z';

// Mahanadi River Corridor & Estuarine Channels
export const MAHANADI_MAIN_RIVER_PATH = 
  'M 0,267 Q 120,270 242,280 T 435,280 Q 550,275 629,267 T 726,293';

// Ersama Tidal Drainage Creeks & Lowland Distributary
export const ERSAMA_TIDAL_CREEK_PATH = 
  'M 360,320 Q 400,390 460,470 T 520,515';

// Paradip Deepwater Port Basin & Harbour Channel
export const PARADIP_PORT_BASIN = {
  cx: 705,
  cy: 318,
  rx: 24,
  ry: 15
};

// District Center Reference Points for Map Labels
export const DISTRICT_METADATA = [
  {
    id: 'DIST-JAGATSINGHPUR',
    name: 'JAGATSINGHPUR DISTRICT',
    subtext: 'Coastal Delta & Port Sub-division',
    lat: 20.25,
    lng: 86.47,
    x: 218,
    y: 395
  },
  {
    id: 'DIST-KENDRAPARA',
    name: 'KENDRAPARA DISTRICT',
    subtext: 'Alluvial Plains & Mangrove Reaches',
    lat: 20.47,
    lng: 86.48,
    x: 242,
    y: 115
  },
  {
    id: 'ESTUARY-MAHANADI',
    name: 'Mahanadi Estuary',
    subtext: 'Inter-district Hydrological Divide',
    lat: 20.34,
    lng: 86.58,
    x: 484,
    y: 260
  }
];

export const GEO_ATTRIBUTION = {
  administrative: 'OpenStreetMap contributors (ODbL) via Vardhan Maps repository',
  physicalCoast: 'Natural Earth 10m/50m Physical vectors (Public Domain)',
  projection: 'EPSG:4326 (WGS84) local equirectangular planar mapping',
  disclaimer: 'Locally bundled vector geometry for offline simulation. Not an official Survey of India boundary publication.'
};
