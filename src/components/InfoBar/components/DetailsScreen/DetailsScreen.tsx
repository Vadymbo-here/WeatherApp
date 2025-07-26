import { useCustomSelector } from "../../../../store/hook";
import styles from "./styles/detailsScreen.module.scss";

function DetailsScreen() {
  const weatherDetails = useCustomSelector((store) => store.weather.today?.summary);

  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__description"]}>{weatherDetails?.description}</h2>
      <div className={`${styles["container__max-temp-container"]} ${styles["container__block-layout"]}`}>
        <p className={`${styles["container__max-temp-label"]} ${styles["container__text"]}`}>Temp max</p>
        <p className={`${styles["container__max-temp-value"]} ${styles["container__text"]}`}>
          {weatherDetails?.temp_max}
        </p>
      </div>
      <div className={`${styles["container__min-temp-container"]} ${styles["container__block-layout"]}`}>
        <p className={`${styles["container__min-temp-label"]} ${styles["container__text"]}`}>Temp min</p>
        <p className={`${styles["container__min-temp-value"]} ${styles["container__text"]}`}>
          {weatherDetails?.temp_min}
        </p>
      </div>
      <div className={`${styles["container__avg-wind-container"]} ${styles["container__block-layout"]}`}>
        <p className={`${styles["container__avg-wind-label"]} ${styles["container__text"]}`}>Wind</p>
        <p className={`${styles["container__avg-wind-value"]} ${styles["container__text"]}`}>
          {weatherDetails?.wind_speed_avg}m/s
        </p>
      </div>
    </div>
  );
}

export default DetailsScreen;
