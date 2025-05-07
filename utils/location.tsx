//@ts-nocheck
export const getDistance = (
  lat1: Number,
  lon1: Number,
  lat2: Number,
  lon2: Number
) => {
  function toRad(x: Number) {
    return (x * Math.PI) / 180;
  }
  const R = 6378137;
  const dLat = toRad(lat2 - lat1);
  const dLong = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d / 1000;
};
