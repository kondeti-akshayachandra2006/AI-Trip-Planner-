import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { travelColors } from '@/components/travel/TravelTheme';
import { useAuth } from '@/services/authService';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    await login(email.trim(), password);
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.screen}>
      <Pressable style={styles.back} onPress={() => router.back()}><Ionicons name="chevron-back" size={22} color={travelColors.ink} /></Pressable>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Secure login with saved profile and session persistence.</Text>
      <TextInput autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholder="Email address" placeholderTextColor="#98A2B3" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#98A2B3" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={styles.primary} onPress={handleLogin} disabled={!email.trim() || !password.trim()}><Text style={styles.primaryText}>Login</Text></Pressable>
      <Pressable style={styles.google}><Ionicons name="logo-google" size={18} color={travelColors.ink} /><Text style={styles.googleText}>Continue with Google</Text></Pressable>
      <View style={styles.links}>
        <Text style={styles.link} onPress={() => router.push('/auth/signup' as never)}>Create account</Text>
        <Text style={styles.link} onPress={() => router.push('/auth/forgot-password' as never)}>Forgot password</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1, padding: 22, paddingTop: 38 },
  back: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 999, height: 42, justifyContent: 'center', marginBottom: 28, width: 42 },
  title: { color: travelColors.ink, fontSize: 34, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 24, marginTop: 7 },
  input: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 17, borderWidth: 1, color: travelColors.ink, fontSize: 15, fontWeight: '700', marginBottom: 12, minHeight: 54, paddingHorizontal: 15 },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 17, justifyContent: 'center', marginTop: 6, minHeight: 54 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  google: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 12, minHeight: 54 },
  googleText: { color: travelColors.ink, fontSize: 15, fontWeight: '900' },
  links: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  link: { color: travelColors.blue, fontSize: 14, fontWeight: '900' },
});
