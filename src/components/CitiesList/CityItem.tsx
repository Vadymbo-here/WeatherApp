import type { MouseEvent } from "react";
import styles from "./cityItem.module.scss";

import { setCoordinates } from "../../store/geocodingSlice";
import { useCustomDispatch, useCustomSelector } from "../../store/hook";
import { removeCity } from "../../store/citiesSlice";

type CityItemProps = {
  city: string;
};

function CityItem({ city }: CityItemProps) {
  const dispatch = useCustomDispatch();
  const currentCity = useCustomSelector((store) => store.geocoding.city);
  const cityListLength = useCustomSelector((store) => store.cities.cities).length;

  const isSelected = currentCity === city;

  function handleChangeCity(city: string) {
    dispatch(setCoordinates({ lat: null, lon: null, city }));
  }
  function handleDelteCity(event: MouseEvent<HTMLButtonElement>, city: string) {
    event.stopPropagation();
    if (cityListLength < 2) return;
    dispatch(removeCity(city));
  }

  return (
    <li
      onClick={() => handleChangeCity(city)}
      className={`${styles["container"]} ${isSelected && styles["container--active"]}`}>
      <p className={styles["container__city"]}>{city}</p>
      <button
        className={styles["container__remove-btn"]}
        onClick={(event) => handleDelteCity(event, city)}></button>
    </li>
  );
}

export default CityItem;
