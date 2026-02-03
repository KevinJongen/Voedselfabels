import React, { useState } from 'react';
import { GroundingSource, EvaluatedSource } from '../types';
import { ShieldCheck, ShieldAlert, BookOpen, User, DollarSign, FileText, Info } from 'lucide-react';

interface SourceCheckerProps {
  selectedSources: GroundingSource[];
  onComplete: (evaluated: EvaluatedSource[], conclusion: string, verdict: 'FACT' | 'FICTION' | 'NUANCED') => void;
  mythTitle: string;
}

export const SourceChecker: React.FC<SourceCheckerProps> = ({ selectedSources, onComplete, mythTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<EvaluatedSource[]>(
    selectedSources.map(s => ({ ...s, authorCheck: false, commercialCheck: false, evidenceCheck: false, isReliable: false, notes: '' }))
  );
  const [finalConclusion, setFinalConclusion] = useState('');
  const [verdict, setVerdict] = useState<'FACT' | 'FICTION' | 'NUANCED'>('NUANCED');

  const currentSource = evaluations[activeIndex];

  // Handle generic updates (notes, manual override of reliability)
  const updateEvaluation = (field: keyof EvaluatedSource, value: any) => {
    const newEvaluations = [...evaluations];
    newEvaluations[activeIndex] = { ...newEvaluations[activeIndex], [field]: value };
    setEvaluations(newEvaluations);
  };

  // Handle checklist updates with auto-reliability logic
  const toggleCriteria = (criteria: 'authorCheck' | 'commercialCheck' | 'evidenceCheck') => {
    const newEvaluations = [...evaluations];
    const source = newEvaluations[activeIndex];
    
    // Toggle the specific criteria
    source[criteria] = !source[criteria];

    // Calculate score based on the new state
    let score = 0;
    if (source.authorCheck) score++;
    if (source.commercialCheck) score++;
    if (source.evidenceCheck) score++;

    // Auto-set reliability: 2 or more checks = Reliable
    source.isReliable = score >= 2;

    setEvaluations(newEvaluations);
  };

  const handleNext = () => {
    if (activeIndex < evaluations.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const allDone = activeIndex === evaluations.length - 1;

  const handleSubmit = () => {
    onComplete(evaluations, finalConclusion, verdict);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Progress */}
      <div className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-4">
        <span>Bron {activeIndex + 1} van {evaluations.length}</span>
        <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / evaluations.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-800 mb-2">{currentSource.title}</h3>
             <a href={currentSource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mb-4 block break-all">
               {currentSource.url}
             </a>
             <div className="bg-amber-50 p-4 rounded-lg text-amber-900 text-sm border border-amber-100 mb-4">
               <strong className="block mb-1">Tip:</strong> Klik op de link om de website te bekijken en vul daarna de checklist hiernaast in.
             </div>
             
             <div className="space-y-4">
                <h4 className="font-semibold text-slate-700">Jouw notities:</h4>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  rows={4}
                  placeholder="Wat valt je op aan deze bron? Wat zeggen ze over de fabel?"
                  value={currentSource.notes}
                  onChange={(e) => updateEvaluation('notes', e.target.value)}
                />
             </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-purple-500">
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
            <ShieldCheck className="mr-2 text-purple-600" /> Betrouwbaarheids-Check
          </h3>
          <p className="text-sm text-slate-500 mb-6 flex items-start">
            <Info size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            Vink aan wat klopt. Bij 2 of meer vinkjes springt de bron automatisch op 'Betrouwbaar'.
          </p>
          
          <div className="space-y-6">
            {/* Criteria 1: Author */}
            <label className={`flex items-start space-x-3 cursor-pointer group p-3 rounded-lg border transition-colors ${currentSource.authorCheck ? 'bg-green-50 border-green-200' : 'border-transparent hover:bg-slate-50'}`}>
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer"
                  checked={currentSource.authorCheck}
                  onChange={() => toggleCriteria('authorCheck')}
                />
              </div>
              <div>
                <span className="font-bold text-slate-800 flex items-center"><User size={18} className="mr-2 text-purple-500"/> Betrouwbare afzender</span>
                <span className="text-sm text-slate-600 block mt-1">Vink aan als de schrijver een expert (arts, diëtist) of bekende organisatie is.</span>
              </div>
            </label>

            {/* Criteria 2: Commercial */}
            <label className={`flex items-start space-x-3 cursor-pointer group p-3 rounded-lg border transition-colors ${currentSource.commercialCheck ? 'bg-green-50 border-green-200' : 'border-transparent hover:bg-slate-50'}`}>
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer"
                  checked={currentSource.commercialCheck}
                  onChange={() => toggleCriteria('commercialCheck')}
                />
              </div>
              <div>
                <span className="font-bold text-slate-800 flex items-center"><DollarSign size={18} className="mr-2 text-purple-500"/> Geen reclame</span>
                <span className="text-sm text-slate-600 block mt-1">Vink aan als ze je <u>niets</u> proberen te verkopen (zoals pillen of een boek).</span>
              </div>
            </label>

            {/* Criteria 3: Evidence */}
            <label className={`flex items-start space-x-3 cursor-pointer group p-3 rounded-lg border transition-colors ${currentSource.evidenceCheck ? 'bg-green-50 border-green-200' : 'border-transparent hover:bg-slate-50'}`}>
               <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer"
                  checked={currentSource.evidenceCheck}
                  onChange={() => toggleCriteria('evidenceCheck')}
                />
              </div>
              <div>
                <span className="font-bold text-slate-800 flex items-center"><FileText size={18} className="mr-2 text-purple-500"/> Met bewijs</span>
                <span className="text-sm text-slate-600 block mt-1">Vink aan als er feiten of onderzoeken worden genoemd.</span>
              </div>
            </label>

            <div className="pt-6 border-t border-slate-100">
               <span className="font-semibold text-slate-800 block mb-3 text-center">Automatisch Oordeel:</span>
               <div className="flex space-x-4">
                 <button 
                   onClick={() => updateEvaluation('isReliable', true)}
                   className={`flex-1 py-4 px-4 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${currentSource.isReliable ? 'border-green-500 bg-green-100 text-green-800 shadow-md scale-105' : 'border-slate-200 text-slate-400 opacity-50'}`}
                 >
                   <ShieldCheck size={28} className="mb-2" />
                   <span className="font-bold text-base">Betrouwbaar</span>
                 </button>
                 <button 
                    onClick={() => updateEvaluation('isReliable', false)}
                    className={`flex-1 py-4 px-4 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${!currentSource.isReliable ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-md scale-105' : 'border-slate-200 text-slate-400 opacity-50'}`}
                 >
                   <ShieldAlert size={28} className="mb-2" />
                   <span className="font-bold text-base">Twijfelachtig</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation / Final Conclusion Area */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200">
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="px-6 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-0"
        >
          Vorige
        </button>

        {!allDone ? (
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-md"
          >
            Volgende Bron
          </button>
        ) : (
          /* Conclusion Form when all sources are checked */
          <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mb-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
                <BookOpen className="mr-2" /> Jouw Conclusie
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-purple-800 mb-2">De stelling "{mythTitle}" is:</label>
                <div className="flex gap-4">
                  {['FACT', 'FICTION', 'NUANCED'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVerdict(v as any)}
                      className={`flex-1 py-2 rounded-lg font-bold border-2 transition-colors ${verdict === v 
                        ? 'bg-purple-600 border-purple-600 text-white' 
                        : 'bg-white border-purple-200 text-purple-600 hover:bg-purple-50'}`}
                    >
                      {v === 'FACT' ? 'WAAR' : v === 'FICTION' ? 'NIET WAAR' : 'INGEWIKKELD'}
                    </button>
                  ))}
                </div>
              </div>
              <label className="block text-sm font-semibold text-purple-800 mb-2">Waarom? (Gebruik je notities)</label>
              <textarea
                value={finalConclusion}
                onChange={(e) => setFinalConclusion(e.target.value)}
                className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
                placeholder="Schrijf hier je conclusie..."
              />
            </div>
            <div className="flex justify-end">
               <button 
                onClick={handleSubmit}
                disabled={!finalConclusion.trim()}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                Maak mijn Poster!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};