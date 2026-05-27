import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '@/components/travel/GlassCard';
import { MapPreview } from '@/components/travel/MapPreview';
import { MetricCard } from '@/components/travel/MetricCard';
import { SectionHeader } from '@/components/travel/SectionHeader';
import { travelColors } from '@/components/travel/TravelTheme';
import { useTripStore } from '@/redux/tripStore';
import { defaultTripPlan } from '@/services/mockData';
import { compactCurrency, formatDuration, formatKm } from '@/utils/format';

export default function TripDetailsScreen() {
  const { state, dispatch } = useTripStore();
  const plan = state.currentPlan ?? defaultTripPlan;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.top}>
        <Pressable style={styles.back} onPress={() => router.back()}><Ionicons name="chevron-back" size={22} color={travelColors.ink} /></Pressable>
        <Pressable style={styles.save} onPress={() => dispatch({ type: 'savePlan', plan })}><Ionicons name="bookmark" size={18} color="#fff" /><Text style={styles.saveText}>Save</Text></Pressable>
      </View>
      <Text style={styles.title}>{plan.destination}</Text>
      <Text style={styles.subtitle}>Complete AI plan from {plan.source}</Text>
      <MapPreview title="Navigation, traffic, and nearby services" plan={plan} />
      <View style={styles.metrics}>
        <MetricCard icon="map" label="Distance" value={formatKm(plan.route.distanceMeters)} />
        <MetricCard icon="time" label="Duration" value={formatDuration(plan.route.durationSeconds)} tone={travelColors.teal} />
        <MetricCard icon="wallet" label="Budget" value={compactCurrency(plan.budget.expected)} tone={travelColors.green} />
      </View>

      <GlassCard style={styles.weather}>
        <View style={styles.weatherTop}>
          <View>
            <Text style={styles.cardTitle}>{plan.weather.city}</Text>
            <Text style={styles.body}>{plan.weather.condition}</Text>
          </View>
          <Text style={styles.temp}>{plan.weather.temperature}°C</Text>
        </View>
        <View style={styles.weatherGrid}>
          <Text style={styles.weatherText}>Humidity {plan.weather.humidity}%</Text>
          <Text style={styles.weatherText}>Wind {plan.weather.windSpeed} km/h</Text>
          <Text style={styles.weatherText}>UV {plan.weather.uvIndex}</Text>
          <Text style={styles.weatherText}>Rain {plan.weather.rainChance}%</Text>
          <Text style={styles.weatherText}>Sunrise {plan.weather.sunrise}</Text>
          <Text style={styles.weatherText}>Sunset {plan.weather.sunset}</Text>
        </View>
        {plan.weather.alert ? <Text style={styles.alert}>{plan.weather.alert}</Text> : null}
      </GlassCard>

      <GlassCard style={styles.safety}>
        <View style={styles.weatherTop}>
          <Text style={styles.cardTitle}>Day/Night safety</Text>
          <Text style={styles.score}>{plan.safety.score}/100</Text>
        </View>
        <Text style={styles.body}>{plan.safety.dayAdvice}</Text>
        <Text style={styles.body}>{plan.safety.nightAdvice}</Text>
        {plan.safety.risks.map((risk) => <Text key={risk} style={styles.risk}>- {risk}</Text>)}
      </GlassCard>

      <GlassCard style={styles.safety}>
        <View style={styles.weatherTop}>
          <Text style={styles.cardTitle}>Booking plan</Text>
          <Text style={styles.score}>{plan.booking.bestMode}</Text>
        </View>
        <Text style={styles.body}>{plan.booking.bookBy}</Text>
        <Text style={styles.body}>{plan.booking.cancellation}</Text>
        {plan.booking.alerts.map((alert) => <Text key={alert} style={styles.risk}>- {alert}</Text>)}
      </GlassCard>

      <SectionHeader title="Attractions" />
      {plan.attractions.slice(0, 5).map((place) => (
        <View key={place.id} style={styles.item}>
          <Ionicons name="camera" size={18} color={travelColors.blue} />
          <View style={styles.itemBody}><Text style={styles.itemTitle}>{place.name}</Text><Text style={styles.itemMeta}>{place.address}</Text></View>
          <Text style={styles.rating}>{place.rating?.toFixed(1) ?? '4.5'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingBottom: 38, paddingTop: 24 },
  top: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  back: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 999, height: 42, justifyContent: 'center', width: 42 },
  save: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 999, flexDirection: 'row', gap: 6, paddingHorizontal: 14, paddingVertical: 10 },
  saveText: { color: '#fff', fontSize: 13, fontWeight: '900' },
  title: { color: travelColors.ink, fontSize: 34, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', marginBottom: 16, marginTop: 3 },
  metrics: { flexDirection: 'row', gap: 10, marginTop: 14 },
  weather: { gap: 12, marginTop: 16 },
  safety: { gap: 9, marginTop: 14 },
  weatherTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { color: travelColors.ink, fontSize: 18, fontWeight: '900' },
  body: { color: travelColors.muted, fontSize: 14, fontWeight: '600', lineHeight: 21 },
  temp: { color: travelColors.ink, fontSize: 36, fontWeight: '900' },
  weatherGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  weatherText: { backgroundColor: '#F4F8FB', borderRadius: 999, color: travelColors.ink, fontSize: 12, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 7 },
  alert: { backgroundColor: '#FFF6E5', borderRadius: 12, color: '#9A5B00', fontSize: 13, fontWeight: '800', padding: 10 },
  score: { color: travelColors.green, fontSize: 20, fontWeight: '900' },
  risk: { color: travelColors.ink, fontSize: 13, fontWeight: '700', lineHeight: 20 },
  item: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, padding: 13 },
  itemBody: { flex: 1 },
  itemTitle: { color: travelColors.ink, fontSize: 15, fontWeight: '900' },
  itemMeta: { color: travelColors.muted, fontSize: 12, fontWeight: '600', marginTop: 3 },
  rating: { color: travelColors.amber, fontSize: 13, fontWeight: '900' },
});
