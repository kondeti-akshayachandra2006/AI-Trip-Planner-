import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, PartyPopper } from 'lucide-react';
import Button from '../components/Button';
import confetti from 'canvas-confetti';

export default function SuccessCelebration() {
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366F1', '#8B5CF6', '#06B6D4'],
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366F1', '#8B5CF6', '#06B6D4'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary via-secondary to-accent flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, times: [0, 0.6, 1] }}
        className="relative z-10 mb-8"
      >
        <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <PartyPopper className="w-16 h-16 text-white" />
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="w-12 h-12 text-yellow-300" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          You're All Set!
        </h1>
        <p className="text-white/80 text-lg mb-2">
          Your amazing journey awaits
        </p>
        <p className="text-white/60">
          We can't wait to help you create unforgettable memories
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md space-y-3 relative z-10"
      >
        <Button
          variant="gradient"
          size="lg"
          className="w-full bg-white text-primary hover:bg-white/90"
          onClick={() => navigate('/home')}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="w-full text-white hover:bg-white/10"
          onClick={() => navigate('/itinerary/1')}
        >
          View My Trip
        </Button>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-white/40 text-sm"
      >
        ✈️ Happy Travels! ✈️
      </motion.div>
    </div>
  );
}
