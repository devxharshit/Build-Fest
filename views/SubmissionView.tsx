import React, { useState } from 'react';
import { PROMPTS } from '../constants';
import { motion, Variants } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export const SubmissionView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    projectName: '',
    promptId: '',
    demoLink: '',
    reflection: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="glass-panel p-16 max-w-xl"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-20 h-20 text-brand-accent mx-auto mb-8 opacity-90" />
          </motion.div>
          <h2 className="text-4xl font-serif text-neutral-900 dark:text-brand-light mb-6">Received.</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-10">
            Your submission has been logged in the quiet archive. <br/>
            Go get some sleep. You did good.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-ghost text-sm"
          >
            Submit another?
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-16 pb-40 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl text-neutral-900 dark:text-brand-light mb-4 font-serif">Prototype Submission</h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-light">
            No pitch decks. No marketing copy. Just the artifacts.
          </p>
        </motion.header>

        <motion.div variants={itemVariants} className="glass-panel p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Team Name</label>
                <input
                  required
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder="The Night Owls"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Project Name</label>
                <input
                  required
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder="Project Silence"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Chosen Prompt</label>
              <div className="relative">
                <select
                  required
                  name="promptId"
                  value={formData.promptId}
                  onChange={handleChange}
                  className="input-minimal bg-transparent appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-brand-light dark:bg-brand-dark">Select a prompt...</option>
                  {PROMPTS.map(p => (
                    <option key={p.id} value={p.id} className="bg-brand-light dark:bg-brand-dark">{p.title}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Demo Link</label>
              <input
                required
                type="url"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleChange}
                className="input-minimal"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-4">
              <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">
                Reflection 
                <span className="text-neutral-400 dark:text-neutral-600 ml-2 normal-case tracking-normal opacity-60">(What did you choose NOT to build?)</span>
              </label>
              <textarea
                name="reflection"
                value={formData.reflection}
                onChange={handleChange}
                rows={5}
                className="w-full bg-neutral-100/50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-lg p-4 text-neutral-900 dark:text-brand-light focus:outline-none focus:border-brand-accent/50 transition-colors placeholder-neutral-400 dark:placeholder-neutral-700 resize-none leading-relaxed"
                placeholder="We stripped away..."
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto px-12 flex items-center justify-center gap-3"
              >
                <span>Submit to Archive</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};