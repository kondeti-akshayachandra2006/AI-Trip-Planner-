import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/services/authService';
import { TripStoreProvider } from '@/redux/tripStore';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;

    // Check auth state and redirect accordingly
    if (!user) {
      // Not authenticated - go to login
      router.replace('/auth/login');
    } else if (!user.personalDetailsCompleted) {
      // Authenticated but personal details not completed - go to personal details
      router.replace('/auth/personal-details');
    } else {
      // Fully authenticated - go to home
      router.replace('/(tabs)');
    }
  }, [isReady, user, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F8FB' }}>
        <ActivityIndicator size="large" color="#0084FF" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="auth/personal-details" />
        <Stack.Screen name="auth/edit-profile" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="trip/details" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'AI Trip Planner' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TripStoreProvider>
        <RootLayoutContent />
      </TripStoreProvider>
    </AuthProvider>
  );
}
