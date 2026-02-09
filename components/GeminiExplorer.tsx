
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { generateMKoneHypothesis } from '../services/geminiService';
import { MKoneHypothesis } from '../types';
import { GoogleGenAI } from "@google/genai";
import * as d3 from 'd3';
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
  CheckCircle2,
  Activity,
  Cloud,
  Terminal,
  Layers,
  Zap,
  Command,
  Scale,
  MessageSquareQuote,
  LayoutGrid,
  BookOpen,
  Filter,
  MousePointer2
} from 'lucide-react';

const CONCEPTUAL_ANCHORS = [
  { label: 'Entropy', category: 'Physics', desc: 'Measure of disorder or information capacity.' },
  { label: 'Isomorphism', category: 'Math', desc: 'Structure-preserving mapping between domains.' },
  { label: 'Autopoiesis', category: 'Biology', desc: 'System capable of self-reproduction.' },
  { label: 'Homeostasis', category: 'Systems', desc: 'Maintenance of internal stability.' },
  { label: 'Recursion', category: 'Logic', desc: 'Process defined in terms of itself.' },
  { label: 'Phase Space', category: 'Dynamics', desc: 'Space representing all possible states.' },
  { label: 'Emergence', category: 'Complexity', desc: 'Complex patterns from simple rules.' },
  { label: 'Symbiosis', category: 'Ecology', desc: 'Mutually beneficial interaction.' },
  { label: 'Tension', category: 'Structural', desc: 'Balance of opposing forces.' }
];

const TEMPLATES = [
  { name: 'Isomorphic Bridge', template: 'Analyze the isomorphism between [Domain A] and [Domain B] through the lens of [Anchor].' },
  { name: 'Mechanism Deep-Dive', template: 'Explore the underlying structural mechanism of [Domain] using [Anchor] as a primary metric.' },
  { name: 'Recursive Decay', template: 'Map the entropic decay and recursive feedback loops of [Domain].' },
  { name: 'Systemic Stability', template: 'Assess the autopoietic limits and homeostasis of [Domain] in a high-entropy environment.' }
];

// Interactive D3 Component for Perspectives
const InteractivePerspectiveGraph: React.FC<{ 
  perspectives: MKoneHypothesis['alternatePerspectives'],
  onPerspectiveClick: (text: string) => void
}> = ({ perspectives, onPerspectiveClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || perspectives.length === 0) return;

    const width = containerRef.current.clientWidth;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const nodes = perspectives.map((p, i) => ({
      id: i,
      text: p.text,
      weight: p.weight,
      radius: 20 + (p.weight * 4), // Size based on weight
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
    }));

    const simulation = d3.forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 15))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const g = svg.append('g');

    // Drag behavior
    const drag = d3.drag<any, any>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    const nodeElements = g.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(drag as any);

    // Circle background
    nodeElements.append('circle')
      .attr('r', (d: any) => d.radius)
      .attr('fill', (d: any) => d3.interpolateBlues(d.weight / 15 + 0.3))
      .attr('fill-opacity', 0.15)
      .attr('stroke', (d: any) => d3.interpolateBlues(d.weight / 10 + 0.4))
      .attr('stroke-width', 2)
      .style('cursor', 'grab')
      .on('mousedown', function() { d3.select(this).style('cursor', 'grabbing'); })
      .on('mouseup', function() { d3.select(this).style('cursor', 'grab'); })
      .on('click', (event, d) => {
        event.stopPropagation();
        onPerspectiveClick(d.text);
      });

    // Text label
    nodeElements.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', (d: any) => `${Math.max(10, 8 + d.weight)}px`)
      .style('font-weight', '600')
      .style('fill', '#f8fafc')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 2px 4px rgba(0,0,0,0.5)')
      .each(function(d) {
        const text = d.text;
        const words = text.split(/\s+/);
        const el = d3.select(this);
        if (words.length > 2) {
          el.text('');
          el.append('tspan').attr('x', 0).attr('dy', '-0.6em').text(words.slice(0, Math.ceil(words.length/2)).join(' '));
          el.append('tspan').attr('x', 0).attr('dy', '1.2em').text(words.slice(Math.ceil(words.length/2)).join(' '));
        } else {
          el.text(text);
        }
      });

    // Subtitle for weight
    nodeElements.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => `${d.radius / 2 + 10}px`)
      .style('font-size', '8px')
      .style('fill', '#94a3b8')
      .style('font-family', 'JetBrains Mono')
      .style('text-transform', 'uppercase')
      .style('pointer-events', 'none')
      .text((d: any) => `Relevance: ${d.weight}`);

    simulation.on('tick', () => {
      nodeElements.attr('transform', (d: any) => {
        const x = Math.max(d.radius, Math.min(width - d.radius, d.x));
        const y = Math.max(d.radius, Math.min(height - d.radius, d.y));
        return `translate(${x}, ${y})`;
      });
    });

    return () => simulation.stop();
  }, [perspectives]);

  return (
    <div ref={containerRef} className="w-full bg-slate-950/60 rounded-[2.5rem] border border-slate-800/80 overflow-hidden relative shadow-inner">
      <svg ref={svgRef} className="max-w-full" />
      <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
           <MousePointer2 className="w-3 h-3" /> Interactive Node Space
        </div>
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest pointer-events-none bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
        Drag to explore • Click to synthesize
      </div>
    </div>
  );
};

const GeminiExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<MKoneHypothesis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [resultsCache, setResultsCache] = useState<Record<string, MKoneHypothesis>>({});
  const [comparisonQueries, setComparisonQueries] = useState<string[]>([]);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [comparativeAnalysis, setComparativeAnalysis] = useState<string | null>(null);
  const [analyzingComparison, setAnalyzingComparison] = useState(false);
  const [activeAnchorCategory, setActiveAnchorCategory] = useState<string>('All');
  
  const resultsEndRef = useRef<HTMLDivElement>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    if (resultsCache[searchQuery]) {
        setActiveResult(resultsCache[searchQuery]);
        if (!history.includes(searchQuery)) {
            setHistory(prev => [...prev, searchQuery]);
        }
        setIsComparisonMode(false);
        setIsLabOpen(false);
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
        setIsLabOpen(false);
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

  const generateComparativeAnalysis = async () => {
    if (comparisonQueries.length < 2) return;
    setAnalyzingComparison(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const dataToCompare = comparisonQueries.map(q => resultsCache[q]).filter(Boolean);
      const prompt = `Synthesize a meta-hypothesis by analyzing the relationship between these MKone domains: ${comparisonQueries.join(', ')}. 
      Focus on their shared isomorphic structures and how they might converge into a single unified pattern. 
      Data: ${JSON.stringify(dataToCompare)}. Output should be professional and theoretical.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setComparativeAnalysis(response.text || "Unable to generate analysis.");
    } catch (err) {
      setComparativeAnalysis("Error generating comparative synthesis.");
    } finally {
      setAnalyzingComparison(false);
    }
  };

  const toggleComparison = (q: string) => {
    setComparisonQueries(prev => 
      prev.includes(q) ? prev.filter(item => item !== q) : [...prev, q]
    );
  };

  const injectAnchor = (anchor: string) => {
    setQuery(prev => prev ? `${prev} ${anchor}` : anchor);
  };

  const categories = useMemo(() => ['All', ...new Set(CONCEPTUAL_ANCHORS.map(a => a.category))], []);
  const filteredAnchors = useMemo(() => 
    activeAnchorCategory === 'All' ? CONCEPTUAL_ANCHORS : CONCEPTUAL_ANCHORS.filter(a => a.category === activeAnchorCategory),
    [activeAnchorCategory]
  );

  const comparisonData = useMemo(() => {
    return comparisonQueries.map(q => resultsCache[q]).filter(Boolean);
  }, [comparisonQueries, resultsCache]);

  const UncertaintyVisualizer = ({ rating }: { rating: number }) => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Uncertainty Index</span>
        <span className={`font-mono text-xs font-bold ${rating > 7 ? 'text-rose-400' : rating > 4 ? 'text-amber-400' : 'text-emerald-400'}`}>
          {rating}/10
        </span>
      </div>
      <div className="flex gap-1 h-3 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-sm transition-all duration-700 ${
              i < rating 
                ? rating > 7 ? 'bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.3)]' : rating > 4 ? 'bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );

  const HypothesisCard = ({ result, isCompact = false }: { result: MKoneHypothesis, isCompact?: boolean }) => {
    const isSelected = comparisonQueries.includes(result.domain);

    return (
      <div className={`space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${isCompact ? 'px-1' : ''}`}>
        {!isCompact && (
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">{result.domain}</h2>
            <button 
                onClick={() => toggleComparison(result.domain)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
                {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isSelected ? 'In Comparison' : 'Add to Compare'}
            </button>
          </div>
        )}

        <div className={`grid ${isCompact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
          <div className="p-5 bg-slate-950/80 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <h3 className="text-blue-400 font-mono text-[10px] uppercase tracking-widest">Coherence Pattern</h3>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{result.coherencePattern}</p>
          </div>
          <div className="p-5 bg-slate-950/80 rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
              <h3 className="text-purple-400 font-mono text-[10px] uppercase tracking-widest">Structural Mechanism</h3>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{result.structuralPattern}</p>
          </div>
        </div>

        <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800/60">
          <UncertaintyVisualizer rating={result.uncertaintyRating} />
        </div>

        {!isCompact && (
          <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-slate-500" />
                  <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Perspective Isomorphisms</h3>
                </div>
                <div className="text-[10px] font-mono text-slate-600 uppercase">Weighted Knowledge Graph</div>
              </div>
              <InteractivePerspectiveGraph 
                perspectives={result.alternatePerspectives} 
                onPerspectiveClick={(text) => {
                   setQuery(text);
                   performSearch(text);
                }}
              />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`mx-auto p-4 md:p-8 bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-800 transition-all duration-500 ${isComparisonMode ? 'max-w-[98vw]' : 'max-w-4xl'}`}>
      
      {/* Prompt Lab Window */}
      {isLabOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
                    <div className="flex items-center gap-3">
                        <Terminal className="text-blue-400 w-6 h-6" />
                        <div>
                            <h3 className="font-bold text-xl tracking-tight text-white">Synthesis Prompt Lab</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Fine-tune your modeling command</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLabOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 no-scrollbar">
                    {/* Draft Section */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Active Synthesis Command</label>
                            <button onClick={() => setQuery('')} className="text-[10px] font-mono text-rose-500 hover:text-rose-400 uppercase tracking-widest">Reset</button>
                        </div>
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Describe the domain to model... e.g., 'Quantum coherence in synaptic firing'"
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[140px] resize-none text-lg leading-relaxed placeholder:text-slate-700 font-medium"
                        />
                    </div>

                    {/* Anchors Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-3 h-3 text-slate-500" />
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Conceptual Anchors</label>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setActiveAnchorCategory(cat)}
                                        className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase transition-all ${activeAnchorCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {filteredAnchors.map(anchor => (
                                <button 
                                    key={anchor.label}
                                    onClick={() => injectAnchor(anchor.label)}
                                    className="p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl text-left hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group relative overflow-hidden"
                                >
                                    <div className="text-xs font-bold text-slate-300 group-hover:text-blue-400 mb-0.5">{anchor.label}</div>
                                    <div className="text-[9px] text-slate-500 line-clamp-1">{anchor.desc}</div>
                                    <div className="absolute top-1 right-2 text-[8px] font-mono text-slate-700 group-hover:text-blue-800 transition-colors uppercase">{anchor.category}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Templates Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-3 h-3 text-slate-500" />
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Synthesis Templates</label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {TEMPLATES.map(t => (
                                <button 
                                    key={t.name}
                                    onClick={() => setQuery(t.template)}
                                    className="p-4 bg-slate-900/20 border border-slate-800 rounded-xl text-left hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-purple-400" />
                                        <span className="text-xs font-bold text-slate-200 group-hover:text-purple-400">{t.name}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 italic line-clamp-2 leading-relaxed">"{t.template}"</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-900/30 border-t border-slate-800 flex gap-4">
                    <button 
                        onClick={() => performSearch(query)}
                        disabled={loading || !query}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-lg shadow-xl shadow-blue-950/20"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Run Synthesis</>}
                    </button>
                    <button 
                        onClick={() => setIsLabOpen(false)}
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all"
                    >
                        Save Draft
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10 text-center relative flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
          Framework Version 2.4.1
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-3 flex items-center justify-center gap-4 text-white">
          <Sparkles className="text-blue-500 w-10 h-10" />
          MKone Explorer
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          The interdisciplinary engine for generating structural isomorphisms across fragmented scientific domains.
        </p>
        
        <div className="mt-8 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-3">
            {comparisonQueries.length > 0 && (
                <button 
                    onClick={() => setIsComparisonMode(!isComparisonMode)}
                    className={`px-5 py-2.5 rounded-2xl border flex items-center gap-3 transition-all shadow-xl font-bold text-sm ${isComparisonMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                >
                    {isComparisonMode ? <LayoutGrid className="w-4 h-4" /> : <Columns className="w-4 h-4" />}
                    <span>{isComparisonMode ? 'Dashboard' : `Analysis (${comparisonQueries.length})`}</span>
                </button>
            )}
        </div>
      </div>

      {/* History Breadcrumbs */}
      {history.length > 0 && !isComparisonMode && (
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/40 rounded-full border border-slate-700 shrink-0">
            <History className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-widest">Timeline</span>
          </div>
          <div className="flex gap-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center group">
                  <span 
                      className={`text-xs px-4 py-2 rounded-l-xl border-y border-l transition-all cursor-pointer whitespace-nowrap ${h === (activeResult?.domain || '') ? 'bg-blue-600 border-blue-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                      onClick={() => performSearch(h)}
                  >
                      {h}
                  </span>
                  <button 
                      onClick={() => toggleComparison(h)}
                      title="Add to Comparison Suite"
                      className={`px-3 py-2 rounded-r-xl border transition-all ${comparisonQueries.includes(h) ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-600 hover:text-blue-400 hover:border-blue-500/40'}`}
                  >
                      {comparisonQueries.includes(h) ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Search/Trigger Section */}
      {!isComparisonMode && (
        <div className="mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && performSearch(query)}
                placeholder="Target Domain..."
                className="w-full bg-slate-950 border-2 border-slate-800/60 rounded-3xl px-8 py-6 pr-32 focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all text-white text-lg placeholder:text-slate-700 font-medium"
                />
                <button 
                    type="button"
                    onClick={() => setIsLabOpen(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-blue-600/10 hover:text-blue-400 border border-slate-800 hover:border-blue-500/30 rounded-2xl transition-all text-slate-500 font-mono text-xs uppercase font-bold tracking-widest"
                >
                    <Terminal className="w-4 h-4" /> Lab
                </button>
            </div>
            <button
            onClick={() => performSearch(query)}
            disabled={loading || !query}
            className="bg-white hover:bg-slate-100 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold px-10 py-6 rounded-3xl flex items-center gap-3 transition-all min-w-[200px] justify-center text-lg active:scale-95"
            >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Zap className="w-5 h-5 fill-current" /> Synthesize</>}
            </button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-rose-500/5 border-2 border-rose-500/20 p-6 rounded-3xl flex items-start gap-4 text-rose-300 mb-8 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="shrink-0 mt-0.5 w-6 h-6" />
          <div>
            <h4 className="font-bold text-rose-400 mb-1">Modeling Fault</h4>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {isComparisonMode ? (
        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-950/40 p-8 rounded-[2rem] border border-slate-800/60">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold flex items-center gap-3 text-blue-400">
                      <Scale className="w-6 h-6" /> Comparative Analysis Suite
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">Cross-referencing structural mechanisms across {comparisonQueries.length} selected domains.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={generateComparativeAnalysis}
                    disabled={analyzingComparison || comparisonQueries.length < 2}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white text-sm font-bold rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-purple-900/20"
                  >
                    {analyzingComparison ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquareQuote className="w-5 h-5" />}
                    Meta-Synthesis
                  </button>
                  <button 
                    onClick={() => setComparisonQueries([])} 
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 text-sm font-bold rounded-2xl transition-all"
                  >
                    Clear Suite
                  </button>
                </div>
            </div>

            {comparativeAnalysis && (
              <div className="p-8 bg-purple-600/5 border border-purple-500/20 rounded-[2rem] animate-in slide-in-from-top-6 duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-600/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 block">Unified Theory Output</span>
                    <h4 className="font-bold text-slate-100">Convergence Mechanism Identified</h4>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed italic text-lg">{comparativeAnalysis}</p>
              </div>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(comparisonData.length, 3)} gap-8`}>
                {comparisonData.map((res, idx) => (
                    <div key={idx} className="flex flex-col border border-slate-800/80 rounded-[2rem] overflow-hidden bg-slate-950/60 group hover:border-blue-500/40 transition-all shadow-xl">
                        <div className="p-6 bg-slate-900/40 border-b border-slate-800/80 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
                            <span className="text-sm font-bold text-slate-100 truncate pr-4">{res.domain}</span>
                            <button 
                                onClick={() => toggleComparison(res.domain)}
                                className="p-2 text-slate-600 hover:text-rose-400 transition-colors bg-slate-950/40 rounded-lg border border-slate-800"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6 flex-1">
                            <HypothesisCard result={res} isCompact={true} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      ) : (
        activeResult && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <HypothesisCard result={activeResult} />
            </div>
        )
      )}

      {/* Global Reminder */}
      {!isComparisonMode && activeResult && (
        <div className="mt-16 flex flex-col md:flex-row items-center gap-6 p-8 bg-amber-500/5 border-2 border-amber-500/10 rounded-[2rem] text-center md:text-left">
            <div className="p-4 bg-amber-500/10 rounded-2xl">
                <Info className="w-8 h-8 text-amber-500 shrink-0" />
            </div>
            <div className="space-y-1">
                <h4 className="font-bold text-amber-500 uppercase text-xs tracking-widest font-mono">Epistemic Disclaimer</h4>
                <p className="text-amber-200/80 text-sm leading-relaxed max-w-2xl">
                    MKone hypotheses are emergent computational patterns derived from information-theoretic isomorphisms. They represent potential structural alignments, not empirical verities.
                </p>
            </div>
        </div>
      )}

      <div ref={resultsEndRef} />
    </div>
  );
};

export default GeminiExplorer;
