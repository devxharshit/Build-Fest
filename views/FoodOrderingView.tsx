import React, { useState } from 'react';
import { FOOD_OUTLETS } from '../constants';
import { FoodOutlet, OrderItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag, ArrowLeft, Check, Minus, Plus } from 'lucide-react';

type Step = 'SELECT_OUTLET' | 'ORDERING' | 'REVIEW' | 'CONFIRMATION';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const FoodOrderingView: React.FC = () => {
  const [step, setStep] = useState<Step>('SELECT_OUTLET');
  const [selectedOutlet, setSelectedOutlet] = useState<FoodOutlet | null>(null);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [teamName, setTeamName] = useState('');

  const addToCart = (itemId: string) => {
    if (!selectedOutlet) return;
    const item = selectedOutlet.items.find(i => i.id === itemId);
    if (!item) return;

    setCart(prev => {
      const existing = prev.find(i => i.item.id === itemId);
      if (existing) {
        return prev.map(i => i.item.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.item.id === itemId) {
          return { ...i, quantity: Math.max(0, i.quantity - 1) };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const getQuantity = (itemId: string) => {
    return cart.find(i => i.item.id === itemId)?.quantity || 0;
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSelectOutlet = (outlet: FoodOutlet) => {
    setSelectedOutlet(outlet);
    setCart([]); 
    setStep('ORDERING');
  };

  const submitOrder = () => {
    if (!teamName.trim()) return;
    setTimeout(() => {
      setStep('CONFIRMATION');
    }, 500);
  };

  const resetFlow = () => {
    setStep('SELECT_OUTLET');
    setCart([]);
    setSelectedOutlet(null);
    setTeamName('');
  };

  return (
    <div className="max-w-5xl mx-auto pt-16 pb-40 px-6">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: SELECT OUTLET */}
        {step === 'SELECT_OUTLET' && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            <header className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl text-neutral-900 dark:text-brand-light mb-4 font-serif">Late Night Fuel</h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-light">
                Ordering Window: <span className="text-brand-accent font-mono bg-brand-accent/10 px-2 py-0.5 rounded">01:00 – 01:30</span>
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              {FOOD_OUTLETS.map(outlet => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={outlet.id}
                  onClick={() => handleSelectOutlet(outlet)}
                  className="glass-panel glass-panel-hover p-10 h-72 text-left flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                    <Utensils className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-serif text-neutral-900 dark:text-brand-light mb-3 group-hover:text-brand-accent transition-colors">{outlet.name}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-[85%]">{outlet.description}</p>
                  </div>
                  <div className="relative z-10 flex items-center text-neutral-400 dark:text-neutral-500 text-xs font-mono uppercase tracking-widest group-hover:text-brand-accent transition-colors">
                    <span>View Menu</span>
                    <ShoppingBag className="w-4 h-4 ml-2" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: ORDERING */}
        {step === 'ORDERING' && selectedOutlet && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
                <button 
                onClick={() => setStep('SELECT_OUTLET')}
                className="btn-ghost flex items-center text-sm"
                >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <h2 className="text-2xl font-serif text-neutral-900 dark:text-brand-light">{selectedOutlet.name}</h2>
            </div>

            <motion.div 
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 mb-24"
            >
              {selectedOutlet.items.map(item => (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  className={`glass-panel p-6 flex items-center justify-between group ${getQuantity(item.id) > 0 ? 'border-brand-accent/40 bg-brand-accent/5' : ''}`}
                >
                  <div className="flex-1 pr-6">
                    <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-lg font-medium text-neutral-900 dark:text-brand-light">{item.name}</h4>
                        <span className="text-brand-accent font-mono text-sm">{item.price}</span>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-neutral-100 dark:bg-black/40 rounded-full px-2 py-1 border border-neutral-200 dark:border-white/10">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className={`p-2 rounded-full transition-colors ${getQuantity(item.id) > 0 ? 'text-neutral-900 dark:text-brand-light hover:bg-white/10' : 'text-neutral-400 cursor-not-allowed'}`}
                      disabled={getQuantity(item.id) === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center text-neutral-900 dark:text-brand-light font-mono text-sm">{getQuantity(item.id)}</span>
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="p-2 text-neutral-900 dark:text-brand-light hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="fixed bottom-10 left-0 w-full px-6 flex justify-center pointer-events-none z-30">
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.button
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep('REVIEW')}
                      className="pointer-events-auto btn-primary bg-brand-accent text-brand-dark border-transparent shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4)] flex items-center gap-3 px-8 py-4 text-lg"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Review Order ({totalItems})</span>
                    </motion.button>
                  )}
                </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 'REVIEW' && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-lg mx-auto glass-panel p-10"
          >
             <button 
              onClick={() => setStep('ORDERING')}
              className="btn-ghost flex items-center text-xs uppercase tracking-widest mb-8"
            >
              <ArrowLeft className="w-3 h-3 mr-2" /> Modify Order
            </button>

            <h3 className="text-3xl font-serif text-neutral-900 dark:text-brand-light mb-8">Confirm Order</h3>

            <div className="space-y-4 mb-10 border-b border-neutral-200 dark:border-white/10 pb-8">
                {cart.map(i => (
                    <div key={i.item.id} className="flex justify-between items-center">
                        <span className="text-neutral-700 dark:text-neutral-300">
                          <span className="inline-block w-8 h-8 text-center leading-8 rounded-full bg-brand-accent/10 text-brand-accent font-mono text-sm mr-3">{i.quantity}</span> 
                          {i.item.name}
                        </span>
                        <span className="text-neutral-500 font-mono text-sm">{i.item.price}</span>
                    </div>
                ))}
            </div>

            <div className="mb-10">
                <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono mb-3">Team Name</label>
                <input
                    autoFocus
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="The Night Owls"
                    className="input-minimal text-xl"
                />
            </div>

            <button
                onClick={submitOrder}
                disabled={!teamName.trim()}
                className="btn-primary w-full flex justify-center items-center gap-2"
            >
                <span>Place Order</span>
                <Check className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 'CONFIRMATION' && (
            <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto text-center pt-10"
            >
                <motion.div 
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="bg-[#FAFAFA] text-[#141414] p-8 rounded shadow-2xl mx-auto relative overflow-hidden"
                >
                    <div className="border-b-2 border-dashed border-neutral-300 pb-6 mb-6">
                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Order Confirmed</div>
                        <h2 className="text-3xl font-serif font-bold tracking-tight">{selectedOutlet?.name}</h2>
                    </div>
                    
                    <div className="text-left space-y-3 mb-8 font-mono text-sm">
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Team</span>
                            <span className="font-bold uppercase">{teamName}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Time</span>
                            <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                            <span className="text-neutral-500">Items</span>
                            <span>{totalItems}</span>
                        </div>
                    </div>

                    <div className="bg-[#141414] text-[#FAFAFA] py-3 rounded-sm text-xs font-mono uppercase tracking-[0.2em]">
                        Present at Counter
                    </div>

                    {/* Ticket serrated edge effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-light dark:bg-brand-dark" style={{clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
                </motion.div>

                <button 
                    onClick={resetFlow}
                    className="btn-ghost mt-12 text-sm"
                >
                    Start a new order
                </button>
            </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};