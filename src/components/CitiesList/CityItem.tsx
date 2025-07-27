import type { MouseEvent } from "react";
import styles from "./cityItem.module.scss";

import { setCoordinates } from "../../store/geocodingSlice";
import { useCustomDispatch, useCustomSelector } from "../../store/hook";
import { removeCity } from "../../store/citiesSlice";
import { hideUndo, showUndo } from "../../store/undoSlice";

type CityItemProps = {
  city: string;
};

function CityItem({ city }: CityItemProps) {
  const dispatch = useCustomDispatch();
  const currentCity = useCustomSelector((store) => store.geocoding.city);
  const citiesList = useCustomSelector((store) => store.cities.cities);

  const isSelected = currentCity === city;

  function handleChangeCity(city: string) {
    dispatch(setCoordinates({ lat: null, lon: null, city }));
  }

  function handleDelteCity(event: MouseEvent<HTMLButtonElement>, city: string) {
    event.stopPropagation();
    if (citiesList.length < 2) return;

    const nextCityIndex = citiesList.findIndex((city) => city.name === currentCity) - 1;
    const nextCity = citiesList[nextCityIndex];

    dispatch(removeCity(city));

    const timeoutId = setTimeout(() => {
      dispatch(hideUndo());
      if (nextCity.name) {
        dispatch(setCoordinates({ city: nextCity.name, lat: null, lon: null }));
      }
    }, 5000);

    dispatch(
      showUndo({
        city,
        timeoutId,
      })
    );
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
