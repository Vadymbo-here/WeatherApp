import { useState, type FormEvent } from "react";

import styles from "./searchInput.module.scss";

import { useCustomDispatch, useCustomSelector } from "../../store/hook";
import { setCoordinates } from "../../store/geocodingSlice";

function SearchInput() {
  const [city, setCity] = useState("");

  const dispatch = useCustomDispatch();
  const citiesListRaw = useCustomSelector((store) => store.cities);
  const citiesListFormatted = citiesListRaw.cities.map((city) => city.name.toLocaleLowerCase());

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isCityExists = citiesListFormatted.includes(city.toLocaleLowerCase());

    if (!city.trim() && !isCityExists) return;

    const formattedCity = city.trim().toLowerCase();
    const capitalizedCity = formattedCity.charAt(0).toUpperCase() + formattedCity.slice(1);

    dispatch(setCoordinates({ lat: null, lon: null, city: capitalizedCity }));
    setCity("");
  }

  return (
    <form
      className={styles["container"]}
      onSubmit={handleSearch}>
      <input
        placeholder="Enter city..."
        className={styles["container__search-input"]}
        value={city}
        onChange={(event) => setCity(event.target.value)}
        type="text"
        maxLength={30}
      />
      <button
        type="submit"
        aria-label="Search"
        className={styles["container__search-button"]}>
        Search
      </button>
    </form>
  );
}

export default SearchInput;
