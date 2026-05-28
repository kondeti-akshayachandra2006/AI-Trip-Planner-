import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '@/components/travel/GlassCard';
import { SectionHeader } from '@/components/travel/SectionHeader';
import { travelColors } from '@/components/travel/TravelTheme';
import { useAuth } from '@/services/authService';
import { useTripStore } from '@/redux/tripStore';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { state } = useTripStore();

  const upcomingTrips = state.savedTrips.filter((trip) => trip.status === 'upcoming');
  const completedTrips = state.completedTrips;

  if (!user) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your profile is ready</Text>
        <Text style={styles.subtitle}>Login to save trips, favorite destinations, and view your itinerary dashboard.</Text>
        <Pressable style={styles.primary} onPress={() => router.push('/auth/login' as never)}><Text style={styles.primaryText}>Login / Signup</Text></Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          {user.photoUrl ? <Ionicons name="person" size={40} color="#fff" /> : <Ionicons name="person" size={40} color="#fff" />}
        </View>
        <View style={styles.profileText}>
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <GlassCard style={styles.card}>
        <View style={styles.row}><Text style={styles.label}>Saved trips</Text><Text style={styles.value}>{state.savedTrips.length}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Upcoming trips</Text><Text style={styles.value}>{upcomingTrips.length}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Completed trips</Text><Text style={styles.value}>{completedTrips.length}</Text></View>
      </GlassCard>

      <SectionHeader title="Personal Information" />
      <GlassCard style={styles.infoCard}>
        {user.phone && <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone</Text><Text style={styles.infoValue}>{user.phone}</Text></View>}
        {user.age && <View style={styles.infoRow}><Text style={styles.infoLabel}>Age</Text><Text style={styles.infoValue}>{user.age}</Text></View>}
        {user.gender && <View style={styles.infoRow}><Text style={styles.infoLabel}>Gender</Text><Text style={styles.infoValue}>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</Text></View>}
        {user.emergencyContact && <View style={styles.infoRow}><Text style={styles.infoLabel}>Emergency Contact</Text><Text style={styles.infoValue}>{user.emergencyContact}</Text></View>}
        {user.emergencyPhone && <View style={styles.infoRow}><Text style={styles.infoLabel}>Emergency Phone</Text><Text style={styles.infoValue}>{user.emergencyPhone}</Text></View>}
        {user.preferredTravelStyle && <View style={styles.infoRow}><Text style={styles.infoLabel}>Travel Style</Text><Text style={styles.infoValue}>{user.preferredTravelStyle.charAt(0).toUpperCase() + user.preferredTravelStyle.slice(1)}</Text></View>}
      </GlassCard>

      <SectionHeader title="Travel preferences" />
      <View style={styles.tags}>{user.preferences.map((pref) => (<View key={pref} style={styles.tag}><Text style={styles.tagText}>{pref}</Text></View>))}</View>
      <SectionHeader title="Favorite destinations" />
      <View style={styles.tags}>{user.favorites.map((favorite) => (<View key={favorite} style={styles.tag}><Text style={styles.tagText}>{favorite}</Text></View>))}</View>

      <GlassCard style={styles.quickActions}>
        <Pressable style={styles.actionRow} onPress={() => router.push('/auth/edit-profile' as never)}>
          <Ionicons name="pencil" size={20} color={travelColors.blue} />
          <Text style={styles.actionText}>Edit profile</Text>
        </Pressable>
        <Pressable style={styles.actionRow} onPress={logout}>
          <Ionicons name="log-out" size={20} color={travelColors.coral} />
          <Text style={[styles.actionText, { color: travelColors.coral }]}>Logout</Text>
        </Pressable>
      </GlassCard>

      <SectionHeader title="Upcoming trips" action={`${upcomingTrips.length} plans`} />
      {upcomingTrips.length ? upcomingTrips.slice(0, 3).map((plan) => (
        <GlassCard key={plan.id} style={styles.tripCard}>
          <View style={styles.tripTop}><Text style={styles.tripTitle}>{plan.destination}</Text><Text style={styles.tripMeta}>{plan.status.toUpperCase()}</Text></View>
          <Text style={styles.tripText}>{plan.startDate} → {plan.endDate}</Text>
          <Text style={styles.tripText}>Travellers: {plan.travelers} • {plan.hotelStatus}</Text>
        </GlassCard>
      )) : <Text style={styles.emptyText}>No upcoming trips yet. Build your first AI itinerary from the home tab.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingBottom: 110, paddingTop: 32 },
  header: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 18 },
  avatar: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 28, height: 56, justifyContent: 'center', width: 56 },
  profileText: { flex: 1 },
  title: { color: travelColors.ink, fontSize: 28, fontWeight: '900' },
  email: { color: travelColors.muted, fontSize: 14, fontWeight: '700', marginTop: 4 },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 24, marginTop: 4 },
  card: { gap: 12, marginBottom: 16 },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: travelColors.muted, fontSize: 14, fontWeight: '700' },
  value: { color: travelColors.ink, fontSize: 16, fontWeight: '900' },
  infoCard: { gap: 0, marginBottom: 16 },
  infoRow: { alignItems: 'center', borderBottomColor: travelColors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  infoRow_last: { borderBottomWidth: 0 },
  infoLabel: { color: travelColors.muted, fontSize: 14, fontWeight: '700' },
  infoValue: { color: travelColors.ink, fontSize: 14, fontWeight: '800' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  tag: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  tagText: { color: travelColors.ink, fontSize: 13, fontWeight: '800' },
  quickActions: { gap: 10, marginBottom: 18 },
  actionRow: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, padding: 14 },
  actionText: { color: travelColors.ink, fontSize: 15, fontWeight: '800' },
  tripCard: { marginBottom: 12, padding: 16 },
  tripTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tripTitle: { color: travelColors.ink, fontSize: 16, fontWeight: '900' },
  tripMeta: { color: travelColors.blue, fontSize: 12, fontWeight: '900' },
  tripText: { color: travelColors.muted, fontSize: 13, fontWeight: '700', lineHeight: 20 },
  emptyText: { color: travelColors.muted, fontSize: 14, fontWeight: '700', marginVertical: 12 },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 18, justifyContent: 'center', minHeight: 54 },
  primaryText: { color: '#fff', fontSize: 15, fontWeight: '900' },
});
