import { useCustomSelector } from "../../store/hook";
import styles from "./citiesList.module.scss";
import CityItem from "./CityItem";

function CitiesList() {
  const cities = useCustomSelector((store) => store.cities.cities);

  return (
    <div className={styles["container"]}>
      <ol className={styles["container__list"]}>
        {cities.map((city, index) => (
          <CityItem
            city={city.name}
            key={index}
          />
        ))}
      </ol>
    </div>
  );
}

export default CitiesList;
