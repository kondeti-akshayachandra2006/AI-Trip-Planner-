import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import Button from '../components/Button';

export default function Onboarding1() {
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
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-8"
          >
            <Compass className="w-32 h-32 text-primary" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Discover Your Next Adventure
          </h2>
          <p className="text-muted-foreground mb-8">
            AI-powered trip planning that understands your travel style and preferences
          </p>
        </motion.div>
      </div>

      <div className="p-8 space-y-4">
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/onboarding-2')}
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
        <div className="w-8 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
      </div>
    </div>
  );
}
