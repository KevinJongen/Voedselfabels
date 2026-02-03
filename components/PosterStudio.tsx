import React, { useState, useRef, useCallback } from 'react';
import { ResearchState } from '../types';
import { Download, RefreshCw, Pencil, ClipboardList, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';

interface PosterStudioProps {
  state: ResearchState;
  onReset: () => void;
}

export const PosterStudio: React.FC<PosterStudioProps> = ({ state, onReset }) => {
  // Manual state for the poster
  const [headline, setHeadline] = useState(state.selectedMyth?.title || '');
  const [fact1, setFact1] = useState('');
  const [fact2, setFact2] = useState('');
  const [fact3, setFact3] = useState('');
  const [tip, setTip] = useState('');
  const [name, setName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Ref for the element we want to capture
  const posterRef = useRef<HTMLDivElement>(null);

  const verdictColor = state.verdict === 'FACT' ? 'bg-green-500' : state.verdict === 'FICTION' ? 'bg-red-500' : 'bg-yellow-500';
  const verdictText = state.verdict === 'FACT' ? 'FEIT' : state.verdict === 'FICTION' ? 'FABEL' : 'HET HANGT ERVAN AF';

  const handleDownload = useCallback(async () => {
    if (posterRef.current === null) {
      return;
    }

    setIsDownloading(true);

    try {
      // Small delay to ensure any rendering is finished
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(posterRef.current, { 
        cacheBust: true, 
        pixelRatio: 2, // High quality for retina/printing
        backgroundColor: '#ffffff' // Ensure white background in case of transparency
      });
      
      const link = document.createElement('a');
      link.download = `voedselfabel-slide-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Oeps, het downloaden is mislukt', err);
      alert('Het lukte niet om de afbeelding te maken. Probeer het nog eens of maak een screenshot.');
    } finally {
      setIsDownloading(false);
    }
  }, [posterRef]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-slate-900">Maak je eigen Slide</h2>
        <p className="text-slate-600">Gebruik je notities (links) om de slide (rechts) te vullen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Research & Editor */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Research Notes Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
             <h3 className="flex items-center text-lg font-bold text-blue-900 mb-4">
                <ClipboardList className="mr-2" size={20} /> Jouw Onderzoek & Conclusie
             </h3>
             <div className="space-y-4 text-blue-800">
                <div className="bg-white/60 p-3 rounded-lg">
                    <span className="text-xs font-bold uppercase text-blue-400 block mb-1">Jouw Oordeel:</span>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold text-white ${verdictColor}`}>{verdictText}</span>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                    <span className="text-xs font-bold uppercase text-blue-400 block mb-1">Jouw Notities:</span>
                    <p className="whitespace-pre-wrap">{state.finalConclusion || "Geen conclusie ingevuld."}</p>
                </div>
             </div>
          </div>

          {/* Editor Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
             <h3 className="flex items-center text-lg font-bold text-slate-800 mb-4">
                <Pencil className="mr-2" size={20} /> Vul de poster in
             </h3>
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-1">Pakkende Koptekst</label>
                   <input 
                      type="text" 
                      value={headline} 
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="Bijv: De waarheid over..."
                   />
                </div>
                
                <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-1">3 Belangrijke Feiten (korte zinnen)</label>
                   <div className="space-y-2">
                       <input type="text" value={fact1} onChange={(e) => setFact1(e.target.value)} placeholder="Feit 1..." className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"/>
                       <input type="text" value={fact2} onChange={(e) => setFact2(e.target.value)} placeholder="Feit 2..." className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"/>
                       <input type="text" value={fact3} onChange={(e) => setFact3(e.target.value)} placeholder="Feit 3..." className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"/>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-1">Jouw Gouden Tip</label>
                   <textarea 
                      value={tip} 
                      onChange={(e) => setTip(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="Bijv: Blijf kritisch of eet gevarieerd..."
                      rows={2}
                   />
                </div>

                <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-1">Jouw Naam</label>
                   <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="Typ je naam..."
                   />
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Preview */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-8 h-fit">
           <div className="mb-2 text-sm font-bold text-slate-400 uppercase tracking-widest">Live Voorbeeld</div>
           
           {/* THE POSTER ITSELF - Wrapped with REF */}
           <div 
             ref={posterRef}
             className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-sm border-[6px] border-slate-900 relative overflow-hidden aspect-[9/16] flex flex-col"
           >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                {/* Poster Content */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-white font-black tracking-widest text-xs shadow-md mb-3 ${verdictColor}`}>
                            {verdictText}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight font-display break-words">
                            {headline || "Titel van je slide..."}
                        </h1>
                    </div>

                    <div className="flex-1 space-y-3">
                        {(fact1 || fact2 || fact3) ? (
                            <>
                                {fact1 && (
                                <div className="flex items-start bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-100 shadow-sm">
                                    <span className="text-xl mr-2">👉</span>
                                    <p className="font-medium text-slate-800 text-sm">{fact1}</p>
                                </div>
                                )}
                                {fact2 && (
                                <div className="flex items-start bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-100 shadow-sm">
                                    <span className="text-xl mr-2">👉</span>
                                    <p className="font-medium text-slate-800 text-sm">{fact2}</p>
                                </div>
                                )}
                                {fact3 && (
                                <div className="flex items-start bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-100 shadow-sm">
                                    <span className="text-xl mr-2">👉</span>
                                    <p className="font-medium text-slate-800 text-sm">{fact3}</p>
                                </div>
                                )}
                            </>
                        ) : (
                            <div className="opacity-40 italic text-sm text-slate-500 p-4 border-2 border-dashed border-slate-300 rounded-xl">
                                Typ hiernaast je feiten om ze hier te zien verschijnen.
                            </div>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t-2 border-slate-100 border-dashed">
                        <p className="font-bold text-purple-700 text-sm bg-purple-50 p-2 rounded-lg text-center break-words">
                            💡 {tip || "Jouw tip komt hier..."}
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Onderzocht door:</p>
                        <p className="text-xs font-bold text-slate-600">{name || "Jouw Naam"}</p>
                        <p className="text-[9px] text-slate-300 mt-1">Voedselfabel App</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex gap-4 w-full max-w-sm justify-center">
                <button 
                  onClick={onReset} 
                  disabled={isDownloading}
                  className="flex-1 flex justify-center items-center px-4 py-3 bg-white border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm disabled:opacity-50"
                >
                    <RefreshCw size={16} className="mr-2" /> Opnieuw
                </button>
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 flex justify-center items-center px-4 py-3 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:bg-slate-800 hover:scale-105 transition-all text-sm disabled:opacity-70 disabled:hover:scale-100"
                >
                    {isDownloading ? (
                      <Loader2 size={16} className="mr-2 animate-spin" /> 
                    ) : (
                      <Download size={16} className="mr-2" />
                    )}
                    {isDownloading ? 'Bezig...' : 'Opslaan'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};