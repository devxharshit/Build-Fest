import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingViewProps {
  onEnter: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-20">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <div className="mb-8 flex justify-center">
            <div className="p-3 bg-white dark:bg-white/5 rounded-full border border-neutral-200 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none">
                <Sparkles className="w-6 h-6 text-brand-accent" />
            </div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-neutral-900 dark:text-brand-light tracking-tight mb-8 transition-colors duration-500">
          BuildFest
        </h1>
        
        <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed mb-16 transition-colors duration-500">
          A vibe-driven creative event. <br className="hidden md:block" />
          No problem statements. <br/>
          Just the quiet hours and the code.
        </p>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-brand-light text-white dark:text-brand-dark rounded-full text-lg font-medium tracking-wide transition-all hover:shadow-lg dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
        >
          <span>Enter the Night</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 text-neutral-400 dark:text-neutral-600 font-mono text-xs uppercase tracking-[0.2em]"
      >
        Est. 2026 — Open Invitation
      </motion.div>
    </div>
  );
};