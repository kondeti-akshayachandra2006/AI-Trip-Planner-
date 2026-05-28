import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GlassCard } from '@/components/travel/GlassCard';
import { MapPreview } from '@/components/travel/MapPreview';
import { MetricCard } from '@/components/travel/MetricCard';
import { SearchBox } from '@/components/travel/SearchBox';
import { SectionHeader } from '@/components/travel/SectionHeader';
import { travelColors } from '@/components/travel/TravelTheme';
import { generateTripPlan } from '@/services/aiService';
import { categories, popularDestinations } from '@/services/mockData';
import { searchPlaces } from '@/services/locationService';
import type { Place } from '@/services/types';
import { useTripStore } from '@/redux/tripStore';

const fallbackSource: Place = { id: 'hyderabad', name: 'Hyderabad', address: 'Telangana, India', lat: 17.385, lon: 78.4867, category: 'City' };

export default function HomeScreen() {
  const { state, dispatch } = useTripStore();
  const [source, setSource] = useState('Hyderabad');
  const [destination, setDestination] = useState('Goa');
  const [selectedCategory, setSelectedCategory] = useState('Family');
  const greeting = useMemo(() => new Date().getHours() < 12 ? 'Good morning' : 'Ready to explore', []);

  async function planTrip() {
    dispatch({ type: 'planning', value: true });
    const [sourceMatches, destinationMatches] = await Promise.all([searchPlaces(source), searchPlaces(destination)]);
    const plan = await generateTripPlan(sourceMatches[0] ?? fallbackSource, destinationMatches[0] ?? popularDestinations[0]);
    dispatch({ type: 'setPlan', plan });
    dispatch({ type: 'planning', value: false });
    router.push('/trip/details' as never);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.eyebrow}>{greeting}</Text>
            <Text style={styles.title}>AI Trip Planner</Text>
            <Text style={styles.subtitle}>Routes, weather, hotels, food, transport, and safety in one assistant.</Text>
          </View>
          <Pressable style={styles.sos} onPress={() => router.push('/auth/personal-details' as never)}>
            <Ionicons name="warning" size={18} color="#fff" />
            <Text style={styles.sosText}>SOS</Text>
          </Pressable>
        </View>

      <GlassCard style={styles.searchCard}>
        <SearchBox placeholder="From where?" value={source} onChangeText={setSource} />
        <SearchBox placeholder="Where are you going?" value={destination} onChangeText={setDestination} />
        <Pressable style={styles.planButton} onPress={planTrip} disabled={state.isPlanning}>
          {state.isPlanning ? <ActivityIndicator color="#fff" /> : <Ionicons name="sparkles" size={19} color="#fff" />}
          <Text style={styles.planText}>{state.isPlanning ? 'Planning smart route...' : 'Plan My Trip with AI'}</Text>
        </Pressable>
      </GlassCard>

      <MapPreview />

      <SectionHeader title="Travel styles" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((category) => (
          <Pressable key={category} onPress={() => setSelectedCategory(category)} style={[styles.chip, selectedCategory === category && styles.chipActive]}>
            <Text style={[styles.chipText, selectedCategory === category && styles.chipTextActive]}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title="Live intelligence" action="Auto refresh" />
      <View style={styles.metrics}>
        <MetricCard icon="partly-sunny" label="Weather" value={state.currentPlan ? `${state.currentPlan.weather.temperature}°C` : '28°C'} tone={travelColors.amber} />
        <MetricCard icon="shield-checkmark" label="Safety" value={state.currentPlan ? `${state.currentPlan.safety.score}/100` : '82/100'} tone={travelColors.green} />
        <MetricCard icon="bus" label="Transport" value={state.currentPlan ? state.currentPlan.booking.bestMode : 'Bus'} tone={travelColors.teal} />
      </View>

      <SectionHeader title="Popular destinations" />
      <View style={styles.destinationGrid}>
        {popularDestinations.map((place) => (
          <Pressable key={place.id} style={styles.destination} onPress={() => setDestination(place.name)}>
            <View style={styles.destinationIcon}><Ionicons name="location" size={18} color={travelColors.blue} /></View>
            <Text style={styles.destinationName}>{place.name}</Text>
            <Text style={styles.destinationMeta}>{place.category} - {place.rating}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F8FB' },
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingRight: 22, paddingBottom: 110 },
  hero: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, gap: 12, marginBottom: 12 },
  heroContent: { flex: 1 },
  eyebrow: { color: travelColors.teal, fontSize: 13, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: travelColors.ink, fontSize: 36, fontWeight: '900', letterSpacing: 0, marginTop: 4 },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '600', lineHeight: 22, marginTop: 6, maxWidth: 290 },
  sos: { alignItems: 'center', backgroundColor: travelColors.coral, borderRadius: 18, flexDirection: 'row', gap: 6, paddingHorizontal: 14, paddingVertical: 11, minHeight: 44, minWidth: 60, justifyContent: 'center', flexShrink: 0 },
  sosText: { color: '#fff', fontSize: 12, fontWeight: '900' },
  searchCard: { gap: 12, marginBottom: 16, marginTop: 22 },
  planButton: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 17, flexDirection: 'row', gap: 9, justifyContent: 'center', minHeight: 54 },
  planText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  chips: { gap: 10, paddingRight: 18 },
  chip: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 999, borderWidth: 1, paddingHorizontal: 15, paddingVertical: 10 },
  chipActive: { backgroundColor: travelColors.ink, borderColor: travelColors.ink },
  chipText: { color: travelColors.muted, fontSize: 13, fontWeight: '800' },
  chipTextActive: { color: '#fff' },
  metrics: { flexDirection: 'row', gap: 10 },
  destinationGrid: { gap: 12 },
  destination: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 20, borderWidth: 1, padding: 14 },
  destinationIcon: { alignItems: 'center', backgroundColor: '#EAF2FF', borderRadius: 999, height: 34, justifyContent: 'center', marginBottom: 10, width: 34 },
  destinationName: { color: travelColors.ink, fontSize: 16, fontWeight: '900' },
  destinationMeta: { color: travelColors.muted, fontSize: 13, fontWeight: '600', marginTop: 4 },
});
