import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../services/weather/weatherService";
import { setWeatherData } from "./weatherSlice";
import { addCity } from "./citiesSlice";
import type { RootState } from "./store";

export const loadWeatherAuto = createAsyncThunk("weather/loadAuto", async (_, { dispatch, getState }) => {
  const state = getState() as RootState;
  const { lat, lon, city, isReady } = state.geocoding;

  if (!isReady) return;

  //   if (state.weather.summary && state.weather.weekly) return;

  let weather;
  if (lat && lon) {
    weather = await getWeather(lat, lon);
  } else if (city) {
    weather = await getWeather(city);
  } else {
    return;
  }

  dispatch(setWeatherData({ summary: weather.summary, weekly: weather.weekly }));
  dispatch(addCity(city));
});
