"use client"
import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/globe/Globe";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "@/components/globe/Loading"
import { getWeather } from "@/components/weather/weatherApi";
import { WeatherUI } from "@/components/weather/UI";
import { CITY_OPTIONS } from "@/lib/cities";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(CITY_OPTIONS[0]);
  const [query, setQuery] = useState("");
  const [weatherByCity, setWeatherByCity] = useState({});
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      if (!selectedCity || weatherByCity[selectedCity.id]) {
        return;
      }

      setIsLoadingWeather(true);

      try {
        const weather = await getWeather(selectedCity);

        if (!isMounted) {
          return;
        }

        setWeatherByCity((current) => ({
          ...current,
          [selectedCity.id]: weather,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoadingWeather(false);
        }
      }
    }

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [selectedCity, weatherByCity]);

  return (
    <main className="page-shell">
      <WeatherUI
        selectedCity={selectedCity}
        weather={selectedCity ? weatherByCity[selectedCity.id] : null}
        isLoading={isLoadingWeather}
        query={query}
        onQueryChange={setQuery}
        onSelectCity={setSelectedCity}
      />

      <div className="globe-stage">
        <Canvas camera={{ position: [6, -2, 15], fov: 50 }}>
          <Suspense fallback={<Loading />}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[5, 3, 5]} intensity={1.35} />
            <directionalLight position={[-4, -1, -5]} intensity={0.45} />
            <hemisphereLight args={["#b8c4ff", "#080820", 0.35]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            <Globe
              cities={CITY_OPTIONS}
              selectedCity={selectedCity}
              weatherByCity={weatherByCity}
              onSelectCity={setSelectedCity}
            />
            <OrbitControls
              enablePan={false}
              rotateSpeed={0.2}
              zoomSpeed={0.6}
              minDistance={8}
              maxDistance={28}
              enableDamping={true}
            />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}

