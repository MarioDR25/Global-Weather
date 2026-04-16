import { Earth } from "./Earth";
import { Marker } from "./Marker";
import { MARKER_SURFACE_RADIUS } from "./constants";
import { FloatingWeatherCard } from "../weather/FloatingWeatherCard";

export function Globe({ cities = [], selectedCity, weatherByCity = {}, onSelectCity }) {
  return (
    <group>
      <Earth />
      {cities.map((city) => (
        <Marker
          key={city.id}
          lat={city.lat}
          lon={city.lon}
          radius={MARKER_SURFACE_RADIUS}
          color={selectedCity?.id === city.id ? city.accent : "#7dd3fc"}
          onSelect={onSelectCity ? () => onSelectCity(city) : undefined}
        />
      ))}
      {selectedCity ? (
        <FloatingWeatherCard
          city={selectedCity}
          weather={weatherByCity[selectedCity.id]}
          isSelected
          onSelect={onSelectCity}
        />
      ) : null}
    </group>
  );
}
