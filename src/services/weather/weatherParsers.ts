import { format } from "date-fns";
import type { IWeatherItem } from "./weather.types";
import type { IDailySummary, IDailyForecast } from "../../store/weatherSlice";
import { mostFrequent } from "../../utils/utils";

export function extractTodaySummary(items: IWeatherItem[]): IDailySummary {
  const temps = items.map((i) => i.main.temp);
  const descriptions = items.map((i) => i.weather[0].description);
  const weathers = items.map((i) => i.weather[0].main);
  const windSpeeds = items.map((i) => i.wind.speed);
  const icons = items.map((i) => i.weather[0].icon);

  return {
    temp_min: Math.round(Math.min(...temps)),
    temp_max: Math.round(Math.max(...temps)),
    temp_avg: +(temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
    dominantWeather: mostFrequent(weathers),
    description: mostFrequent(descriptions),
    wind_speed_avg: +(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length).toFixed(1),
    icon: mostFrequent(icons),
  };
}

export function extractWeeklyForecast(items: IWeatherItem[]): IDailyForecast[] {
  const grouped = new Map<string, IWeatherItem[]>();

  for (const item of items) {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped.has(date)) grouped.set(date, []);
    grouped.get(date)!.push(item);
  }

  const today = new Date().toISOString().split("T")[0];
  const weekly: IDailyForecast[] = [];

  for (const [date, group] of grouped.entries()) {
    if (date === today) continue;

    const temps = group.map((i) => i.main.temp);
    const icons = group.map((i) => i.weather[0].icon);

    weekly.push({
      day: format(new Date(date), "EEE"),
      temp_min: Math.round(Math.min(...temps)),
      temp_max: Math.round(Math.max(...temps)),
      icon: mostFrequent(icons),
    });

    if (weekly.length === 7) break;
  }

  return weekly;
}
