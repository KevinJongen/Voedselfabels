import React, { useState, useEffect } from 'react';
import { Myth, GroundingSource } from '../types';
import { searchMythTopic } from '../services/geminiService';
import { Search, Loader2, ExternalLink, PlusCircle, CheckCircle2, Link as LinkIcon, Plus } from 'lucide-react';

interface ResearchLabProps {
  myth: Myth;
  onContinue: (summary: string, sources: GroundingSource[]) => void;
}

export const ResearchLab: React.FC<ResearchLabProps> = ({ myth, onContinue }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [selectedSources, setSelectedSources] = useState<GroundingSource[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // State for adding custom source
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  // Auto-search on mount to guide the user immediately
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const result = await searchMythTopic(myth.title);
    setSummary(result.summary);
    setSources(result.sources);
    setLoading(false);
    setHasSearched(true);
  };

  const toggleSource = (source: GroundingSource) => {
    if (selectedSources.find(s => s.url === source.url)) {
      setSelectedSources(selectedSources.filter(s => s.url !== source.url));
    } else {
      if (selectedSources.length < 2) {
        setSelectedSources([...selectedSources, source]);
      } else {
        alert("Je hebt al 2 bronnen gekozen. Verwijder er eerst eentje als je wilt wisselen.");
      }
    }
  };

  const handleAddCustomSource = () => {
    if (!customTitle.trim() || !customUrl.trim()) return;

    let formattedUrl = customUrl.trim();
    if (!formattedUrl.startsWith('http')) {
        formattedUrl = `https://${formattedUrl}`;
    }

    const newSource: GroundingSource = {
        title: customTitle,
        url: formattedUrl,
        snippet: 'Handmatig toegevoegde bron.'
    };

    setSources([...sources, newSource]);
    // Automatically select the new source for convenience, if possible
    if (selectedSources.length < 2) {
        setSelectedSources([...selectedSources, newSource]);
    }
    
    setCustomTitle('');
    setCustomUrl('');
    setIsAddingSource(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Stap 1: Informatie Verzamelen</h2>
        <p className="text-slate-600 mb-6">We zoeken online naar informatie over: <span className="font-semibold text-purple-600">"{myth.title}"</span></p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="animate-spin text-purple-600" size={48} />
            <p className="text-slate-500 animate-pulse">De AI-detective zoekt naar bewijs...</p>
          </div>
        ) : hasSearched ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <Search size={20} className="mr-2" />
                Samenvatting van zoekresultaten
              </h3>
              <p className="text-blue-800 leading-relaxed">{summary}</p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-4">Gevonden Bronnen</h3>
              <p className="text-sm text-slate-500 mb-4">Kies <span className="font-bold">2 bronnen</span> die je wilt controleren op betrouwbaarheid. Werken de links niet? Voeg dan zelf een bron toe.</p>
              
              <div className="grid gap-4">
                {sources.length > 0 ? sources.map((source, idx) => {
                  const isSelected = !!selectedSources.find(s => s.url === source.url);
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border transition-all ${isSelected ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-slate-200 bg-white hover:border-purple-200'}`}
                    >
                      <div className="flex-1 mb-3 md:mb-0 mr-4">
                        <h4 className="font-semibold text-slate-900 line-clamp-1">{source.title}</h4>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center mt-1 w-fit">
                          <LinkIcon size={12} className="mr-1" /> {source.url} <ExternalLink size={12} className="ml-1" />
                        </a>
                      </div>
                      <button
                        onClick={() => toggleSource(source)}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isSelected ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-purple-400 hover:text-purple-600'}`}
                      >
                        {isSelected ? (
                          <><CheckCircle2 size={16} className="mr-2" /> Geselecteerd</>
                        ) : (
                          <><PlusCircle size={16} className="mr-2" /> Selecteren</>
                        )}
                      </button>
                    </div>
                  );
                }) : (
                  <p className="text-slate-500 italic">Geen bronnen gevonden.</p>
                )}
              </div>

              {/* Manual Add Source Section */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                {!isAddingSource ? (
                    <button 
                        onClick={() => setIsAddingSource(true)}
                        className="flex items-center text-purple-600 font-bold hover:text-purple-700 hover:underline transition-colors"
                    >
                        <Plus size={18} className="mr-2" /> Ik wil zelf een andere bron toevoegen
                    </button>
                ) : (
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                        <h4 className="font-bold text-slate-800 mb-4 text-sm flex items-center">
                            <PlusCircle size={16} className="mr-2 text-purple-600"/> Zelf een bron toevoegen
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Titel van de website / artikel</label>
                                <input 
                                    type="text"
                                    placeholder="Bijv: Nu.nl artikel over vetten" 
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={customTitle}
                                    onChange={e => setCustomTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Link (URL)</label>
                                <input 
                                    type="text"
                                    placeholder="www.voorbeeld.nl" 
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={customUrl}
                                    onChange={e => setCustomUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleAddCustomSource} 
                                disabled={!customTitle || !customUrl}
                                className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 disabled:opacity-50"
                            >
                                Toevoegen
                            </button>
                            <button 
                                onClick={() => setIsAddingSource(false)} 
                                className="text-slate-500 px-4 py-2 text-sm hover:text-slate-700"
                            >
                                Annuleren
                            </button>
                        </div>
                    </div>
                )}
              </div>

            </div>

            <div className="flex justify-end pt-6">
              <button
                disabled={selectedSources.length < 2}
                onClick={() => onContinue(summary, selectedSources)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all"
              >
                Door naar de Betrouwbaarheids-Check
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};