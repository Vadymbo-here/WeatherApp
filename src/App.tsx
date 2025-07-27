import { useEffect, useMemo, useState } from "react";

import styles from "./app.module.scss";

import { CircleLoader } from "react-spinners";

import { useCustomDispatch, useCustomSelector } from "./store/hook";
import { setCoordinates } from "./store/geocodingSlice";

import { getCoordsByIP, type ICoordinates } from "./services/geocoding/geocoding";

import { setWeatherData } from "./store/weatherSlice";
import { getWeather } from "./services/weather/weatherService";
import CitiesList from "./components/CitiesList/CitiesList";
import MainContent from "./components/MainContent/MainContent";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useCustomDispatch();
  const { lat, lon, isReady } = useCustomSelector((store) => store.geocoding);
  const weatherData = useCustomSelector((store) => store.weather.summary);

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
    <main className={styles["main"]}>
      <div className={styles["main__content"]}>
        <CitiesList />
        <MainContent />
      </div>
    </main>
  );
}

export default App;
