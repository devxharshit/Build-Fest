import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingViewProps {
  onEnter: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.19, 1, 0.22, 1] // Power4.out
    }
  }
};

export const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden selection:bg-brand-accent/30 selection:text-brand-accent">
      
      {/* Dark Overlay Gradient to ensure text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-brand-dark via-transparent to-transparent" />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl relative z-10 flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="p-4 rounded-full border border-brand-accent/20 bg-brand-accent/5 backdrop-blur-md shadow-[0_0_40px_-5px_rgba(251,196,3,0.3)]"
            >
                <Sparkles className="w-8 h-8 text-brand-accent" />
            </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-7xl md:text-9xl font-serif text-brand-light tracking-tighter mb-8 drop-shadow-2xl mix-blend-overlay"
        >
          BuildFest
        </motion.h1>
        
        <motion.div variants={itemVariants} className="space-y-6 mb-16 max-w-2xl">
          <p className="text-xl md:text-2xl text-brand-light/90 font-light leading-relaxed drop-shadow-lg">
            A vibe-driven creative event. <span className="text-brand-accent px-2">•</span> No problem statements.
          </p>
          <p className="text-lg text-brand-light/60 font-mono tracking-wide">
             Just the quiet hours and the code.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(251,196,3,0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 px-10 py-5 border border-brand-light/20 rounded-full bg-brand-panel/60 backdrop-blur-sm text-brand-light text-lg font-medium tracking-widest transition-all hover:border-brand-accent/50 hover:shadow-[0_0_30px_-5px_rgba(251,196,3,0.3)] overflow-hidden"
          >
            <span className="relative z-10">ENTER THE NIGHT</span>
            <ArrowRight className="w-5 h-5 text-brand-accent transition-transform duration-300 group-hover:translate-x-2 relative z-10" />
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-12 left-0 w-full flex justify-between px-12 text-brand-light/30 font-mono text-[10px] uppercase tracking-[0.3em] z-10"
      >
        <span>Est. 2026</span>
        <span>Open Invitation</span>
        <span>V.1.0</span>
      </motion.div>
    </div>
  );
};