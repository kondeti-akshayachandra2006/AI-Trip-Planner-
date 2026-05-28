import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { travelColors } from '@/components/travel/TravelTheme';
import { useAuth } from '@/services/authService';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  async function handleSignup() {
    setError('');
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(name.trim(), email.trim(), password);
      // Navigation will be handled by root layout useEffect
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.back} onPress={() => router.back()} disabled={isLoading}>
        <Ionicons name="chevron-back" size={22} color={travelColors.ink} />
      </Pressable>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Save trips, favorites, preferences, and emergency contacts.</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={travelColors.coral} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#98A2B3"
        value={name}
        onChangeText={setName}
        editable={!isLoading}
      />
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#98A2B3"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        placeholderTextColor="#98A2B3"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />
      <Pressable
        style={[styles.primary, isLoading && styles.primaryDisabled]}
        onPress={handleSignup}
        disabled={!name.trim() || !email.trim() || !password.trim() || isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Signup</Text>}
      </Pressable>

      <View style={styles.links}>
        <Text style={styles.link} onPress={() => router.push('/auth/login' as never)} disabled={isLoading}>
          Already have an account? Login
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 22, paddingTop: 38 },
  back: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 999, height: 42, justifyContent: 'center', marginBottom: 28, width: 42 },
  title: { color: travelColors.ink, fontSize: 32, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 24, marginTop: 7 },
  errorContainer: { alignItems: 'center', backgroundColor: '#FEE2E2', borderColor: '#FECACA', borderRadius: 12, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 18, padding: 12 },
  errorText: { color: travelColors.coral, flex: 1, fontSize: 14, fontWeight: '700' },
  input: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 17, borderWidth: 1, color: travelColors.ink, fontSize: 15, fontWeight: '700', marginBottom: 12, minHeight: 54, paddingHorizontal: 15 },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 17, justifyContent: 'center', marginTop: 6, minHeight: 54 },
  primaryDisabled: { opacity: 0.6 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  links: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  link: { color: travelColors.blue, fontSize: 14, fontWeight: '900' },
});
