
import React, { useState, useEffect } from 'react';
import { DATA_MAPPINGS, ICON_MAP } from '../constants';
import { 
  Activity, 
  Database, 
  Zap, 
  Cpu, 
  Radio, 
  Waves, 
  Atom, 
  BarChart3, 
  GitMerge, 
  Search,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';

const ScientificEngine: React.FC = () => {
  const [ingesting, setIngesting] = useState<string | null>(null);
  const [syncedLayers, setSyncedLayers] = useState<string[]>([]);
  const [mkIndex, setMkIndex] = useState(84.2);

  const simulateIngestion = (layer: string) => {
    setIngesting(layer);
    setTimeout(() => {
      setIngesting(null);
      if (!syncedLayers.includes(layer)) {
        setSyncedLayers(prev => [...prev, layer]);
        setMkIndex(prev => Math.min(99.9, prev + Math.random() * 2));
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-slate-950/60 p-10 rounded-[3rem] border border-slate-800 border-b-blue-500/30">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em]">
            Scientific Engine v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Data-Linked <br />
            <span className="text-blue-500">Verification</span> Lab
          </h1>
          <p className="text-slate-400 max-w-xl text-lg">
            Grounding theoretical constructs in measurable physical reality through real-time data ingestion pipelines.
          </p>
        </div>
        
        <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 flex flex-col items-center gap-2 min-w-[240px]">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global MK Index</span>
          <div className="text-5xl font-bold text-blue-400 tracking-tighter">
            {mkIndex.toFixed(1)}<span className="text-lg text-blue-600">%</span>
          </div>
          <div className="flex gap-1 h-1 w-full bg-slate-950 rounded-full mt-2">
            <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${mkIndex}%` }} />
          </div>
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mt-2">Falsifiability Confidence</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {DATA_MAPPINGS.map((mapping) => (
          <div 
            key={mapping.layer} 
            className={`relative p-8 bg-slate-900/40 rounded-[2.5rem] border transition-all duration-500 overflow-hidden group ${
              syncedLayers.includes(mapping.layer) ? `border-${mapping.color}-500/30` : 'border-slate-800'
            }`}
          >
            {/* Visual background effect */}
            <div className={`absolute inset-0 bg-${mapping.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-widest text-${mapping.color}-400 mb-1`}>
                    {mapping.layer}
                  </h3>
                  <div className="text-lg font-bold text-slate-100">{mapping.concept}</div>
                </div>
                {syncedLayers.includes(mapping.layer) ? (
                  <CheckCircle2 className={`w-5 h-5 text-${mapping.color}-500`} />
                ) : (
                  <Activity className="w-5 h-5 text-slate-700 animate-pulse" />
                )}
              </div>

              <div className="space-y-4 flex-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Active Pipelines</div>
                {mapping.datasets.map(ds => (
                  <div key={ds.name} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/60 flex flex-col gap-1 group/ds hover:border-blue-500/20 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">{ds.name}</span>
                      <span className="text-[9px] font-mono text-slate-600">{ds.source}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono italic">{ds.metric}</div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => simulateIngestion(mapping.layer)}
                disabled={ingesting === mapping.layer}
                className={`mt-8 w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  syncedLayers.includes(mapping.layer) 
                    ? `bg-${mapping.color}-600/10 text-${mapping.color}-400 border border-${mapping.color}-500/20`
                    : 'bg-slate-950 text-slate-500 border border-slate-800 hover:border-slate-600'
                }`}
              >
                {ingesting === mapping.layer ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Ingesting Data...</>
                ) : syncedLayers.includes(mapping.layer) ? (
                  <><CheckCircle2 className="w-4 h-4" /> Pipeline Synced</>
                ) : (
                  <><RefreshCw className="w-4 h-4" /> Sync Dataset</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Center Detail: ObserverNode Protocol */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-10 bg-slate-950/40 rounded-[3rem] border border-slate-800 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl">
              <GitMerge className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">ObserverNode Protocol v2</h2>
              <p className="text-sm text-slate-500">Cross-Correlation Validation Engine</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-slate-400 leading-relaxed text-sm">
              Authenticates theoretical constructs by correlating independent datasets. Verification is now computed as <code className="text-blue-400">R = corr(D1, D2)</code>.
            </p>
            
            <div className="space-y-4">
              {[
                { label: 'CMB + LSS Correlation', value: 92 },
                { label: 'LIGO + GR Simulation', value: 98 },
                { label: 'Quantum Entanglement Deviation', value: 14 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span>{item.value}% Accuracy</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${item.value > 80 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                      style={{ width: `${item.value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-10 bg-gradient-to-br from-slate-950 to-blue-900/10 rounded-[3rem] border border-blue-500/10 flex flex-col justify-between">
           <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                <Zap className="text-blue-500 w-5 h-5" /> Falsifiability Layer
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Platform-generated predictions currently undergoing empirical stress-testing. If correlations drop below the threshold, the Ω layer automatically triggers a V(Φ) potential adjustment.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Predict curvature variance spectrum shape",
                  "Measure Floquet eigenphase clustering deviation",
                  "Cosmological parameter shift beyond ΛCDM"
                ].map((p, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                    <Search className="w-3.5 h-3.5 text-blue-500" />
                    {p}
                  </li>
                ))}
              </ul>
           </div>

           <div className="pt-8 border-t border-slate-800/60 mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Numerical Engines Active</span>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-xs font-bold transition-colors flex items-center gap-2 uppercase tracking-widest">
                System Logs <RefreshCw className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>

      <div className="flex items-start gap-4 p-8 bg-amber-500/5 border border-amber-500/10 rounded-[2rem]">
        <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/60 leading-relaxed italic">
          "The transition from symbolic logic to data-linked computation ensures that Civilisation.one remains a falsifiable scientific instrument, not just a theoretical framework. Every node is an observation point."
        </p>
      </div>

    </div>
  );
};

export default ScientificEngine;
