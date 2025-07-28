import { useState, type FormEvent } from "react";

import styles from "./searchInput.module.scss";

import { useCustomDispatch } from "../../store/hook";
import { setCoordinates } from "../../store/geocodingSlice";

function SearchInput() {
  const [city, setCity] = useState("");

  const dispatch = useCustomDispatch();

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!city.trim()) return;
    dispatch(setCoordinates({ lat: null, lon: null, city }));
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
