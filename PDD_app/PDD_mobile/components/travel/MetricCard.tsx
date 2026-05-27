import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { travelColors } from './TravelTheme';

export function MetricCard({ icon, label, value, tone = travelColors.blue }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string; tone?: string }) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${tone}18` }]}>
        <Ionicons name={icon} size={18} color={tone} />
      </View>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, flex: 1, minWidth: 104, padding: 12 },
  icon: { alignItems: 'center', borderRadius: 999, height: 34, justifyContent: 'center', marginBottom: 10, width: 34 },
  label: { color: travelColors.muted, fontSize: 12, fontWeight: '600' },
  value: { color: travelColors.ink, fontSize: 16, fontWeight: '800', marginBottom: 3 },
});
