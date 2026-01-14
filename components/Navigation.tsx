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
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-neutral-200/50 dark:border-white/5 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-xl transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('LANDING')}
          >
             <motion.div 
               whileHover={{ rotate: 180 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="p-2 bg-neutral-100 dark:bg-white/5 rounded-full border border-neutral-200 dark:border-white/10 group-hover:border-brand-accent/50 transition-colors"
             >
                <Sparkles className="w-4 h-4 text-brand-accent" />
             </motion.div>
             <h1 className="text-xl font-serif text-neutral-900 dark:text-brand-light tracking-wide transition-colors">BuildFest</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-5 py-2 text-sm tracking-wide transition-colors duration-300 rounded-full group overflow-hidden"
              >
                {currentView === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-neutral-200/50 dark:bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Hover effect for non-active items */}
                {currentView !== item.id && (
                  <div className="absolute inset-0 bg-neutral-100/0 dark:bg-white/0 group-hover:bg-neutral-100/50 dark:group-hover:bg-white/5 rounded-full transition-colors duration-200" />
                )}
                
                <span className={`relative z-10 font-medium ${
                  currentView === item.id
                    ? 'text-brand-accent'
                    : 'text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-brand-light'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}

             <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest pl-6 border-l border-neutral-200 dark:border-white/10 ml-4 h-8 flex items-center">
                Est. 2026
             </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              className="text-neutral-900 dark:text-neutral-400 hover:text-brand-accent p-2 transition-colors"
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
            className="fixed inset-0 z-40 bg-brand-light dark:bg-brand-dark pt-24 px-6 md:hidden overflow-hidden flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-4xl font-serif text-left py-2 border-b border-neutral-100 dark:border-white/5 ${
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
              className="pt-8"
            >
                <p className="text-neutral-500 dark:text-neutral-600 font-mono text-xs uppercase tracking-widest mb-2">
                    Event Status
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                  </span>
                  <span className="text-sm dark:text-brand-light">Live & Building</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};