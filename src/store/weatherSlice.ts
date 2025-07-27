import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Зведення по сьогоднішньому дню
export interface IDailySummary {
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  dominantWeather: string;
  description: string;
  wind_speed_avg: number;
  icon: string;
}

// Прогноз на 7 днів
export interface IDailyForecast {
  day: string;
  temp_min: number;
  temp_max: number;
  icon: string;
}

export interface IWeatherData {
  summary: IDailySummary | null;
  weekly: IDailyForecast[];
}

const initialState: IWeatherData = {
  summary: null,
  weekly: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<IWeatherData>) {
      state.summary = action.payload.summary;
      state.weekly = action.payload.weekly;
    },
    clearWeatherData(state) {
      state.summary = null;
      state.weekly = [];
    },
  },
});

export default weatherSlice.reducer;
export const { setWeatherData, clearWeatherData } = weatherSlice.actions;
