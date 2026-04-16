"use client";

import { Html } from "@react-three/drei";
import { convertToXYZ } from "@/lib/geo";

export function FloatingWeatherCard({ city, weather, isSelected = false, onSelect }) {
  if (!city || !weather) {
    return null;
  }

  const position = convertToXYZ(city.lat, city.lon, 6.8);

  return (
    <group position={position}>
      <Html distanceFactor={12} center transform sprite>
        <button
          className={`weather-card-3d ${isSelected ? "is-selected" : ""}`}
          onClick={() => onSelect?.(city)}
          type="button"
        >
          <span className="weather-card-3d__eyebrow">{weather.label}</span>
          <strong>
            {city.name}, {city.countryCode}
          </strong>
          <span className="weather-card-3d__temp">{weather.temperature}°C</span>
          <span className="weather-card-3d__meta">
            Feels like {weather.feelsLike}°C
          </span>
        </button>
      </Html>
    </group>
  );
}
