import { useEffect } from "react";
import styles from "./app.module.scss";

import SideBar from "./components/SideBar/SideBars";

import { useCustomDispatch, useCustomSelector } from "./store/hook";
import { setCoordinates } from "./store/geocodingSlice";

import { getCoordsByIP, type ICoordinates } from "./services/geocoding";

import { setWeatherData } from "./store/weatherSlice";
import { getWeather } from "./services/weatherService";

function App() {
  const dispatch = useCustomDispatch();
  const { lat, lon, isReady } = useCustomSelector((store) => store.geocoding);
  const currentWeather = useCustomSelector(
    (store) => store.weather.weather[0].main
  );

  useEffect(() => {
    async function fetchCoords() {
      const coords: ICoordinates | null = await getCoordsByIP();
      if (coords) {
        dispatch(setCoordinates(coords));
      }
    }
    fetchCoords();
  }, []);
  // useEffect(() => {
  //   async function fetchWeather() {
  //     if (!isReady) return;
  //     const { weather, main, wind } = await getWeather(lat, lon);
  //     dispatch(setWeatherData({ weather, main, wind }));
  //   }
  //   fetchWeather();
  // }, [lat, lon, isReady, dispatch]);

  const backgroundMap: Record<string, string> = {
    Clear: styles["main__bgClear"],
    Clouds: styles["main__bgCloudy"],
    Rain: styles["main__bgRainy"],
    Thunderstorm: styles["main__bgStorm"],
    Snow: styles["main__bgSnow"],
    Drizzle: styles["main__bgDrizzle"],
    Mist: styles["main__bgFog"],
    Fog: styles["main__bgFog"],
  };

  const backgroundImg =
    backgroundMap[currentWeather || ""] || styles["bgDefault"];

  return (
    <main
      // style={{
      //   backgroundImage: `url("../fog.jpg")`,
      //   backgroundSize: "cover",
      //   width: "100vw",
      //   height: "100vh",
      // }}
      className={`${styles["main"]} ${backgroundImg}`}>
      <SideBar />
    </main>
  );
}

export default App;
