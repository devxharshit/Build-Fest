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
    <div className="max-w-3xl mx-auto pt-20 pb-40 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={item} className="mb-20">
          <h2 className="text-4xl md:text-5xl text-neutral-900 dark:text-brand-light mb-6 font-serif transition-colors">The Philosophy</h2>
          <div className="h-px w-24 bg-brand-accent/50"></div>
        </motion.header>

        <div className="space-y-16">
          {RULES_PHILOSOPHY.map((rule, idx) => (
            <motion.div key={idx} variants={item} className="md:pl-10 relative">
              <div className="hidden md:block absolute left-0 top-3 w-2 h-2 rounded-full bg-neutral-300 dark:bg-white/20 transition-colors"></div>
              <h3 className="text-2xl text-neutral-800 dark:text-brand-light font-serif mb-4 transition-colors">{rule.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed font-light transition-colors">
                {rule.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={item}
          className="mt-24 p-8 border border-neutral-200 dark:border-white/10 rounded-lg bg-white dark:bg-white/5 text-center transition-colors"
        >
            <p className="text-neutral-500 font-mono text-sm">
                "The code is transient. The feeling remains."
            </p>
        </motion.div>
      </motion.div>
    </div>
  );
};