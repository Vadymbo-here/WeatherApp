const GEOCODING_URL = import.meta.env.VITE_GEOCODING_URL;

export interface ICoordinates {
  lat: number;
  lon: number;
  city: string;
}

export async function getCoordsByIP(): Promise<ICoordinates | null> {
  try {
    const response = await fetch(GEOCODING_URL);
    const data = await response.json();

    const { latitude: lat, longitude: lon, city } = data;

    return {
      lat,
      lon,
      city,
    };
  } catch (e) {
    console.error("Error IP geocoding", e);
    return null;
  }
}
