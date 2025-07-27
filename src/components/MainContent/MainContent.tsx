import SearchInput from "../SearchInput/SearchInput";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import styles from "./styles/mainContent.module.scss";

function MainContent() {
  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__title"]}>Weather App</h2>
      <SearchInput />
      <TodayWeather />
    </div>
  );
}

export default MainContent;
