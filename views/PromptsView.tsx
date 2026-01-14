import React from 'react';
import { PROMPTS } from '../constants';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export const PromptsView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto pt-16 pb-40 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={item} className="mb-20 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl text-neutral-900 dark:text-brand-light mb-6 font-serif">The Prompts</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Choose one. Interpret it loosely. Define your own constraints.
          </p>
        </motion.header>

        <div className="grid gap-8">
          {PROMPTS.map((prompt, index) => (
            <motion.div 
              key={prompt.id} 
              variants={item}
              className="glass-panel glass-panel-hover p-8 md:p-12 group cursor-default relative overflow-hidden"
            >
              {/* Decorative Number Background */}
              <div className="absolute -right-4 -top-8 text-[12rem] font-serif opacity-[0.03] dark:opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                {index + 1}
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="flex-shrink-0 pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-accent border border-brand-accent/30 px-2 py-1 rounded bg-brand-accent/5">
                    Prompt {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 border-b border-neutral-200 dark:border-white/5 pb-6">
                    <h3 className="text-3xl md:text-4xl text-neutral-800 dark:text-brand-light font-serif group-hover:text-brand-accent transition-colors duration-300">
                      {prompt.title}
                    </h3>
                    <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs uppercase tracking-wider">
                      Theme: {prompt.theme}
                    </span>
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed whitespace-pre-line max-w-3xl">
                    {prompt.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={item}
          className="mt-24 text-center"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 text-xs font-mono tracking-widest">
            End of List • Begin Anywhere
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};