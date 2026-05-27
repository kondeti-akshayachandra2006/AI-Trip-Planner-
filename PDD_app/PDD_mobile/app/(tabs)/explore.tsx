import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '@/components/travel/GlassCard';
import { SearchBox } from '@/components/travel/SearchBox';
import { SectionHeader } from '@/components/travel/SectionHeader';
import { travelColors } from '@/components/travel/TravelTheme';
import { popularDestinations } from '@/services/mockData';
import { getNearbyPlaces, searchPlaces } from '@/services/locationService';
import type { Place } from '@/services/types';

const majorCities = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Jaipur', 'Goa', 'Kolkata'];
const categoryFilters = ['Budget', 'Luxury', 'Beaches', 'Hill stations', 'Adventure', 'Food', 'Family', 'Solo'];

export default function ExploreScreen() {
  const [query, setQuery] = useState('Goa');
  const [places, setPlaces] = useState<Place[]>(popularDestinations);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Budget');

  async function runSearch(searchTerm = query) {
    setLoading(true);
    const results = await searchPlaces(searchTerm);
    const first = results[0];
    const nearby = first ? await getNearbyPlaces(first.lat, first.lon, 'tourism.sights,catering.restaurant,accommodation.hotel') : [];
    setPlaces([...results, ...nearby].slice(0, 12));
    setLoading(false);
    setQuery(searchTerm);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Explore live places</Text>
      <Text style={styles.subtitle}>Search a city and get API-backed sights, stays, food, and support points.</Text>

      <GlassCard style={styles.searchCard}>
        <SearchBox placeholder="Search destination" value={query} onChangeText={setQuery} />
        <Pressable style={styles.primary} onPress={() => runSearch()} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Ionicons name="search" size={18} color="#fff" />}
          <Text style={styles.primaryText}>{loading ? 'Refreshing live data...' : 'Search Places'}</Text>
        </Pressable>
      </GlassCard>

      <SectionHeader title="Popular cities" />
      <View style={styles.cityRow}>
        {majorCities.map((city) => (
          <Pressable key={city} style={styles.cityChip} onPress={() => runSearch(city)}>
            <Text style={styles.cityText}>{city}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Filters" />
      <View style={styles.filterRow}>
        {categoryFilters.map((filter) => (
          <Pressable
            key={filter}
            style={[styles.filterChip, selectedFilter === filter && styles.filterActive]}
            onPress={() => setSelectedFilter(filter)}>
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Results" action={`${places.length} found`} />
      {places.map((place) => (
        <View key={place.id} style={styles.place}>
          <View style={styles.icon}>
            <Ionicons name={place.category.toLowerCase().includes('hotel') ? 'bed' : place.category.toLowerCase().includes('restaurant') ? 'restaurant' : 'location'} size={18} color={travelColors.blue} />
          </View>
          <View style={styles.placeBody}>
            <Text style={styles.placeTitle}>{place.name}</Text>
            <Text style={styles.placeMeta}>{place.category} - {place.address}</Text>
          </View>
          <Text style={styles.rating}>{place.rating?.toFixed(1) ?? 'Live'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingBottom: 110, paddingTop: 32 },
  title: { color: travelColors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 16, marginTop: 4 },
  searchCard: { gap: 12 },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 17, flexDirection: 'row', gap: 9, justifyContent: 'center', minHeight: 54 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  cityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  cityChip: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  cityText: { color: travelColors.ink, fontSize: 13, fontWeight: '800' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  filterChip: { backgroundColor: '#FFFFFF', borderColor: travelColors.line, borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  filterActive: { backgroundColor: travelColors.blue, borderColor: travelColors.blue },
  filterText: { color: travelColors.muted, fontSize: 13, fontWeight: '800' },
  filterTextActive: { color: '#fff' },
  place: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, padding: 13 },
  icon: { alignItems: 'center', backgroundColor: '#EAF2FF', borderRadius: 999, height: 40, justifyContent: 'center', width: 40 },
  placeBody: { flex: 1 },
  placeTitle: { color: travelColors.ink, fontSize: 15, fontWeight: '900' },
  placeMeta: { color: travelColors.muted, fontSize: 12, fontWeight: '600', marginTop: 3 },
  rating: { color: travelColors.green, fontSize: 13, fontWeight: '900' },
});
