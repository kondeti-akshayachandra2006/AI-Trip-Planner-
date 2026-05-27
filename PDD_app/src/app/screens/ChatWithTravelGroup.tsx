import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Smile, Image, MapPin } from 'lucide-react';

const messages = [
  { id: 1, user: 'Sarah', avatar: '👩', text: 'Can\'t wait for this trip!', time: '10:30 AM' },
  { id: 2, user: 'You', text: 'Me too! Just booked the Eiffel Tower tickets', time: '10:32 AM', isMe: true },
  { id: 3, user: 'Mike', avatar: '👨', text: 'Great! Should we book the Seine cruise for Day 2?', time: '10:35 AM' },
];

export default function ChatWithTravelGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState('');

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-bold">Paris Group</h1>
            <p className="text-white/80 text-sm">4 members</p>
          </div>
          <button className="text-white">
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isMe && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-2 flex-shrink-0 text-lg">
                {message.avatar}
              </div>
            )}
            <div className={`max-w-[75%] ${message.isMe ? 'text-right' : ''}`}>
              {!message.isMe && <div className="text-xs text-muted-foreground mb-1">{message.user}</div>}
              <div
                className={`inline-block p-4 rounded-3xl ${
                  message.isMe
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-muted'
                }`}
              >
                <p>{message.text}</p>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{message.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground">
            <Smile className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground">
            <Image className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-input-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
