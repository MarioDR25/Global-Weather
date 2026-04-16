"use client";

import { useEffect, useRef, useState } from "react";
import { findCityByQuery } from "@/lib/cities";

export function WeatherUI({
  selectedCity,
  weather,
  isLoading,
  query,
  onQueryChange,
  onSelectCity,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rootRef = useRef(null);
  const filteredCities = findCityByQuery(query).slice(0, 6);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function handleSelectCity(city) {
    onSelectCity(city);
    onQueryChange(city.name);
    setIsDropdownOpen(false);
  }

  return (
    <div className="weather-shell" ref={rootRef}>
      <div className="weather-shell__panel">
        <p className="weather-shell__eyebrow">Global weather explorer</p>
        <h1>Busca una ciudad</h1>
        <p className="weather-shell__copy">Selecciona una opción y revisa su clima en el globo.</p>

        <label className="city-search" htmlFor="city-search">
          <span>Buscar ciudad</span>
          <div className="city-search__field">
            <input
              id="city-search"
              name="city-search"
              type="text"
              placeholder="Madrid, Tokyo, Cape Town..."
              value={query}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(event) => {
                onQueryChange(event.target.value);
                setIsDropdownOpen(true);
              }}
            />
            <button
              type="button"
              className="city-search__toggle"
              aria-label="Mostrar ciudades"
              onClick={() => setIsDropdownOpen((current) => !current)}
            >
              {isDropdownOpen ? "▲" : "▼"}
            </button>
          </div>
        </label>

        {isDropdownOpen ? (
          <div className="city-results" role="list">
            {filteredCities.length ? (
              filteredCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  role="listitem"
                  className={`city-result ${selectedCity?.id === city.id ? "is-active" : ""}`}
                  onClick={() => handleSelectCity(city)}
                >
                  <span className="city-result__name">
                    {city.name}, {city.countryCode}
                  </span>
                  <small>{city.country}</small>
                </button>
              ))
            ) : (
              <div className="city-results__empty">No hay coincidencias.</div>
            )}
          </div>
        ) : null}

        <div className="weather-shell__summary">
          <div>
            <p className="weather-shell__eyebrow">Ciudad activa</p>
            <h2>
              {selectedCity?.name}, {selectedCity?.country}
            </h2>
          </div>

          {isLoading ? (
            <p className="weather-shell__status">Cargando clima...</p>
          ) : weather ? (
            <div className="weather-stats">
              <div>
                <span>Temp.</span>
                <strong>{weather.temperature}°C</strong>
              </div>
              <div>
                <span>Sens.</span>
                <strong>{weather.feelsLike}°C</strong>
              </div>
              <div>
                <span>Humedad</span>
                <strong>{weather.humidity}%</strong>
              </div>
              <div>
                <span>Viento</span>
                <strong>{weather.windSpeed} m/s</strong>
              </div>
            </div>
          ) : (
            <p className="weather-shell__status">Selecciona una ciudad para ver su clima.</p>
          )}
        </div>

        {isLoading ? (
          <div className="weather-shell__hint">Actualizando datos...</div>
        ) : (
          <div className="weather-shell__hint">Haz clic en un marcador o usa el buscador.</div>
        )}
      </div>
    </div>
  );
}
