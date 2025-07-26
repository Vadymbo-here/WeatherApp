import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICity {
  id: string;
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
      const id = new Date() + Math.random().toString();
      state.cities.push({ name: action.payload, id });
    },
    removeCity(state, action: PayloadAction<string>) {
      // Payload is the city ID
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
});

export default citiesSlice.reducer;
export const { addCity, removeCity } = citiesSlice.actions;
