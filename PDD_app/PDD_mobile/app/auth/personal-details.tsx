import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import { travelColors } from '@/components/travel/TravelTheme';
import { useAuth } from '@/services/authService';
import { GlassCard } from '@/components/travel/GlassCard';

const GENDERS = ['male', 'female', 'other'];
const TRAVEL_STYLES = ['budget', 'comfort', 'luxury', 'adventure'];

export default function PersonalDetailsScreen() {
  const { user, updateProfile } = useAuth();
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [age, setAge] = useState(user?.age ? String(user.age) : '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact ?? '');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyPhone ?? '');
  const [travelStyle, setTravelStyle] = useState(user?.preferredTravelStyle ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showTravelStyleModal, setShowTravelStyleModal] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!age || parseInt(age) < 10 || parseInt(age) > 120) {
      setError('Please enter a valid age (10-120)');
      return false;
    }
    if (!gender) {
      setError('Please select a gender');
      return false;
    }
    if (!emergencyContact.trim()) {
      setError('Emergency contact name is required');
      return false;
    }
    if (!emergencyPhone.trim()) {
      setError('Emergency phone number is required');
      return false;
    }
    if (!travelStyle) {
      setError('Please select a travel style');
      return false;
    }
    return true;
  };

  async function handleSave() {
    setError('');
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await updateProfile({
        phone: phone.trim(),
        age: parseInt(age),
        gender: gender as 'male' | 'female' | 'other',
        emergencyContact: emergencyContact.trim(),
        emergencyPhone: emergencyPhone.trim(),
        preferredTravelStyle: travelStyle as 'budget' | 'comfort' | 'luxury' | 'adventure',
        personalDetailsCompleted: true,
      });
      router.replace('/(tabs)' as never);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save details');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>Help us personalize your travel experience with your details.</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={travelColors.coral} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#98A2B3"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={!isLoading}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="#98A2B3"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        editable={!isLoading}
      />

      <Text style={styles.label}>Gender</Text>
      <Pressable style={styles.selectButton} onPress={() => setShowGenderModal(true)} disabled={isLoading}>
        <Text style={[styles.selectButtonText, !gender && { color: '#98A2B3' }]}>
          {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Select your gender'}
        </Text>
        <Ionicons name="chevron-down" size={20} color={travelColors.muted} />
      </Pressable>

      <Modal visible={showGenderModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowGenderModal(false)}>
          <View style={styles.modalContent}>
            {GENDERS.map((g) => (
              <Pressable
                key={g}
                style={[styles.optionButton, gender === g && styles.optionButtonActive]}
                onPress={() => {
                  setGender(g);
                  setShowGenderModal(false);
                }}
              >
                <Text style={[styles.optionText, gender === g && styles.optionTextActive]}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Text style={styles.label}>Emergency Contact Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full name of emergency contact"
        placeholderTextColor="#98A2B3"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        editable={!isLoading}
      />

      <Text style={styles.label}>Emergency Contact Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Emergency contact phone number"
        placeholderTextColor="#98A2B3"
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
        keyboardType="phone-pad"
        editable={!isLoading}
      />

      <Text style={styles.label}>Preferred Travel Style</Text>
      <Pressable style={styles.selectButton} onPress={() => setShowTravelStyleModal(true)} disabled={isLoading}>
        <Text style={[styles.selectButtonText, !travelStyle && { color: '#98A2B3' }]}>
          {travelStyle ? travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1) : 'Select travel style'}
        </Text>
        <Ionicons name="chevron-down" size={20} color={travelColors.muted} />
      </Pressable>

      <Modal visible={showTravelStyleModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowTravelStyleModal(false)}>
          <View style={styles.modalContent}>
            {TRAVEL_STYLES.map((style) => (
              <Pressable
                key={style}
                style={[styles.optionButton, travelStyle === style && styles.optionButtonActive]}
                onPress={() => {
                  setTravelStyle(style);
                  setShowTravelStyleModal(false);
                }}
              >
                <Text style={[styles.optionText, travelStyle === style && styles.optionTextActive]}>
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Pressable style={[styles.primary, isLoading && styles.primaryDisabled]} onPress={handleSave} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryText}>Complete Profile</Text>
        )}
      </Pressable>

      <Pressable style={styles.skip} onPress={() => router.replace('/(tabs)' as never)} disabled={isLoading}>
        <Text style={styles.skipText}>Skip for now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1 },
  content: { padding: 18, paddingBottom: 110, paddingTop: 32 },
  title: { color: travelColors.ink, fontSize: 32, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 24 },
  errorContainer: { alignItems: 'center', backgroundColor: '#FEE2E2', borderColor: '#FECACA', borderRadius: 12, borderWidth: 1, flexDirection: 'row', gap: 12, marginBottom: 18, padding: 12 },
  errorText: { color: travelColors.coral, flex: 1, fontSize: 14, fontWeight: '700' },
  label: { color: travelColors.ink, fontSize: 15, fontWeight: '800', marginBottom: 8, marginTop: 14 },
  input: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 12, borderWidth: 1, color: travelColors.ink, fontSize: 15, fontWeight: '700', marginBottom: 14, minHeight: 50, paddingHorizontal: 14 },
  selectButton: { alignItems: 'center', backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14, minHeight: 50, paddingHorizontal: 14 },
  selectButtonText: { color: travelColors.ink, fontSize: 15, fontWeight: '700' },
  modalOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, paddingBottom: 30, paddingTop: 14 },
  optionButton: { alignItems: 'center', borderBottomColor: travelColors.line, borderBottomWidth: 1, justifyContent: 'center', minHeight: 50, paddingHorizontal: 14 },
  optionButtonActive: { backgroundColor: '#F0F6FF' },
  optionText: { color: travelColors.ink, fontSize: 16, fontWeight: '700' },
  optionTextActive: { color: travelColors.blue, fontWeight: '900' },
  primary: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 12, justifyContent: 'center', marginTop: 24, minHeight: 54 },
  primaryDisabled: { opacity: 0.6 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  skip: { alignItems: 'center', marginTop: 12, paddingVertical: 14 },
  skipText: { color: travelColors.muted, fontSize: 15, fontWeight: '700' },
});
