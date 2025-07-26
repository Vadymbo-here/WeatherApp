import styles from "./styles/infoBar.module.scss";

import SearchInput from "../SearchInput/SearchInput";
import DetailsScreen from "./components/DetailsScreen/DetailsScreen";

function InfoBar() {
  return (
    <div className={styles["container"]}>
      <SearchInput />
      <p className={styles["container__title"]}>Weather Details</p>
      <DetailsScreen />
    </div>
  );
}

export default InfoBar;
