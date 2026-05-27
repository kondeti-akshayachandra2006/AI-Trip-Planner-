import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Mic, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { fetchJson } from '../lib/api';

const assistantPromptSuggestions = [
  'Create a 5-day itinerary for Lisbon with a medium budget',
  'Suggest family-friendly activities in Kyoto',
  'What should I pack for a rainy trip to London?',
  'Find safe dining and transport options in Bali',
];

export default function AIChatAssistant() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hi! I’m your AI travel assistant. Tell me where you want to go and I’ll build the trip.' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const recognition = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;
    return recognitionInstance;
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) setInput((prev) => `${prev} ${transcript}`.trim());
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
      setError('Voice input is unavailable in this browser.');
    };
  }, [recognition]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    setError('');
    const nextMessage = { id: Date.now(), type: 'user', text: messageText };
    setMessages((prev) => [...prev, nextMessage]);
    setInput('');
    setIsSending(true);

    try {
      const loadingMessage = { id: Date.now() + 1, type: 'ai', text: 'Thinking through your itinerary...' };
      setMessages((prev) => [...prev, nextMessage, loadingMessage]);

      const response = await fetchJson('/api/chat', {
        method: 'POST',
        authToken: token ?? undefined,
        body: { prompt: messageText, history: messages.map((msg) => ({ role: msg.type === 'user' ? 'user' : 'assistant', content: msg.text })) },
      });

      setMessages((prev) => prev.map((msg) => (msg.id === loadingMessage.id ? { ...msg, text: response.answer } : msg)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach the assistant.');
      setMessages((prev) => prev.filter((item) => item.text !== 'Thinking through your itinerary...'));
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    await handleSendMessage(input);
  };

  const toggleVoice = () => {
    if (!recognition) {
      setError('Voice input is not supported in this browser.');
      return;
    }
    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    recognition.start();
    setListening(true);
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-bold">AI Travel Assistant</h1>
            <p className="text-white/80 text-sm">Ask about itinerary planning, hotels, weather, safety, transportation and local tips.</p>
          </div>
          <button onClick={() => navigate('/ai-prompts')} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
          {assistantPromptSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-left hover:bg-white/15"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-2 flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] p-4 rounded-3xl ${message.type === 'user' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-muted'}`}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border bg-background/90 backdrop-blur-sm">
        {error ? <div className="text-sm text-red-500 mb-3">{error}</div> : null}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleVoice}
            className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition ${listening ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Ask about destination, hotels, packing, safety..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
            className="flex-1 px-4 py-3 bg-input-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button variant="gradient" size="sm" className="px-4" onClick={handleSubmit} disabled={isSending}>
            {isSending ? 'Sending…' : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
