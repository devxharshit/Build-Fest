import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { PromptsView } from './views/PromptsView';
import { DareBoxView } from './views/DareBoxView';
import { SubmissionView } from './views/SubmissionView';
import { RulebookView } from './views/RulebookView';
import { LandingView } from './views/LandingView';
import { FoodOrderingView } from './views/FoodOrderingView';
import { StarField } from './components/StarField';

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

      <StarField />

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