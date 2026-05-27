import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const faqs = [
  { question: 'How do I modify my booking?', answer: 'Visit My Trips and select the booking you want to modify.' },
  { question: 'What is the cancellation policy?', answer: 'Cancellation policies vary by booking. Check your confirmation email for details.' },
  { question: 'How does AI itinerary work?', answer: 'Our AI analyzes your preferences and creates personalized day-by-day travel plans.' },
];

export default function HelpAndSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Help & Support</h1>
            <p className="text-white/80 text-sm">We're here to help</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="font-bold mb-3">Contact Us</h2>
          <div className="grid grid-cols-1 gap-3">
            <GlassCard className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@tripai.com</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Phone Support</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </GlassCard>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <GlassCard key={index}>
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <button className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-muted-foreground">
          View All FAQs
        </button>
      </div>
    </div>
  );
}
