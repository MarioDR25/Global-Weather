export const convertToXYZ = (lat, lon, radius) => {
  const PHI = lat * (Math.PI / 180);
  const THETA = (lon + 90) * (Math.PI / 180);

  const X = radius * Math.cos(PHI) * Math.sin(THETA);
  const Y = radius * Math.sin(PHI);
  const Z = radius * Math.cos(PHI) * Math.cos(THETA);

  return [X, Y, Z];
};