export function formatKm(meters: number) {
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function compactCurrency(value: number) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}
