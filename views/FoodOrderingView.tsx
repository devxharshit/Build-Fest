import React, { useState } from 'react';
import { FOOD_OUTLETS } from '../constants';
import { FoodOutlet, OrderItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag, ArrowLeft, Check, Ticket, Minus, Plus } from 'lucide-react';

type Step = 'SELECT_OUTLET' | 'ORDERING' | 'REVIEW' | 'CONFIRMATION';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
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
    // Simulate API call
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
    <div className="max-w-4xl mx-auto pt-20 pb-40 px-6">
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
              <h2 className="text-4xl md:text-5xl text-neutral-900 dark:text-brand-light mb-4 font-serif transition-colors">Late Night Fuel</h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-light transition-colors">
                Ordering Window: <span className="text-brand-accent font-mono">01:00 – 01:30</span>
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              {FOOD_OUTLETS.map(outlet => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={outlet.id}
                  onClick={() => handleSelectOutlet(outlet)}
                  className="group relative p-8 h-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-brand-accent/50 rounded-xl text-left transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-sm dark:shadow-none"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Utensils className="w-24 h-24 text-neutral-900 dark:text-brand-light" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-neutral-900 dark:text-brand-light mb-2 group-hover:text-brand-accent transition-colors">{outlet.name}</h3>
                    <p className="text-neutral-600 dark:text-neutral-500 text-sm leading-relaxed max-w-[80%]">{outlet.description}</p>
                  </div>
                  <div className="flex items-center text-neutral-500 dark:text-neutral-600 text-xs font-mono uppercase tracking-widest group-hover:text-brand-accent transition-colors">
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
            className="max-w-2xl mx-auto"
          >
            <button 
              onClick={() => setStep('SELECT_OUTLET')}
              className="group flex items-center text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300 text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Outlets
            </button>

            <h2 className="text-3xl font-serif text-neutral-900 dark:text-brand-light mb-2 transition-colors">{selectedOutlet.name}</h2>
            <p className="text-neutral-500 mb-10 transition-colors">{selectedOutlet.description}</p>

            <motion.div 
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 mb-12"
            >
              {selectedOutlet.items.map(item => (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-baseline gap-3">
                        <h4 className="text-lg text-neutral-900 dark:text-brand-light">{item.name}</h4>
                        <span className="text-neutral-500 dark:text-neutral-600 text-sm font-mono">{item.price}</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-500 text-sm">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-neutral-100 dark:bg-[#141414] rounded-full px-3 py-1 border border-neutral-200 dark:border-white/10 transition-colors">
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={() => removeFromCart(item.id)}
                      className={`p-1 rounded-full transition-colors ${getQuantity(item.id) > 0 ? 'text-neutral-900 dark:text-brand-light hover:text-brand-accent' : 'text-neutral-400 dark:text-neutral-700'}`}
                      disabled={getQuantity(item.id) === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-4 text-center text-neutral-900 dark:text-brand-light font-mono text-sm">{getQuantity(item.id)}</span>
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={() => addToCart(item.id)}
                      className="p-1 text-neutral-900 dark:text-brand-light hover:text-brand-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="fixed bottom-24 left-0 w-full px-6 flex justify-center pointer-events-none">
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep('REVIEW')}
                      className="pointer-events-auto shadow-2xl px-8 py-4 rounded-full font-medium flex items-center gap-3 bg-brand-accent text-[#141414] hover:bg-brand-accent/90 transition-colors"
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
            className="max-w-lg mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-8 rounded-2xl shadow-2xl transition-colors"
          >
             <button 
              onClick={() => setStep('ORDERING')}
              className="group flex items-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> Modify
            </button>

            <h3 className="text-2xl font-serif text-neutral-900 dark:text-brand-light mb-6 transition-colors">Confirm Order</h3>

            <div className="space-y-4 mb-8 border-b border-neutral-200 dark:border-white/10 pb-8 transition-colors">
                {cart.map(i => (
                    <div key={i.item.id} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-800 dark:text-neutral-300"><span className="text-brand-accent font-mono mr-2">{i.quantity}x</span> {i.item.name}</span>
                        <span className="text-neutral-500 font-mono">{i.item.price}</span>
                    </div>
                ))}
            </div>

            <div className="mb-8">
                <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono mb-2">Team Name</label>
                <input
                    autoFocus
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="The Night Owls"
                    className="w-full bg-neutral-50 dark:bg-[#141414] border-b border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-brand-light text-lg focus:outline-none focus:border-brand-accent transition-colors placeholder-neutral-400 dark:placeholder-neutral-700"
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submitOrder}
                disabled={!teamName.trim()}
                className={`w-full py-4 rounded-lg font-medium transition-all flex justify-center items-center gap-2 ${
                    teamName.trim()
                    ? 'bg-brand-accent hover:bg-brand-accent/90 text-[#141414]'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
            >
                <span>Place Order</span>
                <Check className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 'CONFIRMATION' && (
            <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto text-center"
            >
                <motion.div 
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="bg-[#FAFAFA] text-[#141414] p-8 rounded-sm shadow-xl mx-auto relative overflow-hidden"
                >
                    <div className="border-b-2 border-dashed border-neutral-300 pb-6 mb-6">
                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Order Confirmed</div>
                        <h2 className="text-3xl font-serif font-bold text-[#141414]">{selectedOutlet?.name}</h2>
                    </div>
                    
                    <div className="text-left space-y-2 mb-8 font-mono text-sm">
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Team</span>
                            <span className="font-bold">{teamName}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Time</span>
                            <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Items</span>
                            <span>{totalItems}</span>
                        </div>
                    </div>

                    <div className="bg-[#141414] text-[#FAFAFA] py-2 rounded text-xs font-mono uppercase tracking-widest">
                        Show this at counter
                    </div>

                    {/* Ticket serrated edge effect */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-brand-light dark:bg-brand-dark transition-colors duration-500" style={{clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
                </motion.div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFlow}
                    className="mt-12 text-neutral-500 dark:text-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-400 text-sm transition-colors"
                >
                    Order for another team?
                </motion.button>
            </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};