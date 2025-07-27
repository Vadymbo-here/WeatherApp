import type { IForecastResponse } from "./weather.types";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchForecast(params: Record<string, string | number>): Promise<IForecastResponse> {
  const query = new URLSearchParams({
    appid: API_KEY,
    units: "metric",
    ...params,
  });

  const response = await fetch(`${BASE_URL}?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
