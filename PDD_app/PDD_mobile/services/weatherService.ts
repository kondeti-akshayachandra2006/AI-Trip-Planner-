import { env, hasKey } from '@/utils/env';
import { mockWeather } from './mockData';
import type { WeatherSnapshot } from './types';
import { requestJson } from './http';

type WeatherResponse = {
  name?: string;
  weather?: { main: string; description: string }[];
  main?: { temp: number; humidity: number };
  wind?: { speed: number };
  sys?: { sunrise: number; sunset: number };
  rain?: { '1h'?: number };
};

function timeFromUnix(value?: number) {
  if (!value) return '--:--';
  return new Date(value * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export async function getWeather(lat: number, lon: number): Promise<WeatherSnapshot> {
  if (!hasKey('openWeatherKey')) {
    return mockWeather;
  }

  const data = await requestJson<WeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${env.openWeatherKey}`,
    {},
  );

  if (!data.main) return mockWeather;

  return {
    city: data.name ?? 'Destination',
    condition: data.weather?.[0]?.description ?? 'Clear',
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    windSpeed: Math.round((data.wind?.speed ?? 0) * 3.6),
    uvIndex: 6,
    rainChance: data.rain?.['1h'] ? 70 : 20,
    sunrise: timeFromUnix(data.sys?.sunrise),
    sunset: timeFromUnix(data.sys?.sunset),
    airQuality: 'Moderate',
    alert: data.rain?.['1h'] ? 'Rain expected soon. Keep buffer time.' : undefined,
  };
}
