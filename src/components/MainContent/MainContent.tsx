import SearchInput from "../SearchInput/SearchInput";
import styles from "./styles/mainContent.module.scss";

function MainContent() {
  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__title"]}>Weather App</h2>
      <SearchInput />
    </div>
  );
}

export default MainContent;
