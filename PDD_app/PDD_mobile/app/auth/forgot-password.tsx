import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { travelColors } from '@/components/travel/TravelTheme';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Enter your email and the backend will send a secure reset link.</Text>
      <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#98A2B3" />
      <Pressable style={styles.primary} onPress={() => router.back()}><Text style={styles.primaryText}>Send reset link</Text></Pressable>
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
