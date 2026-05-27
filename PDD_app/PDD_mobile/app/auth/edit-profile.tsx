import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useAuth } from '@/services/authService';
import { travelColors } from '@/components/travel/TravelTheme';

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [preferences, setPreferences] = useState(user?.preferences.join(', ') ?? '');
  const [favorites, setFavorites] = useState(user?.favorites.join(', ') ?? '');

  async function handleSave() {
    await updateProfile({
      name: name.trim() || user?.name || '',
      email: email.trim() || user?.email || '',
      preferences: preferences.split(',').map((item) => item.trim()).filter(Boolean),
      favorites: favorites.split(',').map((item) => item.trim()).filter(Boolean),
    });
    router.replace('/(tabs)/profile');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color={travelColors.ink} />
      </Pressable>
      <Text style={styles.title}>Edit profile</Text>
      <Text style={styles.subtitle}>Update your personal details and travel preferences.</Text>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#98A2B3" value={name} onChangeText={setName} />
      <TextInput autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholder="Email" placeholderTextColor="#98A2B3" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Preferences (comma separated)" placeholderTextColor="#98A2B3" value={preferences} onChangeText={setPreferences} />
      <TextInput style={styles.input} placeholder="Favorite cities" placeholderTextColor="#98A2B3" value={favorites} onChangeText={setFavorites} />
      <Pressable style={styles.primary} onPress={handleSave} disabled={!name.trim() || !email.trim()}>
        <Text style={styles.primaryText}>Save profile</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingBottom: 110, paddingTop: 32 },
  back: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 999, height: 42, justifyContent: 'center', marginBottom: 24, width: 42 },
  title: { color: travelColors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 24, marginTop: 4 },
  input: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 17, borderWidth: 1, color: travelColors.ink, fontSize: 15, fontWeight: '700', marginBottom: 12, minHeight: 54, paddingHorizontal: 15 },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 17, justifyContent: 'center', minHeight: 54, marginTop: 8 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
});
