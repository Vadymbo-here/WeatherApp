import { useEffect, useMemo, useState } from "react";

import styles from "./app.module.scss";

import SideBar from "./components/SideBar/SideBars";
import { CircleLoader } from "react-spinners";

import { useCustomDispatch, useCustomSelector } from "./store/hook";
import { setCoordinates } from "./store/geocodingSlice";

import { getCoordsByIP, type ICoordinates } from "./services/geocoding";

import { setWeatherData } from "./store/weatherSlice";
import { getWeather } from "./services/weatherService";
import InfoBar from "./components/InfoBar/InfoBar";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useCustomDispatch();
  const { lat, lon, isReady } = useCustomSelector((store) => store.geocoding);
  const weatherData = useCustomSelector((store) => store.weather.today);

  useEffect(() => {
    async function fetchCoords() {
      const coords: ICoordinates | null = await getCoordsByIP();
      if (coords) {
        dispatch(setCoordinates(coords));
      }
    }
    fetchCoords();
  }, [dispatch]);

  useEffect(() => {
    async function fetchWeather() {
      if (!isReady) return;

      setIsLoading(true);

      try {
        let weather;

        if (lat && lon) {
          weather = await getWeather(lat, lon);
        } else {
          weather = await getWeather("Kyiv");
        }

        dispatch(setWeatherData(weather));
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [lat, lon, isReady, dispatch]);

  const backgroundMap: Record<string, string> = {
    Clear: styles["main__bgClear"],
    Clouds: styles["main__bgCloudy"],
    Rain: styles["main__bgRainy"],
    Thunderstorm: styles["main__bgStorm"],
    Snow: styles["main__bgSnow"],
    Drizzle: styles["main__bgDrizzle"],
    Mist: styles["main__bgFog"],
    Fog: styles["main__bgFog"],
    Smoke: styles["main__bgFog"],
    Haze: styles["main__bgFog"],
    Dust: styles["main__bgDust"],
    Sand: styles["main__bgDust"],
    Ash: styles["main__bgFog"],
    Squall: styles["main__bgSquall"],
    Tornado: styles["main__bgStorm"],
  };

  const backgroundImg = useMemo(() => {
    if (!weatherData) return styles["main__bgDefault"];
    return backgroundMap[weatherData.summary.dominantWeather] || styles["main__bgDefault"];
  }, [weatherData]);

  if (isLoading) {
    return (
      <main className={`${styles["main"]} ${styles["main--loading"]}`}>
        <CircleLoader
          color="rgb(54, 215, 183)"
          size={100}
        />
      </main>
    );
  }
  return (
    <main className={`${styles["main"]} ${backgroundImg}`}>
      <SideBar />
      <InfoBar />
    </main>
  );
}

export default App;
