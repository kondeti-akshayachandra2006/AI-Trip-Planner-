import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`backdrop-blur-md bg-white/70 dark:bg-white/10 border border-white/20 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all ${className}`}
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </motion.div>
  );
}
