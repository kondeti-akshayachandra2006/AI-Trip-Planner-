import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '@/components/travel/GlassCard';
import { MetricCard } from '@/components/travel/MetricCard';
import { SectionHeader } from '@/components/travel/SectionHeader';
import { travelColors } from '@/components/travel/TravelTheme';
import { useTripStore } from '@/redux/tripStore';
import { defaultTripPlan } from '@/services/mockData';
import { compactCurrency, formatDuration, formatKm } from '@/utils/format';

export default function PlannerScreen() {
  const { state } = useTripStore();
  const plan = state.currentPlan ?? defaultTripPlan;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Trip intelligence</Text>
      <Text style={styles.subtitle}>{plan.source} to {plan.destination}</Text>
      <View style={styles.metrics}>
        <MetricCard icon="map" label="Distance" value={formatKm(plan.route.distanceMeters)} />
        <MetricCard icon="time" label="Duration" value={formatDuration(plan.route.durationSeconds)} tone={travelColors.teal} />
        <MetricCard icon="wallet" label="Budget" value={compactCurrency(plan.budget.expected)} tone={travelColors.green} />
      </View>

      <GlassCard style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="sparkles" size={20} color={travelColors.blue} />
          <Text style={styles.cardTitle}>AI recommendation</Text>
        </View>
        <Text style={styles.body}>Best time: {plan.bestTime}</Text>
        <Text style={styles.body}>Suggested stay: {plan.stayDuration}</Text>
        <Text style={styles.body}>Crowd: {plan.crowd}</Text>
      </GlassCard>

      <GlassCard style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="ticket" size={20} color={travelColors.green} />
          <Text style={styles.cardTitle}>Booking intelligence</Text>
        </View>
        <Text style={styles.body}>Best mode: {plan.booking.bestMode}</Text>
        <Text style={styles.body}>Fare trend: {plan.booking.fareTrend}</Text>
        <Text style={styles.body}>{plan.booking.bookBy}</Text>
        <Text style={styles.body}>{plan.booking.cancellation}</Text>
      </GlassCard>

      <SectionHeader title="Transport options" />
      {plan.transport.map((item) => (
        <View key={`${item.type}-${item.provider}`} style={styles.listItem}>
          <View style={styles.round}><Ionicons name={item.type === 'Train' ? 'train' : item.type === 'Cab' ? 'car' : item.type === 'Flight' ? 'airplane' : 'bus'} size={18} color={travelColors.blue} /></View>
          <View style={styles.listBody}>
            <Text style={styles.itemTitle}>{item.type} - {item.provider}</Text>
            <Text style={styles.itemMeta}>{item.departure} to {item.arrival} - {item.estimate}</Text>
            <Text style={styles.itemMeta}>{item.reason}</Text>
          </View>
          <View style={styles.optionMeta}>
            <Text style={styles.score}>{item.score}</Text>
            <Text style={styles.confidence}>{item.confidence}</Text>
          </View>
        </View>
      ))}

      <SectionHeader title="Hotels and rooms" />
      {plan.hotels.slice(0, 4).map((hotel) => (
        <View key={hotel.id} style={styles.listItem}>
          <View style={styles.round}><Ionicons name="bed" size={18} color={travelColors.teal} /></View>
          <View style={styles.listBody}>
            <Text style={styles.itemTitle}>{hotel.name}</Text>
            <Text style={styles.itemMeta}>{hotel.price ?? '₹2,500-₹8,000'} - {hotel.address}</Text>
          </View>
          <Text style={styles.rating}>{hotel.rating?.toFixed(1) ?? '4.3'}</Text>
        </View>
      ))}

      <SectionHeader title="Food and local dining" />
      {plan.food.slice(0, 4).map((food) => (
        <View key={food.id} style={styles.listItem}>
          <View style={styles.round}><Ionicons name="restaurant" size={18} color={travelColors.coral} /></View>
          <View style={styles.listBody}>
            <Text style={styles.itemTitle}>{food.name}</Text>
            <Text style={styles.itemMeta}>{food.price ?? 'Budget and premium'} - {food.openNow ? 'Open now' : 'Check timing'}</Text>
          </View>
          <Text style={styles.rating}>{food.rating?.toFixed(1) ?? '4.4'}</Text>
        </View>
      ))}

      <Pressable style={styles.primary} onPress={() => router.push('/trip/details' as never)}>
        <Text style={styles.primaryText}>Open full itinerary</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingBottom: 110, paddingTop: 32 },
  title: { color: travelColors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', marginBottom: 16, marginTop: 4 },
  metrics: { flexDirection: 'row', gap: 10 },
  card: { gap: 8, marginTop: 18 },
  cardHeader: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  cardTitle: { color: travelColors.ink, fontSize: 17, fontWeight: '900' },
  body: { color: travelColors.muted, fontSize: 14, fontWeight: '600', lineHeight: 21 },
  listItem: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 10, padding: 12 },
  round: { alignItems: 'center', backgroundColor: '#EEF6FF', borderRadius: 999, height: 40, justifyContent: 'center', width: 40 },
  listBody: { flex: 1 },
  itemTitle: { color: travelColors.ink, fontSize: 15, fontWeight: '900' },
  itemMeta: { color: travelColors.muted, fontSize: 12, fontWeight: '600', marginTop: 3 },
  confidence: { color: travelColors.green, fontSize: 12, fontWeight: '900' },
  optionMeta: { alignItems: 'flex-end', gap: 3 },
  rating: { color: travelColors.amber, fontSize: 13, fontWeight: '900' },
  score: { color: travelColors.ink, fontSize: 14, fontWeight: '900' },
  primary: { alignItems: 'center', backgroundColor: travelColors.ink, borderRadius: 18, flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 10, minHeight: 54 },
  primaryText: { color: '#fff', fontSize: 15, fontWeight: '900' },
});
