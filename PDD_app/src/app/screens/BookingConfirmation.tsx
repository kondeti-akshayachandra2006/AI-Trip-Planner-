import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Download, Share2 } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { motion } from 'motion/react';

export default function BookingConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your reservation has been successfully made
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md space-y-4"
        >
          <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <h3 className="font-bold mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Hotel Plaza Athénée</div>
                  <div className="text-sm text-muted-foreground">Champs-Élysées, Paris</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Jun 15-22, 2026</div>
                  <div className="text-sm text-muted-foreground">7 nights</div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-bold">#TRP-2026-1234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="text-2xl font-bold text-primary">$475</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg">
            <Download className="w-5 h-5" />
            Download
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="w-5 h-5" />
            Share
          </Button>
        </div>
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/success')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
