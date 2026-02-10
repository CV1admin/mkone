
import React from 'react';
import { ArrowRight, BarChart3, Binary, ShieldCheck, Microscope } from 'lucide-react';

const VerificationLayer: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] w-full overflow-hidden rounded-[2rem] border border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
      
      {/* Left Panel: Strategic / Investor */}
      <section className="flex-1 p-8 md:p-16 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-black border-r border-slate-800 relative group overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="inline-block px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em]">
            For Investors & Strategic Partners
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              The Verification Layer <br />
              <span className="text-blue-500">for Knowledge</span>
            </h1>
            <h2 className="text-xl text-slate-400 font-medium">
              Infrastructure for trust in science, AI, and complex systems
            </h2>
          </div>

          <p className="text-slate-300 leading-relaxed max-w-lg">
            Civilisation One is a next-generation platform for verifying knowledge at global scale.
            It replaces authority-based trust with stake-backed validation, transparent simulation,
            and ethics-locked governance.
          </p>

          <ul className="space-y-4">
            {[
              "Stake-based verification instead of reputation",
              "Live simulations exposing reasoning, not just outputs",
              "Non-inflationary utility token (CIV1)",
              "Ethical constraints that cannot be voted away"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 pt-12 space-y-6">
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 group">
              View Investor Deck <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold rounded-xl transition-all">
              Token & Economics
            </button>
          </div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <Binary className="w-3 h-3" /> Utility token • Long-term infrastructure
          </div>
        </div>
      </section>

      {/* Right Panel: Researcher / Scientist */}
      <section className="flex-1 p-8 md:p-16 flex flex-col justify-between bg-gradient-to-br from-slate-950 to-emerald-950/20 relative group overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="inline-block px-4 py-1.5 bg-emerald-600/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em]">
            For Researchers & Scientists
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              A Global Laboratory <br />
              <span className="text-emerald-500">for Verified Knowledge</span>
            </h1>
            <h2 className="text-xl text-slate-400 font-medium">
              Test, challenge, and resolve theories — transparently
            </h2>
          </div>

          <p className="text-slate-300 leading-relaxed max-w-lg">
            Civilisation One is a scientific simulation and verification environment where
            theories are not accepted by authority, but proven through computation,
            contradiction analysis, and collective scrutiny.
          </p>

          <ul className="space-y-4">
            {[
              "Advanced simulations (quantime, symmetry, paradox resolution)",
              "Stake-backed peer review and challenges",
              "Visible reasoning via Φ ψ Ω Δ cognitive layers",
              "Ethics and safety enforced at protocol level"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 pt-12 space-y-6">
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2 group">
              Explore Platform <Microscope className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold rounded-xl transition-all">
              Researcher Onboarding
            </button>
          </div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> No institutions decide truth • Verification is earned
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default VerificationLayer;
