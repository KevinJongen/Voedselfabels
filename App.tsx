import React, { useState } from 'react';
import { MythSelection } from './components/MythSelection';
import { ResearchLab } from './components/ResearchLab';
import { SourceChecker } from './components/SourceChecker';
import { PosterStudio } from './components/PosterStudio';
import { AppStep, Myth, ResearchState, GroundingSource, EvaluatedSource } from './types';
import { Microscope } from 'lucide-react';

const INITIAL_STATE: ResearchState = {
  selectedMyth: null,
  searchSummary: '',
  searchResults: [],
  evaluatedSources: [],
  finalConclusion: '',
  verdict: null,
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.SELECTION);
  const [researchState, setResearchState] = useState<ResearchState>(INITIAL_STATE);

  const handleSelectMyth = (myth: Myth) => {
    setResearchState({ ...INITIAL_STATE, selectedMyth: myth });
    setCurrentStep(AppStep.RESEARCH);
  };

  const handleResearchComplete = (summary: string, sources: GroundingSource[]) => {
    setResearchState(prev => ({
      ...prev,
      searchSummary: summary,
      searchResults: sources
    }));
    setCurrentStep(AppStep.EVALUATION);
  };

  const handleEvaluationComplete = (evaluated: EvaluatedSource[], conclusion: string, verdict: 'FACT' | 'FICTION' | 'NUANCED') => {
    setResearchState(prev => ({
      ...prev,
      evaluatedSources: evaluated,
      finalConclusion: conclusion,
      verdict: verdict
    }));
    setCurrentStep(AppStep.POSTER);
  };

  const handleReset = () => {
    setResearchState(INITIAL_STATE);
    setCurrentStep(AppStep.SELECTION);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleReset}>
            <div className="bg-purple-600 p-2 rounded-lg text-white">
                <Microscope size={24} />
            </div>
            <h1 className="text-xl font-display font-bold text-slate-900 tracking-tight">
              Ontmasker <span className="text-purple-600">De Voedselfabel</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500">
            <span className={`${currentStep === AppStep.SELECTION ? 'text-purple-600' : ''}`}>1. Kies Fabel</span>
            <span className={`${currentStep === AppStep.RESEARCH ? 'text-purple-600' : ''}`}>2. Onderzoek</span>
            <span className={`${currentStep === AppStep.EVALUATION ? 'text-purple-600' : ''}`}>3. Check Betrouwbaarheid</span>
            <span className={`${currentStep === AppStep.POSTER ? 'text-purple-600' : ''}`}>4. Poster</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto py-8">
        {currentStep === AppStep.SELECTION && (
          <MythSelection onSelect={handleSelectMyth} />
        )}
        
        {currentStep === AppStep.RESEARCH && researchState.selectedMyth && (
          <ResearchLab 
            myth={researchState.selectedMyth} 
            onContinue={handleResearchComplete} 
          />
        )}

        {currentStep === AppStep.EVALUATION && researchState.selectedMyth && (
          <SourceChecker 
            selectedSources={researchState.searchResults}
            mythTitle={researchState.selectedMyth.title}
            onComplete={handleEvaluationComplete}
          />
        )}

        {currentStep === AppStep.POSTER && (
          <PosterStudio 
            state={researchState} 
            onReset={handleReset} 
          />
        )}
      </main>

       {/* Footer */}
       <footer className="bg-white border-t border-slate-100 py-6 text-center text-slate-400 text-sm">
         <p>© {new Date().getFullYear()} Voedselfabel Project - Onderwijs Tool</p>
       </footer>
    </div>
  );
};

export default App;