import React, { useState, useEffect } from 'react';
import { DARES } from '../constants';
import { Dare, LockedDare } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Shuffle, Eye } from 'lucide-react';

export const DareBoxView: React.FC = () => {
  const [currentDare, setCurrentDare] = useState<Dare | null>(null);
  const [lockedDare, setLockedDare] = useState<LockedDare | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('buildfest_locked_dare');
    if (saved) {
      setLockedDare(JSON.parse(saved));
    }
  }, []);

  const revealDare = () => {
    setLoading(true);
    setIsRevealed(false);
    
    // Simulate a "shuffling" delay for effect
    setTimeout(() => {
      const random = DARES[Math.floor(Math.random() * DARES.length)];
      setCurrentDare(random);
      setIsRevealed(true);
      setLoading(false);
    }, 800);
  };

  const lockDare = () => {
    if (!currentDare || !teamName.trim()) return;
    
    const locked: LockedDare = {
      dareId: currentDare.id,
      dareText: currentDare.text,
      teamName: teamName,
      timestamp: Date.now()
    };
    
    // "Quietly store in background" simulation
    console.log('Sending to server...', locked);
    localStorage.setItem('buildfest_locked_dare', JSON.stringify(locked));
    setLockedDare(locked);
  };

  return (
    <div className="max-w-3xl mx-auto pt-20 pb-40 px-6 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl text-neutral-900 dark:text-brand-light mb-4 font-serif transition-colors">The Dare Box</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light transition-colors">
            Optional. Dangerous. Irreversible (sort of).
          </p>
        </header>

        {lockedDare ? (
          <div className="bg-white dark:bg-white/5 border border-brand-accent/30 p-10 rounded-lg text-center shadow-2xl shadow-brand-accent/10 transition-colors">
            <Lock className="w-8 h-8 text-brand-accent mx-auto mb-6" />
            <h3 className="text-neutral-500 dark:text-neutral-300 font-mono text-sm uppercase tracking-widest mb-4">Dare Locked for {lockedDare.teamName}</h3>
            <p className="text-2xl md:text-3xl text-neutral-900 dark:text-brand-light font-serif leading-tight">
              {lockedDare.dareText}
            </p>
            <div className="mt-8 text-neutral-400 dark:text-neutral-600 text-xs">
              Locked on {new Date(lockedDare.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-12">
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-48 flex items-center justify-center text-brand-accent"
                >
                  <Shuffle className="w-10 h-10 animate-spin opacity-50" />
                </motion.div>
              ) : isRevealed && currentDare ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  className="text-center max-w-xl"
                >
                  <div className="mb-4 inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-white/10 text-xs text-neutral-500 uppercase tracking-widest transition-colors">
                    Intensity: {currentDare.intensity}
                  </div>
                  <p className="text-2xl md:text-3xl text-neutral-900 dark:text-brand-light font-serif leading-relaxed mb-10 transition-colors">
                    {currentDare.text}
                  </p>
                  
                  <div className="flex flex-col items-center space-y-4">
                     <input
                      type="text"
                      placeholder="Enter Team Name to Lock"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="bg-transparent border-b border-neutral-300 dark:border-neutral-700 text-center text-neutral-900 dark:text-neutral-300 py-2 px-4 focus:outline-none focus:border-brand-accent transition-colors placeholder-neutral-400 dark:placeholder-neutral-700"
                    />
                    <button
                      onClick={lockDare}
                      disabled={!teamName.trim()}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                        teamName.trim() 
                          ? 'bg-brand-accent/20 text-brand-accent hover:bg-brand-accent/40 hover:text-brand-light border border-brand-accent/50' 
                          : 'bg-transparent text-neutral-400 dark:text-neutral-700 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                      <span>Accept This Dare</span>
                    </button>
                    
                    <button
                      onClick={revealDare}
                      className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-600 dark:hover:text-neutral-400 mt-4 transition-colors text-sm"
                    >
                      Draw again
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="trigger"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={revealDare}
                  className="group relative w-64 h-64 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent/50 transition-colors shadow-sm dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Eye className="w-12 h-12 text-neutral-400 dark:text-neutral-700 group-hover:text-brand-accent transition-colors mb-4" />
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono text-sm tracking-widest group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors">REVEAL DARE</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};