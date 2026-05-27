import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { shadow } from './TravelTheme';

export function GlassCard({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    ...shadow,
  },
});
