import { useEffect, useState } from "react";

import styles from "./app.module.scss";

import { CircleLoader } from "react-spinners";

import { useCustomDispatch, useCustomSelector } from "./store/hook";
import { setCoordinates } from "./store/geocodingSlice";

import { getCoordsByIP, type ICoordinates } from "./services/geocoding/geocoding";

import CitiesList from "./components/CitiesList/CitiesList";
import MainContent from "./components/MainContent/MainContent";
import { loadWeatherAuto } from "./store/weatherThunk";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useCustomDispatch();
  const { lat, lon, city } = useCustomSelector((store) => store.geocoding);

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
    dispatch(loadWeatherAuto());
    setIsLoading(false);
  }, [lat, lon, dispatch, city]);

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
