import { setCoordinates } from "../../store/geocodingSlice";
import { useCustomDispatch, useCustomSelector } from "../../store/hook";
import styles from "./styles/citiesList.module.scss";

function CitiesList() {
  const cities = useCustomSelector((store) => store.cities.cities);
  const dispatch = useCustomDispatch();

  function handleChangeCity(city: string) {
    dispatch(setCoordinates({ lat: null, lon: null, city }));
  }

  return (
    <div className={styles["container"]}>
      <ul>
        {cities.map((city) => (
          <li
            key={city.name}
            onClick={() => handleChangeCity(city.name)}>
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitiesList;
