import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { askAssistant } from '@/services/aiService';
import { useTripStore } from '@/redux/tripStore';
import { travelColors } from '@/components/travel/TravelTheme';

type ChatMessage = { role: 'user' | 'ai'; text: string };
const suggestedQueries = [
  'Plan a 3-day Goa trip under ₹15,000',
  'Best places to visit in Manali in winter',
  'Suggest food places in Hyderabad',
  'Is it safe to travel to Delhi now?'
];

export default function AssistantScreen() {
  const { state } = useTripStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'I can help with routes, weather, hotels, food, public transport, budget, and safety. Ask me anything about your trip.' },
  ]);
  const [loading, setLoading] = useState(false);

  async function send(messageText?: string) {
    const prompt = messageText ?? input.trim();
    if (!prompt) return;
    setMessages((current) => [...current, { role: 'user', text: prompt }]);
    setInput('');
    setLoading(true);
    const answer = askAssistant(prompt, state.currentPlan);
    setTimeout(() => {
      setMessages((current) => [...current, { role: 'ai', text: answer }]);
      setLoading(false);
    }, 650);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>AI travel guide</Text>
        <Text style={styles.subtitle}>Voice-ready assistant for real-time travel decisions.</Text>
      </View>
      <View style={styles.promptBar}>
        {suggestedQueries.map((query) => (
          <Pressable key={query} style={styles.promptChip} onPress={() => send(query)}>
            <Text style={styles.promptText}>{query}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => (
          <View key={`${message.role}-${index}`} style={[styles.bubble, message.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={[styles.bubbleText, message.role === 'user' && styles.userText]}>{message.text}</Text>
          </View>
        ))}
        {loading && <Text style={styles.loadingText}>AI is typing...</Text>}
      </ScrollView>
      <View style={styles.composer}>
        <Pressable style={styles.mic}><Ionicons name="mic" size={19} color={travelColors.blue} /></Pressable>
        <TextInput value={input} onChangeText={setInput} placeholder="Ask about safety, food, hotels..." placeholderTextColor="#98A2B3" style={styles.input} />
        <Pressable style={styles.send} onPress={() => send()}><Ionicons name="send" size={18} color="#fff" /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F3F8FB', flex: 1, paddingTop: 32 },
  header: { paddingHorizontal: 18 },
  title: { color: travelColors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: travelColors.muted, fontSize: 15, fontWeight: '700', lineHeight: 22, marginTop: 4 },
  promptBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, margin: 18 },
  promptChip: { backgroundColor: '#fff', borderColor: travelColors.line, borderRadius: 18, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  promptText: { color: travelColors.ink, fontSize: 13, fontWeight: '700' },
  messages: { gap: 10, padding: 18, paddingBottom: 110 },
  bubble: { borderRadius: 20, maxWidth: '88%', padding: 14 },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#fff', borderColor: travelColors.line, borderWidth: 1 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: travelColors.blue },
  bubbleText: { color: travelColors.ink, fontSize: 14, fontWeight: '700', lineHeight: 21 },
  userText: { color: '#fff' },
  loadingText: { color: travelColors.muted, fontSize: 13, fontWeight: '700', marginHorizontal: 18, marginTop: 6 },
  composer: { alignItems: 'center', backgroundColor: '#fff', borderTopColor: travelColors.line, borderTopWidth: 1, bottom: 66, flexDirection: 'row', gap: 10, left: 0, padding: 12, position: 'absolute', right: 0 },
  mic: { alignItems: 'center', backgroundColor: '#EAF2FF', borderRadius: 999, height: 42, justifyContent: 'center', width: 42 },
  input: { backgroundColor: '#F6FAFD', borderRadius: 999, color: travelColors.ink, flex: 1, fontSize: 14, fontWeight: '700', minHeight: 42, paddingHorizontal: 14 },
  send: { alignItems: 'center', backgroundColor: travelColors.blue, borderRadius: 999, height: 42, justifyContent: 'center', width: 42 },
});
