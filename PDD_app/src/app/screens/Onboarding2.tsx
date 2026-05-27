import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function Onboarding2() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md flex flex-col items-center text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-64 h-64 bg-gradient-to-br from-secondary/20 to-purple-400/20 rounded-full flex items-center justify-center mb-8 relative"
          >
            <Sparkles className="w-32 h-32 text-secondary" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-dashed border-secondary/30 rounded-full"
            ></motion.div>
          </motion.div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-secondary to-purple-600 bg-clip-text text-transparent">
            Smart AI Recommendations
          </h2>
          <p className="text-muted-foreground mb-8">
            Get personalized itineraries, hotel suggestions, and activity recommendations powered by AI
          </p>
        </motion.div>
      </div>

      <div className="p-8 space-y-4">
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/onboarding-3')}
        >
          Next
        </Button>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-center text-muted-foreground"
        >
          Skip
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-6">
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-8 h-2 bg-secondary rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
      </div>
    </div>
  );
}
