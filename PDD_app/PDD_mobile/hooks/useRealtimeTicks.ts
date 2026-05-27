import { useEffect, useState } from 'react';

export function useRealtimeTicks(intervalMs = 30000) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((value) => value + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return tick;
}
