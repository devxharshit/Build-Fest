import React, { useState } from 'react';
import { ViewState } from '../types';
import { Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isDark, toggleTheme }) => {
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
             <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-white/10 group-hover:border-brand-accent/50 transition-colors">
                <Sparkles className="w-4 h-4 text-brand-accent" />
             </div>
             <h1 className="text-xl font-serif text-neutral-900 dark:text-brand-light tracking-wide transition-colors">BuildFest</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-wide transition-all duration-300 ${
                  currentView === item.id
                    ? 'text-brand-accent font-medium'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                }`}
              >
                {item.label}
              </button>
            ))}
             
             {/* Divider */}
             <div className="h-4 w-px bg-neutral-200 dark:bg-white/10"></div>

             {/* Theme Toggle */}
             <button
               onClick={toggleTheme}
               className="p-2 text-neutral-500 hover:text-brand-accent dark:text-neutral-400 dark:hover:text-brand-light transition-colors"
               aria-label="Toggle Theme"
             >
               {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>

             <div className="text-xs font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest pl-4">
                Est. 2026
             </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button
               onClick={toggleTheme}
               className="p-2 text-neutral-500 dark:text-neutral-400"
             >
               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-light dark:bg-brand-dark pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-3xl font-serif text-left ${
                    currentView === item.id
                      ? 'text-brand-accent'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-900">
                <p className="text-neutral-500 dark:text-neutral-600 font-mono text-sm uppercase tracking-widest">
                    Vibe First. Code Later.
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};