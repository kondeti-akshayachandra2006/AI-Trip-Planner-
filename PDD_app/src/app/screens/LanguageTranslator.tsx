import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Volume2, Copy, ArrowDownUp } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function LanguageTranslator() {
  const navigate = useNavigate();
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('French');
  const [inputText, setInputText] = useState('');

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold">Translator</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <select
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="flex-1 px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>Japanese</option>
          </select>
          <button className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <ArrowDownUp className="w-5 h-5 text-white" />
          </button>
          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="flex-1 px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none"
          >
            <option>French</option>
            <option>English</option>
            <option>Spanish</option>
            <option>Japanese</option>
          </select>
        </div>

        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{fromLang}</span>
            <button className="text-primary">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <textarea
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-32 bg-transparent resize-none focus:outline-none"
          />
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{toLang}</span>
            <div className="flex gap-2">
              <button className="text-primary">
                <Volume2 className="w-5 h-5" />
              </button>
              <button className="text-primary">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="min-h-32">
            <p>Bonjour, comment puis-je vous aider?</p>
          </div>
        </GlassCard>

        <div>
          <h2 className="font-bold mb-3">Common Phrases</h2>
          <div className="space-y-2">
            {[
              { en: 'Hello', fr: 'Bonjour' },
              { en: 'Thank you', fr: 'Merci' },
              { en: 'How much?', fr: 'Combien?' },
              { en: 'Where is...?', fr: 'Où est...?' },
            ].map((phrase, index) => (
              <button
                key={index}
                className="w-full p-3 bg-muted rounded-2xl text-left hover:bg-muted/80 transition-all"
              >
                <div className="font-medium">{phrase.en}</div>
                <div className="text-sm text-muted-foreground">{phrase.fr}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
