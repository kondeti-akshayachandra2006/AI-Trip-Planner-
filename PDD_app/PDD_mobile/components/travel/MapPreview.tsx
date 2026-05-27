import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { travelColors } from './TravelTheme';
import { useMemo } from 'react';
import type { TripPlan } from '@/services/types';

export function MapPreview({ title = 'Live route intelligence', plan }: { title?: string; plan?: TripPlan | null }) {
  const points = useMemo(() => plan?.route.coordinates ?? [], [plan]);

  // Map coordinates to simple positioned dots inside the preview box
  const normalized = useMemo(() => {
    if (!points || !points.length) return [];
    const lats = points.map((p) => p.lat);
    const lons = points.map((p) => p.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const latRange = Math.max(0.00001, maxLat - minLat);
    const lonRange = Math.max(0.00001, maxLon - minLon);
    return points.map((p) => ({ left: ((p.lon - minLon) / lonRange) * 100, top: (1 - (p.lat - minLat) / latRange) * 100 }));
  }, [points]);

  return (
    <View style={styles.map}>
      <View style={styles.grid} />
      {normalized.length ? (
        normalized.map((pt, i) => (
          <View key={i} style={[styles.dot, { left: `${pt.left}%`, top: `${pt.top}%` }]} />
        ))
      ) : (
        <>
          <View style={[styles.pin, styles.pinStart]}><Ionicons name="navigate" size={15} color="#fff" /></View>
          <View style={[styles.pin, styles.pinEnd]}><Ionicons name="flag" size={15} color="#fff" /></View>
          <View style={styles.route} />
          <View style={styles.routeTwo} />
        </>
      )}
      <View style={styles.badge}>
        <Ionicons name="pulse" size={14} color={travelColors.green} />
        <Text style={styles.badgeText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { backgroundColor: '#E9F7F7', borderRadius: 24, height: 210, overflow: 'hidden', position: 'relative' },
  grid: { ...StyleSheet.absoluteFillObject, backgroundColor: '#DFF0F2' },
  route: { backgroundColor: travelColors.blue, borderRadius: 999, height: 8, left: 54, position: 'absolute', top: 124, transform: [{ rotate: '-18deg' }], width: 220 },
  routeTwo: { backgroundColor: travelColors.teal, borderRadius: 999, height: 8, left: 170, position: 'absolute', top: 91, transform: [{ rotate: '24deg' }], width: 132 },
  pin: { alignItems: 'center', borderRadius: 999, height: 34, justifyContent: 'center', position: 'absolute', width: 34 },
  pinStart: { backgroundColor: travelColors.blue, left: 42, top: 126 },
  pinEnd: { backgroundColor: travelColors.coral, right: 38, top: 74 },
  badge: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 999, bottom: 14, flexDirection: 'row', gap: 6, left: 14, paddingHorizontal: 12, paddingVertical: 8, position: 'absolute' },
  badgeText: { color: travelColors.ink, fontSize: 12, fontWeight: '800' },
  dot: { position: 'absolute', width: 8, height: 8, borderRadius: 8, backgroundColor: travelColors.blue, transform: [{ translateX: -4 }, { translateY: -4 }] },
});
