import type { IWeatherData } from "../../store/weatherSlice";

// Один запис про погоду з forecast API
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
    coord: { lat: number; lon: number };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface IWeatherDataExtend extends IWeatherData {
  coords: { lat: number; lon: number };
}
