import type { ITodayWeather } from "../store/weatherSlice";
import { mostFrequent } from "../utils/utils";

export interface IWeatherItem {
  dt: number;
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
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  dt_txt: string;
}

export interface IForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getWeather(lat: number, lon: number): Promise<ITodayWeather>; // if you want to use the function with coordinates
export async function getWeather(q: string): Promise<ITodayWeather>; // if you want to use the function with city name

export async function getWeather(param1: number | string, param2?: number): Promise<ITodayWeather> {
  const params = new URLSearchParams({
    appid: API_KEY,
    units: "metric",
  });

  if (typeof param1 === "string") {
    params.append("q", param1);
  } else if (typeof param1 === "number" && typeof param2 === "number") {
    params.append("lat", param1.toString());
    params.append("lon", param2.toString());
  } else {
    throw new Error("Invalid arguments passed to getWeather");
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: IForecastResponse = await response.json();

  const today = new Date().toISOString().split("T")[0];

  const todayData = data.list.filter((item) => item.dt_txt.startsWith(today));

  const hourly = todayData.map((item) => ({
    time: item.dt_txt.slice(11, 16),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
    weather: item.weather[0].main,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));

  const temps = todayData.map((item) => item.main.temp);
  const weatherTypes = todayData.map((item) => item.weather[0].main);
  const descriptions = todayData.map((item) => item.weather[0].description);
  const windSpeeds = todayData.map((item) => item.wind.speed);

  const summary = {
    temp_min: Math.round(Math.min(...temps)),
    temp_max: Math.round(Math.max(...temps)),
    temp_avg: +(temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
    dominantWeather: mostFrequent(weatherTypes),
    description: mostFrequent(descriptions),
    wind_speed_avg: +(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length).toFixed(1),
  };

  return {
    hourly,
    summary,
  };
}
