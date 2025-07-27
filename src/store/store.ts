import { configureStore } from "@reduxjs/toolkit";

import geocodingReducer from "./geocodingSlice";
import weatherReducer from "./weatherSlice";
import citiesReducer from "./citiesSlice";
import undoReducer from "./undoSlice";

export const store = configureStore({
  reducer: {
    geocoding: geocodingReducer,
    weather: weatherReducer,
    cities: citiesReducer,
    undo: undoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
