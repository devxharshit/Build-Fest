import React from 'react';
import { RULES_PHILOSOPHY } from '../constants';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const RulebookView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16 pb-40 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={item} className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl text-neutral-900 dark:text-brand-light mb-6 font-serif">The Philosophy</h2>
          <div className="h-0.5 w-24 bg-brand-accent mx-auto"></div>
        </motion.header>

        <div className="space-y-12">
          {RULES_PHILOSOPHY.map((rule, idx) => (
            <motion.div key={idx} variants={item} className="glass-panel p-10 relative overflow-hidden group">
               {/* Subtle background number */}
               <div className="absolute -right-2 -top-6 text-9xl font-serif opacity-[0.02] dark:opacity-[0.03] group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                 {idx + 1}
               </div>

              <div className="relative z-10 md:pl-4 border-l-2 border-brand-accent/30 md:border-none">
                 <div className="hidden md:block absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                 <h3 className="text-2xl text-neutral-900 dark:text-brand-light font-serif mb-4 group-hover:text-brand-accent transition-colors">
                   {rule.title}
                 </h3>
                 <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed font-light">
                  {rule.content}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={item}
          className="mt-24 text-center opacity-60 hover:opacity-100 transition-opacity"
        >
            <p className="text-neutral-500 font-serif italic text-lg">
                "The code is transient. The feeling remains."
            </p>
        </motion.div>
      </motion.div>
    </div>
  );
};