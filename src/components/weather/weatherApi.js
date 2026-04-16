const fallbackConditions = [
  { label: "Clear Sky", icon: "01d" },
  { label: "Scattered Clouds", icon: "03d" },
  { label: "Light Rain", icon: "10d" },
  { label: "Windy", icon: "50d" },
];

function createFallbackWeather(city) {
  const seed = city.name.length + Math.round(Math.abs(city.lat) + Math.abs(city.lon));
  const condition = fallbackConditions[seed % fallbackConditions.length];
  const temperature = Math.round(11 + (seed % 19));
  const feelsLike = temperature + ((seed % 3) - 1);
  const humidity = 48 + (seed % 40);
  const windSpeed = Number((1.8 + (seed % 7) * 0.55).toFixed(1));

  return {
    id: city.id,
    cityName: city.name,
    countryCode: city.countryCode,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    label: condition.label,
    icon: condition.icon,
  };
}

function normalizeWeatherResponse(city, data) {
  return {
    id: city.id,
    cityName: data.name ?? city.name,
    countryCode: data.sys?.country ?? city.countryCode,
    temperature: Math.round(data.main?.temp ?? 0),
    feelsLike: Math.round(data.main?.feels_like ?? 0),
    humidity: data.main?.humidity ?? 0,
    windSpeed: Number((data.wind?.speed ?? 0).toFixed(1)),
    label: data.weather?.[0]?.description ?? "Current conditions",
    icon: data.weather?.[0]?.icon ?? "01d",
  };
}

export async function getWeather(city) {
  if (!city) {
    throw new Error("A city is required to fetch weather data.");
  }

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    return createFallbackWeather(city);
  }

  const params = new URLSearchParams({
    lat: String(city.lat),
    lon: String(city.lon),
    appid: apiKey,
    units: "metric",
  });

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Unable to fetch weather data.");
  }

  return normalizeWeatherResponse(city, data);
}
