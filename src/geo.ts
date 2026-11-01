import geoip from "geoip-lite";

export function locate(ip: string) {
  const match = geoip.lookup(ip);
  if (!match) return { city: null, country: null };
  return {
    city: match.city || null,
    country: match.country || null,
  };
}
