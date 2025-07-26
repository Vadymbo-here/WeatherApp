import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICity {
  name: string;
}
interface ICitiesState {
  cities: ICity[];
}
const initialState: ICitiesState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<string>) {
      // Payload is the city name
      if (state.cities.some((city) => city.name === action.payload)) return;
      state.cities.push({ name: action.payload });
    },
    removeCity(state, action: PayloadAction<string>) {
      // Payload is the city NAME
      state.cities = state.cities.filter((city) => city.name !== action.payload);
    },
  },
});

export default citiesSlice.reducer;
export const { addCity, removeCity } = citiesSlice.actions;
