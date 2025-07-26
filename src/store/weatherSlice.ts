import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IWeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
}

const initialState: IWeatherData = {
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<IWeatherData>) {
      state.weather = action.payload.weather;
      state.main = action.payload.main;
      state.wind = action.payload.wind;
    },
  },
});

export default weatherSlice.reducer;
export const { setWeatherData } = weatherSlice.actions;
