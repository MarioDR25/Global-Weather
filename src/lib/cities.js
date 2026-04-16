export const CITY_OPTIONS = [
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    countryCode: "ES",
    lat: 40.4168,
    lon: -3.7038,
    accent: "#f97316",
  },
  {
    id: "Medellin",
    name: "Medellin",
    country: "Colombia",
    countryCode: "CO",
    lat: 6.2678,
    lon: -75.5678,
    accent: "#f97316",
  },
  {
    id: "caracas",
    name: "Caracas",
    country: "Venezuela",
    countryCode: "VE",
    lat: 10.4806,
    lon: -66.8778,
    accent: "#f97316",
  },    
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    countryCode: "US",
    lat: 40.7128,
    lon: -74.006,
    accent: "#38bdf8",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    lat: 35.6762,
    lon: 139.6503,
    accent: "#fb7185",
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    countryCode: "AU",
    lat: -33.8688,
    lon: 151.2093,
    accent: "#22c55e",
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    countryCode: "ZA",
    lat: -33.9249,
    lon: 18.4241,
    accent: "#a855f7",
  },
  {
    id: "sao-paulo",
    name: "Sao Paulo",
    country: "Brazil",
    countryCode: "BR",
    lat: -23.5505,
    lon: -46.6333,
    accent: "#facc15",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    lat: 1.3521,
    lon: 103.8198,
    accent: "#2dd4bf",
  },
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    countryCode: "IS",
    lat: 64.1466,
    lon: -21.9426,
    accent: "#60a5fa",
  },
];

export function findCityByQuery(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return CITY_OPTIONS;
  }

  return CITY_OPTIONS.filter((city) => {
    const haystack = `${city.name} ${city.country} ${city.countryCode}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
