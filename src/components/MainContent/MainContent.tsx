import SearchInput from "../SearchInput/SearchInput";
import ForecastList from "./components/Forecast/ForecastList";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import styles from "./styles/mainContent.module.scss";

function MainContent() {
  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__title"]}>Weather App</h2>
      <SearchInput />
      <TodayWeather />
      <h2 className={styles["container__title-forecast"]}>7-Day Forecast</h2>
      <ForecastList />
    </div>
  );
}

export default MainContent;
