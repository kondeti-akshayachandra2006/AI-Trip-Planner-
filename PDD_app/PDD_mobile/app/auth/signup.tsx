import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { travelColors } from '@/components/travel/TravelTheme';
import { useAuth } from '@/services/authService';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup() {
    await signup(name.trim(), email.trim(), password);
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Save trips, favorites, preferences, and emergency contacts.</Text>
      <TextInput style={styles.input} placeholder="Full name" placeholderTextColor="#98A2B3" value={name} onChangeText={setName} />
      <TextInput autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholder="Email address" placeholderTextColor="#98A2B3" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#98A2B3" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={styles.primary} onPress={handleSignup} disabled={!name.trim() || !email.trim() || !password.trim()}><Text style={styles.primaryText}>Signup</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1, padding: 22, paddingTop: 72 },
  title: { color: travelColors.ink, fontSize: 32, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 24, marginTop: 7 },
  input: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 17, borderWidth: 1, color: travelColors.ink, fontSize: 15, fontWeight: '700', marginBottom: 12, minHeight: 54, paddingHorizontal: 15 },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 17, justifyContent: 'center', marginTop: 6, minHeight: 54 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
});
