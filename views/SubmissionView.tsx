import React, { useState } from 'react';
import { PROMPTS } from '../constants';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

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
    // Simulate submission logic
    console.log('Submission:', formData);
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-16 h-16 text-brand-accent mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-serif text-neutral-900 dark:text-brand-light mb-4 transition-colors">Received.</h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto transition-colors">
            Your submission has been logged in the quiet archive. 
            Go get some sleep. You did good.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-12 text-neutral-500 dark:text-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-400 text-sm transition-colors"
          >
            Submit another?
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 pb-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="mb-12">
          <h2 className="text-4xl text-neutral-900 dark:text-brand-light mb-4 font-serif transition-colors">Prototype Submission</h2>
          <p className="text-neutral-500 dark:text-neutral-400 transition-colors">
            No pitch decks. No marketing copy. Just the artifacts.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Team Name</label>
              <input
                required
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-neutral-300 dark:border-white/10 py-3 text-neutral-900 dark:text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-neutral-400 dark:placeholder-neutral-700"
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
                className="w-full bg-transparent border-b border-neutral-300 dark:border-white/10 py-3 text-neutral-900 dark:text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-neutral-400 dark:placeholder-neutral-700"
                placeholder="Project Silence"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Chosen Prompt</label>
            <select
              required
              name="promptId"
              value={formData.promptId}
              onChange={handleChange}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-md py-4 px-4 text-neutral-800 dark:text-neutral-300 focus:outline-none focus:border-brand-accent transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>Select a prompt...</option>
              {PROMPTS.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">Demo Link</label>
            <input
              required
              type="url"
              name="demoLink"
              value={formData.demoLink}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-neutral-300 dark:border-white/10 py-3 text-neutral-900 dark:text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-neutral-400 dark:placeholder-neutral-700"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-4">
            <label className="block text-neutral-500 text-xs uppercase tracking-widest font-mono">
              Reflection 
              <span className="text-neutral-400 dark:text-neutral-600 ml-2 normal-case tracking-normal">(What did you choose NOT to build?)</span>
            </label>
            <textarea
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              rows={5}
              className="w-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-4 text-neutral-800 dark:text-neutral-300 focus:outline-none focus:border-brand-accent/50 transition-colors placeholder-neutral-400 dark:placeholder-neutral-700 resize-none leading-relaxed"
              placeholder="We stripped away..."
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="group flex items-center justify-center space-x-3 w-full md:w-auto px-10 py-4 bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent border border-brand-accent/30 rounded-full transition-all duration-300"
            >
              <span>Submit to Archive</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};