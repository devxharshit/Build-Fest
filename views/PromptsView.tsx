import React from 'react';
import { PROMPTS } from '../constants';
import { motion } from 'framer-motion';

export const PromptsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pt-20 pb-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl text-neutral-900 dark:text-brand-light mb-4 font-serif transition-colors">The Prompts</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto transition-colors">
            Choose one. Interpret it loosely. Define your own constraints.
          </p>
        </header>

        <div className="space-y-24">
          {PROMPTS.map((prompt, index) => (
            <div key={prompt.id} className="group">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-6">
                <span className="text-brand-accent/50 font-mono text-sm tracking-widest">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-4xl text-neutral-800 dark:text-brand-light font-serif group-hover:text-brand-accent transition-colors duration-500">
                  {prompt.title}
                </h3>
                <span className="text-neutral-500 dark:text-neutral-600 font-mono text-xs uppercase tracking-wider md:ml-auto transition-colors">
                  {prompt.theme}
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed whitespace-pre-line border-l border-neutral-300 dark:border-white/10 pl-6 md:pl-0 md:border-l-0 transition-colors">
                {prompt.body}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-32 text-center text-neutral-400 dark:text-neutral-600 text-sm transition-colors">
           End of list. Begin anywhere.
        </div>
      </motion.div>
    </div>
  );
};