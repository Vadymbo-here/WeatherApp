import { useCustomDispatch, useCustomSelector } from "../../store/hook";
import { hideUndo } from "../../store/undoSlice";
import { addCity } from "../../store/citiesSlice";

import styles from "./styles/undoWindow.module.scss";

export default function UndoWindow() {
  const { visible, city, timeoutId } = useCustomSelector((store) => store.undo);
  const dispatch = useCustomDispatch();

  const handleUndo = () => {
    if (timeoutId) clearTimeout(timeoutId);
    dispatch(hideUndo());
    dispatch(addCity(city));
  };

  return (
    <div className={`${styles["container"]} ${visible && styles["container--visible"]}`}>
      <button
        onClick={handleUndo}
        className={styles["container__cancel-btn"]}>
        Cancel
      </button>
    </div>
  );
}
