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

const floatingVariant: Variants = {
  animate: {
    y: [0, -40, 0],
    x: [0, 20, 0],
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    rotate: [0, 10, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden bg-brand-dark selection:bg-brand-accent/30 selection:text-brand-accent">
      
      {/* Noise Overlay - adds texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Atmospheric Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Blue/Indigo orb */}
        <motion.div 
          variants={floatingVariant}
          animate="animate"
          className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen"
        />
        {/* Amber/Accent orb - subtle warmth */}
        <motion.div 
          variants={floatingVariant}
          animate="animate"
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-amber-900/10 rounded-full blur-[140px] mix-blend-screen"
        />
        {/* Teal/Cyan orb - mystery */}
        <motion.div 
           animate={{
             x: [0, -50, 0],
             y: [0, 60, 0],
             scale: [1, 1.1, 1],
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-teal-900/10 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

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
              className="p-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-2xl"
            >
                <Sparkles className="w-8 h-8 text-brand-accent/80" />
            </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-7xl md:text-9xl font-serif text-brand-light tracking-tighter mb-8 drop-shadow-2xl"
        >
          BuildFest
        </motion.h1>
        
        <motion.div variants={itemVariants} className="space-y-6 mb-16 max-w-2xl">
          <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
            A vibe-driven creative event. <span className="text-neutral-600 px-2">•</span> No problem statements.
          </p>
          <p className="text-lg text-neutral-500 font-mono tracking-wide">
             Just the quiet hours and the code.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 px-10 py-5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-brand-light text-lg font-medium tracking-widest transition-all hover:border-brand-accent/50 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)]"
          >
            <span className="relative z-10">ENTER THE NIGHT</span>
            <ArrowRight className="w-5 h-5 text-brand-accent transition-transform duration-300 group-hover:translate-x-2" />
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-12 left-0 w-full flex justify-between px-12 text-neutral-600 font-mono text-[10px] uppercase tracking-[0.3em] z-10"
      >
        <span>Est. 2026</span>
        <span>Open Invitation</span>
        <span>V.1.0</span>
      </motion.div>
    </div>
  );
};