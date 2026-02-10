
import React from 'react';
import { STATEMENTS, ICON_MAP } from '../constants';
import { Sparkles } from 'lucide-react';

const Statements: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em]">
          Core Directives
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
          The <span className="text-blue-500">Statements</span> of Civilisation.one
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          The constitutional architecture defining our engagement with knowledge, verification, and human-machine synthesis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATEMENTS.map((s) => {
          const Icon = ICON_MAP[s.icon] || Sparkles;
          return (
            <div 
              key={s.id} 
              className="group relative p-8 bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-800 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden shadow-lg shadow-black/20"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-6 flex items-center justify-between">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-blue-500/40 transition-colors shadow-inner">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-[10px] font-mono text-slate-700 font-bold group-hover:text-blue-500/50 transition-colors">
                  0{s.id >= 10 ? s.id : s.id}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-slate-100 group-hover:text-blue-400 transition-colors tracking-tight">
                {s.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-sm flex-1">
                {s.content}
              </p>
              
              <div className="mt-6 pt-6 border-t border-slate-800/50">
                <div className="h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-700 rounded-full" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-12 bg-gradient-to-br from-slate-950 to-blue-950/20 rounded-[3rem] border border-blue-500/10 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-100">Foundational Commitment</h2>
        <p className="text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          "These statements are not static decrees, but living scaffolds for the evolution of collective intelligence. We invite scrutiny and growth at every node of our shared architecture."
        </p>
        <div className="flex justify-center gap-4 text-blue-500/50 font-mono text-[10px] uppercase tracking-widest pt-4">
          <span>&Phi; COGNITION</span>
          <span>&middot;</span>
          <span>&psi; VERIFICATION</span>
          <span>&middot;</span>
          <span>&Omega; UNITY</span>
        </div>
      </div>
    </div>
  );
};

export default Statements;
