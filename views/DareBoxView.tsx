import React, { useState, useEffect } from 'react';
import { DARES } from '../constants';
import { Dare, LockedDare } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shuffle, Eye, AlertTriangle } from 'lucide-react';

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
    localStorage.setItem('buildfest_locked_dare', JSON.stringify(locked));
    setLockedDare(locked);
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-40 px-6 min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <header className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl text-neutral-900 dark:text-brand-light mb-4 font-serif">The Dare Box</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-brand-accent" />
            <span>Optional. Dangerous. Irreversible.</span>
          </p>
        </header>

        <div className="flex justify-center">
          {lockedDare ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel p-12 max-w-2xl w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
              <Lock className="w-10 h-10 text-brand-accent mx-auto mb-8" />
              
              <div className="mb-8">
                <h3 className="text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
                  Locked for Team <span className="text-brand-accent">{lockedDare.teamName}</span>
                </h3>
                <p className="text-3xl md:text-4xl text-neutral-900 dark:text-brand-light font-serif leading-tight">
                  {lockedDare.dareText}
                </p>
              </div>

              <div className="inline-block px-4 py-2 rounded bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-neutral-500 text-[10px] font-mono uppercase tracking-widest">
                Timestamp: {new Date(lockedDare.timestamp).toLocaleTimeString()}
              </div>
            </motion.div>
          ) : (
            <div className="w-full max-w-xl">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-panel h-80 flex flex-col items-center justify-center text-brand-accent"
                  >
                    <Shuffle className="w-12 h-12 animate-spin mb-4" />
                    <span className="font-mono text-xs uppercase tracking-widest animate-pulse">Shuffling Fate...</span>
                  </motion.div>
                ) : isRevealed && currentDare ? (
                  <motion.div
                    key="result"
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="glass-panel p-10 text-center"
                  >
                    <div className="mb-6 flex justify-center">
                       <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                         currentDare.intensity === 'High' 
                           ? 'border-red-500/50 text-red-500 bg-red-500/10' 
                           : 'border-brand-accent/50 text-brand-accent bg-brand-accent/10'
                       }`}>
                         Intensity: {currentDare.intensity}
                       </span>
                    </div>

                    <p className="text-2xl md:text-3xl text-neutral-900 dark:text-brand-light font-serif leading-relaxed mb-10">
                      {currentDare.text}
                    </p>
                    
                    <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-white/10">
                       <input
                        type="text"
                        placeholder="Enter Team Name to Lock"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="input-minimal text-center text-xl"
                      />
                      
                      <button
                        onClick={lockDare}
                        disabled={!teamName.trim()}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Accept This Dare</span>
                      </button>
                      
                      <button
                        onClick={revealDare}
                        className="btn-ghost text-sm w-full py-2"
                      >
                        Draw again
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="trigger"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={revealDare}
                    className="glass-panel glass-panel-hover w-full h-80 flex flex-col items-center justify-center group"
                  >
                    <div className="p-6 rounded-full bg-neutral-100 dark:bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300">
                       <Eye className="w-10 h-10 text-neutral-400 dark:text-neutral-500 group-hover:text-brand-accent transition-colors" />
                    </div>
                    <span className="text-neutral-900 dark:text-brand-light text-xl font-serif mb-2">Reveal a Dare</span>
                    <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs uppercase tracking-widest">Click to randomize</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};