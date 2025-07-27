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

// Погода на сьогодні
export interface IDailySummary {
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  dominantWeather: string;
  description: string;
  wind_speed_avg: number;
}

// Прогноз на 7 днів
export interface IDailyForecast {
  day: string;
  temp_min: number;
  temp_max: number;
  icon: string;
}

// Дані, які зберігаються в Redux
export interface ITodayWeather {
  summary: IDailySummary;
  weekly: IDailyForecast[];
}
