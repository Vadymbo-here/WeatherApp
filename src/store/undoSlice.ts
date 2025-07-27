import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UndoState {
  visible: boolean;
  city: string;
  timeoutId: number | null;
}

const initialState: UndoState = {
  visible: false,
  city: "",
  timeoutId: null,
};

const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {
    showUndo(state, action: PayloadAction<{ city: string; timeoutId: number }>) {
      state.visible = true;
      state.city = action.payload.city;
      state.timeoutId = action.payload.timeoutId;
    },
    hideUndo(state) {
      state.visible = false;
      state.city = "";
      state.timeoutId = null;
    },
  },
});

export const { showUndo, hideUndo } = undoSlice.actions;
export default undoSlice.reducer;
