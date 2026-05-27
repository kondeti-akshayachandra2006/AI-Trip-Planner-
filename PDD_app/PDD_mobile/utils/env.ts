export const env = {
  geoapifyKey: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY ?? '',
  openWeatherKey: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY ?? '',
  openRouteServiceKey: process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY ?? '',
  locationIqKey: process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY ?? '',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
};

export function hasKey(key: keyof typeof env) {
  return Boolean(env[key] && !String(env[key]).includes('your_'));
}
