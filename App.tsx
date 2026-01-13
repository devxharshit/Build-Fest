import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { PromptsView } from './views/PromptsView';
import { DareBoxView } from './views/DareBoxView';
import { SubmissionView } from './views/SubmissionView';
import { RulebookView } from './views/RulebookView';
import { LandingView } from './views/LandingView';
import { FoodOrderingView } from './views/FoodOrderingView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');

  useEffect(() => {
    // Enforce dark mode permanently
    document.documentElement.classList.add('dark');
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'LANDING': return <LandingView onEnter={() => setCurrentView('PROMPTS')} />;
      case 'PROMPTS': return <PromptsView />;
      case 'DARE_BOX': return <DareBoxView />;
      case 'FOOD': return <FoodOrderingView />;
      case 'SUBMIT': return <SubmissionView />;
      case 'RULEBOOK': return <RulebookView />;
      default: return <PromptsView />;
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-accent/30 selection:text-brand-accent transition-colors duration-500 bg-brand-light text-neutral-900 dark:bg-brand-dark dark:text-brand-light ${currentView !== 'LANDING' ? 'pt-20' : ''}`}>

      {/* Global Background (Static for inner pages, Landing handles its own) */}
      {currentView !== 'LANDING' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-neutral-900/5 rounded-full blur-[120px]"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-brand-accent/10 dark:bg-brand-accent/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/3 w-1/3 h-1/3 bg-emerald-500/10 dark:bg-[#10B981]/5 rounded-full blur-[80px]"></div>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">

        {currentView !== 'LANDING' && (
          <Navigation
            currentView={currentView}
            setView={setCurrentView}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-grow">
          {renderView()}
        </main>

      </div>
    </div>
  );
}