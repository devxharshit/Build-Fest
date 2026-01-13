import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: ViewState; label: string }[] = [
    { id: 'PROMPTS', label: 'Prompts' },
    { id: 'DARE_BOX', label: 'Dare Box' },
    { id: 'FOOD', label: 'Fuel' },
    { id: 'SUBMIT', label: 'Submit' },
    { id: 'RULEBOOK', label: 'Rulebook' },
  ];

  const handleNavClick = (id: ViewState) => {
    setView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-neutral-200 dark:border-white/5 bg-brand-light/90 dark:bg-brand-dark/90 backdrop-blur-md transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('LANDING')}
          >
             <motion.div 
               whileHover={{ rotate: 180 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-white/10 group-hover:border-brand-accent/50 transition-colors"
             >
                <Sparkles className="w-4 h-4 text-brand-accent" />
             </motion.div>
             <h1 className="text-xl font-serif text-neutral-900 dark:text-brand-light tracking-wide transition-colors">BuildFest</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-4 py-2 text-sm tracking-wide transition-colors duration-300"
              >
                {currentView === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-neutral-100 dark:bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 ${
                  currentView === item.id
                    ? 'text-brand-accent font-medium'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}

             <div className="text-xs font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest pl-4">
                Est. 2026
             </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              className="text-neutral-900 dark:text-neutral-400 hover:text-brand-accent p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-light dark:bg-brand-dark pt-24 px-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-4xl font-serif text-left ${
                    currentView === item.id
                      ? 'text-brand-accent'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-900"
            >
                <p className="text-neutral-500 dark:text-neutral-600 font-mono text-sm uppercase tracking-widest">
                    Vibe First. Code Later.
                </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};