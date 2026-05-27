import { StyleSheet, Text, View } from 'react-native';
import { travelColors } from './TravelTheme';

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 18 },
  title: { color: travelColors.ink, fontSize: 19, fontWeight: '800' },
  action: { color: travelColors.blue, fontSize: 13, fontWeight: '700' },
});
