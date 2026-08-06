import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Mic, Sparkles, Bot, Compass, Plane, Hotel, UtensilsCrossed, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_24%),linear-gradient(135deg,_#f8fbff_0%,_#eef5ff_100%)] p-4 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.1)]">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-white">AI Travel Assistant</h1>
              <p className="mt-1 text-sm text-white/80">Plan stay, transport, dining and safety in one conversation.</p>
            </div>
            <button onClick={() => navigate('/ai-prompts')} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
              <Sparkles className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Flights', icon: Plane },
              { label: 'Hotels', icon: Hotel },
              { label: 'Dining', icon: UtensilsCrossed },
              { label: 'Safety', icon: ShieldCheck },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} onClick={() => setInput(`Help me plan ${item.label.toLowerCase()} for my next trip`)} className="rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-left text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:flex-row">
          <div className="w-full border-b border-slate-200 p-4 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Bot className="h-4 w-4 text-primary" />
                Suggested prompts
              </div>
              <div className="mt-3 space-y-2">
                {assistantPromptSuggestions.map((suggestion) => (
                  <button key={suggestion} onClick={() => setInput(suggestion)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-600 shadow-sm hover:border-primary hover:text-primary">
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className="mr-2 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                      <Compass className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-[24px] p-4 ${message.type === 'user' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-slate-50 text-slate-700'}`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 p-4 lg:p-6">
              {error ? <div className="mb-3 text-sm text-red-500">{error}</div> : null}
              <div className="flex items-center gap-3">
                <button type="button" onClick={toggleVoice} className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 transition ${listening ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700'}`}>
                  <Mic className="h-5 w-5" />
                </button>
                <input type="text" placeholder="Ask about destination, hotels, packing, safety..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSubmit()} className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 focus:border-primary" />
                <Button variant="gradient" size="sm" className="px-4" onClick={handleSubmit} disabled={isSending}>
                  {isSending ? 'Sending…' : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
