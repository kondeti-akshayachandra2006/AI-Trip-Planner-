import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MapPreview } from '@/components/travel/MapPreview';
import { SectionHeader } from '@/components/travel/SectionHeader';
import { travelColors } from '@/components/travel/TravelTheme';
import { useTripStore } from '@/redux/tripStore';
import { defaultTripPlan } from '@/services/mockData';

export default function MapScreen() {
  const plan = useTripStore().state.currentPlan ?? defaultTripPlan;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Maps & navigation</Text>
      <Text style={styles.subtitle}>Traffic-aware route, nearby markers, and live guidance.</Text>
      <MapPreview title="Route active - recalculating when needed" />
      <SectionHeader title="Turn-by-turn guidance" />
      {plan.route.steps.map((step, index) => (
        <View key={`${step}-${index}`} style={styles.step}>
          <View style={styles.index}><Text style={styles.indexText}>{index + 1}</Text></View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
      <SectionHeader title="Nearby support" />
      {plan.emergency.map((place) => (
        <View key={place.id} style={styles.marker}>
          <Ionicons name={place.category === 'Hospital' ? 'medical' : place.category === 'Fuel' ? 'car' : 'bus'} size={18} color={travelColors.blue} />
          <View style={styles.markerBody}>
            <Text style={styles.markerTitle}>{place.name}</Text>
            <Text style={styles.markerMeta}>{place.category} - {place.address}</Text>
          </View>
          <Ionicons name="navigate" size={17} color={travelColors.teal} />
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
  step: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, padding: 13 },
  index: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 999, height: 30, justifyContent: 'center', width: 30 },
  indexText: { color: '#fff', fontSize: 13, fontWeight: '900' },
  stepText: { color: travelColors.ink, flex: 1, fontSize: 14, fontWeight: '700', lineHeight: 20 },
  marker: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, padding: 13 },
  markerBody: { flex: 1 },
  markerTitle: { color: travelColors.ink, fontSize: 15, fontWeight: '900' },
  markerMeta: { color: travelColors.muted, fontSize: 12, fontWeight: '600', marginTop: 3 },
});
