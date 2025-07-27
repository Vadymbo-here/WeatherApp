import { fetchForecast } from "./weatherApiClient";
import { extractTodaySummary, extractWeeklyForecast } from "./weatherParsers";
import type { IForecastResponse, IWeatherDataExtend } from "./weather.types";

export async function getWeather(lat: number, lon: number): Promise<IWeatherDataExtend>;
export async function getWeather(q: string): Promise<IWeatherDataExtend>;

export async function getWeather(param1: number | string, param2?: number): Promise<IWeatherDataExtend> {
  const params: Record<string, string | number> = {};

  if (typeof param1 === "string") {
    params.q = param1;
  } else if (typeof param1 === "number" && typeof param2 === "number") {
    params.lat = param1;
    params.lon = param2;
  } else {
    throw new Error("Invalid arguments passed to getWeather");
  }

  const data: IForecastResponse = await fetchForecast(params);
  const today = new Date().toISOString().split("T")[0];
  const todayData = data.list.filter((i) => i.dt_txt.startsWith(today));
  const coords = data.city.coord;

  return {
    summary: extractTodaySummary(todayData),
    weekly: extractWeeklyForecast(data.list),
    coords,
  };
}
