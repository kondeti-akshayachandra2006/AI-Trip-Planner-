import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe2 } from 'lucide-react';
import Button from '../components/Button';

export default function Onboarding3() {
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
            animate={{ rotateY: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-64 h-64 bg-gradient-to-br from-accent/20 to-teal-400/20 rounded-full flex items-center justify-center mb-8"
          >
            <Globe2 className="w-32 h-32 text-accent" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent to-teal-600 bg-clip-text text-transparent">
            Travel Smarter Together
          </h2>
          <p className="text-muted-foreground mb-8">
            Collaborate with friends, manage budgets, and create unforgettable memories
          </p>
        </motion.div>
      </div>

      <div className="p-8 space-y-4">
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/signup')}
        >
          Get Started
        </Button>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-center text-muted-foreground"
        >
          Already have an account? Sign In
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-6">
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-8 h-2 bg-accent rounded-full"></div>
      </div>
    </div>
  );
}
