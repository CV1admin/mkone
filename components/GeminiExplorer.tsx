
import React, { useState, useRef, useMemo } from 'react';
import { generateMKoneHypothesis } from '../services/geminiService';
import { MKoneHypothesis } from '../types';
import { 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  Info, 
  GitBranch, 
  ArrowRight, 
  History, 
  Columns, 
  X, 
  Plus,
  CheckCircle2
} from 'lucide-react';

const GeminiExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<MKoneHypothesis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [resultsCache, setResultsCache] = useState<Record<string, MKoneHypothesis>>({});
  const [comparisonQueries, setComparisonQueries] = useState<string[]>([]);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  
  const resultsEndRef = useRef<HTMLDivElement>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Check cache first
    if (resultsCache[searchQuery]) {
        setActiveResult(resultsCache[searchQuery]);
        if (!history.includes(searchQuery)) {
            setHistory(prev => [...prev, searchQuery]);
        }
        setIsComparisonMode(false);
        return;
    }

    setLoading(true);
    setError(null);
    try {
      const hypothesis = await generateMKoneHypothesis(searchQuery);
      if (hypothesis) {
        setActiveResult(hypothesis);
        setResultsCache(prev => ({ ...prev, [searchQuery]: hypothesis }));
        setHistory(prev => {
            if (prev.includes(searchQuery)) return prev;
            return [...prev, searchQuery];
        });
        setIsComparisonMode(false);
        // Smooth scroll to top of new result
        setTimeout(() => {
            resultsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setError("The framework could not reconcile this domain at this time.");
      }
    } catch (err) {
      setError("An operational error occurred in the modeling sequence.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const toggleComparison = (q: string) => {
    setComparisonQueries(prev => 
      prev.includes(q) ? prev.filter(item => item !== q) : [...prev, q]
    );
  };

  const comparisonData = useMemo(() => {
    return comparisonQueries.map(q => resultsCache[q]).filter(Boolean);
  }, [comparisonQueries, resultsCache]);

  const HypothesisCard = ({ result, isCompact = false }: { result: MKoneHypothesis, isCompact?: boolean }) => (
    <div className={`space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${isCompact ? 'border-r border-slate-800 last:border-r-0 px-4' : ''}`}>
      <div className={`grid ${isCompact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        <div className="p-5 bg-slate-950/80 rounded-xl border border-blue-500/20">
          <h3 className="text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-2">Coherence Pattern</h3>
          <p className="text-slate-200 text-sm leading-relaxed">{result.coherencePattern}</p>
        </div>
        <div className="p-5 bg-slate-950/80 rounded-xl border border-purple-500/20">
          <h3 className="text-purple-400 font-mono text-[10px] uppercase tracking-widest mb-2">Structural Mechanism</h3>
          <p className="text-slate-200 text-sm leading-relaxed">{result.structuralPattern}</p>
        </div>
      </div>

      <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-700">
        <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mb-2">Uncertainty Index</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-rose-500 transition-all duration-1000" 
              style={{ width: `${result.uncertaintyRating * 10}%` }}
            />
          </div>
          <span className="font-mono text-slate-300 text-xs">{result.uncertaintyRating}/10</span>
        </div>
      </div>

      {!isCompact && (
        <>
            {/* Recursive Chaining Options */}
            <div className="p-6 bg-blue-500/5 rounded-xl border border-blue-500/20">
                <h3 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <GitBranch className="w-3 h-3" /> Recursive Pathways
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                    onClick={() => { setQuery(`Recursive deep-dive: ${result.structuralPattern}`); performSearch(`Recursive deep-dive: ${result.structuralPattern}`); }}
                    className="text-left p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all group"
                >
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 group-hover:text-blue-400 transition-colors">Branch via Mechanism</div>
                    <div className="text-xs text-slate-300 line-clamp-2 italic">"{result.structuralPattern}"</div>
                </button>
                <button 
                    onClick={() => { setQuery(`Expand coherence: ${result.coherencePattern}`); performSearch(`Expand coherence: ${result.coherencePattern}`); }}
                    className="text-left p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all group"
                >
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 group-hover:text-purple-400 transition-colors">Expand via Coherence</div>
                    <div className="text-xs text-slate-300 line-clamp-2 italic">"{result.coherencePattern}"</div>
                </button>
                </div>
            </div>

            <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-700">
                <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">Alternate Explanations</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.alternatePerspectives.map((alt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5" />
                    {alt}
                    </li>
                ))}
                </ul>
            </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`max-auto p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 transition-all duration-500 ${isComparisonMode ? 'max-w-7xl' : 'max-w-4xl'}`}>
      <div className="mb-8 text-center relative">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Sparkles className="text-blue-400" />
          MKone Explorer
        </h2>
        <p className="text-slate-400">Synthesize interdisciplinary insights and bridge conceptual gaps.</p>
        
        {comparisonQueries.length > 0 && (
            <button 
                onClick={() => setIsComparisonMode(!isComparisonMode)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg border flex items-center gap-2 transition-all ${isComparisonMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
            >
                <Columns className="w-4 h-4" />
                <span className="hidden sm:inline">{isComparisonMode ? 'Exit Compare' : `Compare (${comparisonQueries.length})`}</span>
            </button>
        )}
      </div>

      {/* History Breadcrumbs */}
      {history.length > 0 && !isComparisonMode && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <History className="w-4 h-4 text-slate-500 shrink-0" />
          {history.map((h, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1">
                <span 
                    className={`text-xs px-2 py-1 rounded-l bg-slate-800 border-y border-l border-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-700 transition-colors ${h === (activeResult?.domain || '') ? 'text-blue-400 border-blue-900' : 'text-slate-400'}`}
                    onClick={() => performSearch(h)}
                >
                    {h}
                </span>
                <button 
                    onClick={() => toggleComparison(h)}
                    title="Toggle for comparison"
                    className={`text-[10px] px-1.5 py-1 rounded-r border-y border-r border-slate-700 transition-colors ${comparisonQueries.includes(h) ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
                >
                    {comparisonQueries.includes(h) ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </button>
              </div>
              {i < history.length - 1 && <ArrowRight className="w-3 h-3 text-slate-600 shrink-0 mx-1" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {!isComparisonMode && (
        <form onSubmit={handleSearch} className="mb-8 flex gap-3">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a domain (e.g. 'Thermodynamics of Social Decay')"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-200"
            />
            <button
            type="submit"
            disabled={loading || !query}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap min-w-[120px] justify-center"
            >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Synthesize'}
            </button>
        </form>
      )}

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 p-4 rounded-lg flex items-start gap-3 text-rose-300 mb-6">
          <AlertCircle className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div ref={resultsEndRef} />

      {isComparisonMode ? (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                    <Columns className="w-5 h-5" /> Side-by-Side Analysis
                </h3>
                <button onClick={() => setComparisonQueries([])} className="text-xs text-slate-500 hover:text-slate-300">Clear All</button>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(comparisonData.length, 3)} gap-0 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/20`}>
                {comparisonData.map((res, idx) => (
                    <div key={idx} className="flex flex-col border-r border-slate-800 last:border-r-0">
                        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-300 truncate pr-4">{res.domain}</span>
                            <button 
                                onClick={() => toggleComparison(res.domain)}
                                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-4 flex-1">
                            <HypothesisCard result={res} isCompact={true} />
                        </div>
                    </div>
                ))}
            </div>
            {comparisonData.length === 0 && (
                <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
                    No results selected for comparison. Tag results from history to see them here.
                </div>
            )}
        </div>
      ) : (
        activeResult && <HypothesisCard result={activeResult} />
      )}

      {!isComparisonMode && activeResult && (
        <div className="mt-8 flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <p>
            <strong>Reminder:</strong> This output is a computational hypothesis. MKone does not claim ontological truth. 
            Always validate with empirical evidence and plural frameworks.
            </p>
        </div>
      )}
    </div>
  );
};

export default GeminiExplorer;
