import React from 'react';
import { Myth } from '../types';
import { Sparkles, Zap, Activity, Info } from 'lucide-react';

interface MythSelectionProps {
  onSelect: (myth: Myth) => void;
}

const MYTHS: Myth[] = [
  { id: '1', title: 'Van light-frisdrank word je dik', category: 'Gewicht' },
  { id: '2', title: 'Een detox-kuur reinigt je lichaam', category: 'Gezondheid' },
  { id: '3', title: 'Na 8 uur \'s avonds eten is ongezond', category: 'Gewoontes' },
  { id: '4', title: 'Van chocolade krijg je puistjes', category: 'Huid' },
  { id: '5', title: 'Vetten zijn altijd slecht voor je', category: 'Voeding' },
  { id: '6', title: 'Biologisch eten is altijd gezonder', category: 'Milieu & Gezondheid' },
];

export const MythSelection: React.FC<MythSelectionProps> = ({ onSelect }) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Kies je Onderzoeksmissie
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Welke veelgehoorde uitspraak ga jij onder de loep nemen? Kies een kaart om je onderzoek te starten.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MYTHS.map((myth) => (
          <button
            key={myth.id}
            onClick={() => onSelect(myth)}
            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border-2 border-transparent hover:border-purple-200 transition-all duration-300 text-left flex flex-col h-full"
          >
            <div className="absolute top-4 right-4 text-purple-100 group-hover:text-purple-500 transition-colors">
              <Sparkles size={24} />
            </div>
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {myth.category}
            </span>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">
              "{myth.title}"
            </h3>
            <div className="mt-auto pt-4 flex items-center text-sm text-slate-400 font-medium group-hover:text-purple-600">
              Start onderzoek <Zap size={16} className="ml-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};