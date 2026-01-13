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
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const PromptsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pt-20 pb-40 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={item} className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl text-neutral-900 dark:text-brand-light mb-4 font-serif transition-colors">The Prompts</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto transition-colors">
            Choose one. Interpret it loosely. Define your own constraints.
          </p>
        </motion.header>

        <div className="space-y-24">
          {PROMPTS.map((prompt, index) => (
            <motion.div 
              key={prompt.id} 
              variants={item}
              className="relative"
            >
              {/* Heading Container - Hover Effect Isolated Here */}
              <div className="group cursor-pointer mb-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="text-brand-accent/50 font-mono text-sm tracking-widest group-hover:text-brand-accent transition-colors duration-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-3xl md:text-4xl text-neutral-800 dark:text-brand-light font-serif group-hover:text-brand-accent transition-colors duration-300">
                    {prompt.title}
                  </h3>
                  <span className="text-neutral-500 dark:text-neutral-600 font-mono text-xs uppercase tracking-wider md:ml-auto transition-colors group-hover:text-neutral-400">
                    {prompt.theme}
                  </span>
                </div>
              </div>
              
              {/* Paragraph Container */}
              <div className="pl-0 md:pl-10">
                 <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed whitespace-pre-line transition-colors">
                  {prompt.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={item}
          className="mt-32 text-center text-neutral-400 dark:text-neutral-600 text-sm transition-colors"
        >
           End of list. Begin anywhere.
        </motion.div>
      </motion.div>
    </div>
  );
};