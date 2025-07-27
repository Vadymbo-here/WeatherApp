import { useCustomSelector } from "../../../../store/hook";
import ForecastItem from "./ForecastItem";

import styles from "./forecastList.module.scss";

import { CircleLoader } from "react-spinners";

function ForecastList() {
  const forecast = useCustomSelector((store) => store.weather.weekly);

  if (!forecast) {
    return (
      <ul className={styles["container"]}>
        <CircleLoader
          color="rgb(54, 215, 183)"
          size={100}
        />
      </ul>
    );
  }

  return (
    <ul className={styles["container"]}>
      {forecast.map((day, index) => (
        <ForecastItem
          day={day.day}
          icon={day.icon}
          temp_max={day.temp_max}
          temp_min={day.temp_min}
          key={index}
        />
      ))}
    </ul>
  );
}

export default ForecastList;
