export function getGEELayerEndpoint(layerType: 'sar' | 'mndwi' | 'elevation'): string {
  // Real or mock tile endpoint for visualization
  return `https://earthengine.googleapis.com/v1/projects/earthengine-public/maps/cycloneshield-${layerType}-varuna/{z}/{x}/{y}`;
}