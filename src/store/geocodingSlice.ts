import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IGeocodingState {
  lat: number;
  lon: number;
  city: string;
}

interface IInitialState extends IGeocodingState {
  isReady: boolean;
}

const intialState: IInitialState = {
  lat: 0,
  lon: 0,
  city: "",
  isReady: false,
};

const geocodingSlice = createSlice({
  name: "geocoding",
  initialState: intialState,
  reducers: {
    setCoordinates(
      state,
      action: PayloadAction<{
        lat: number;
        lon: number;
        city: string;
      }>
    ) {
      const { lat, lon, city } = action.payload;
      state.lat = lat;
      state.lon = lon;
      state.city = city;
      state.isReady = true;
    },
    resetCoordinates(state) {
      state.lat = 0;
      state.lon = 0;
      state.city = "";
      state.isReady = false;
    },
  },
});

export default geocodingSlice.reducer;
export const { setCoordinates, resetCoordinates } = geocodingSlice.actions;
