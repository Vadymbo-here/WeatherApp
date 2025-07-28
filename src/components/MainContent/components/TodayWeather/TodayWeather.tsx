import { useCustomSelector } from "../../../../store/hook";
import styles from "./todayWeather.module.scss";

import { CircleLoader } from "react-spinners";

const ICON_URL = import.meta.env.VITE_TODAY_WEATHER_ICON_URL;

function TodayWeather() {
  const todayWeather = useCustomSelector((store) => store.weather.summary);
  const currentCity = useCustomSelector((store) => store.geocoding.city);

  if (!todayWeather) {
    return (
      <div className={styles["container"]}>
        <CircleLoader
          color="rgb(54, 215, 183)"
          size={100}
        />
      </div>
    );
  }
  const isPositiveTemp = todayWeather.temp_avg > 0;

  return (
    <div className={styles["container"]}>
      <div className={styles["container__header"]}>
        <img
          src={`${ICON_URL}/${todayWeather?.icon}@2x.png`}
          alt="Weather icon"
          className={styles["container__weather-icon"]}
        />
        <h2 className={styles["container__title"]}>{currentCity}</h2>
      </div>
      <p className={styles["container__temp-avg"]}>
        {isPositiveTemp && "+"}
        {todayWeather.temp_avg}
        °C
      </p>
      <p className={styles["container__description"]}>{todayWeather.description}</p>
      <div className={styles["container__weather-details"]}>
        <div className={styles["container__temperature"]}>
          <p className={styles["container__temperature-label"]}>Temp:</p>
          <p className={styles["container__temperature-min"]}>{todayWeather.temp_min}°C</p>
          <span className={styles["container__temperature-separator"]}>/</span>
          <p className={styles["container__temperature-max"]}>{todayWeather.temp_max}°C</p>
        </div>
        <p className={styles["container__wind"]}>Wind: {todayWeather.wind_speed_avg} m/s</p>
      </div>
    </div>
  );
}

export default TodayWeather;
