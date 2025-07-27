import type { IDailyForecast } from "../../../../store/weatherSlice";
import styles from "./forecastItem.module.scss";

const ICON_URL = import.meta.env.VITE_TODAY_WEATHER_ICON_URL;

function ForecastItem({ day, icon, temp_max, temp_min }: IDailyForecast) {
  const isMaxTempPositive = temp_max > 0;
  const isMinTempPositive = temp_min > 0;
  return (
    <li className={styles["container"]}>
      <p>{day}</p>
      <img
        src={`${ICON_URL}/${icon}@2x.png`}
        alt="weather photo"
        className={styles["container__weather-photo"]}
      />
      <p>
        {isMinTempPositive ? "+" : "-"}
        {temp_min}
      </p>
      <p>
        {isMaxTempPositive ? "+" : "-"}
        {temp_max}
      </p>
    </li>
  );
}

export default ForecastItem;
