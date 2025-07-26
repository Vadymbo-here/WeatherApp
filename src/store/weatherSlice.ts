import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Один запис про погоду на 3 години
export interface IHourlyWeather {
  time: string;
  temp: number;
  feels_like: number;
  weather: string;
  description: string;
  icon: string;
}

// Зведення по дню
export interface IDailySummary {
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  dominantWeather: string;
  description: string;
  wind_speed_avg: number;
}

// Загальна структура для збереження в redux
export interface ITodayWeather {
  hourly: IHourlyWeather[];
  summary: IDailySummary;
}

interface WeatherState {
  today: ITodayWeather | null;
}

const initialState: WeatherState = {
  today: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<ITodayWeather>) {
      state.today = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const { setWeatherData } = weatherSlice.actions;
