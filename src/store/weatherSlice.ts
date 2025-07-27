import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// forecast for today
export interface IDailySummary {
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  dominantWeather: string;
  description: string;
  wind_speed_avg: number;
  icon: string;
}

// forecast for 7 days
export interface IDailyForecast {
  day: string;
  temp_min: number;
  temp_max: number;
  icon: string;
}

export interface IWeatherData {
  summary: IDailySummary | null;
  weekly: IDailyForecast[];
  error: string;
}

const initialState: IWeatherData = {
  summary: null,
  weekly: [],
  error: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<Omit<IWeatherData, "error">>) {
      state.summary = action.payload.summary;
      state.weekly = action.payload.weekly;
    },
    clearWeatherData(state) {
      state.summary = null;
      state.weekly = [];
      state.error = "";
    },
    setError(state, action: PayloadAction<string>) {
      // Payload ERROR message
      state.error = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const { setWeatherData, clearWeatherData, setError } = weatherSlice.actions;
