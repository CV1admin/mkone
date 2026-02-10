
import React, { useState } from 'react';
import { ViewState } from './types';
import { PRINCIPLES, RISKS, ICON_MAP } from './constants';
import BackgroundSimulation from './components/BackgroundSimulation';
import GeminiExplorer from './components/GeminiExplorer';
import VerificationLayer from './components/VerificationLayer';
import { 
  Menu, 
  X, 
  Github, 
  ChevronRight, 
  ShieldAlert,
  ArrowRight,
  Lightbulb,
  Orbit,
  Cpu,
  Layers
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ state, label }: { state: ViewState; label: string }) => (
    <button
      onClick={() => {
        setView(state);
        setMobileMenuOpen(false);
      }}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        view === state ? 'text-blue-400' : 'text-slate-400 hover:text-slate-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen relative flex flex-col">
      <BackgroundSimulation />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">M</div>
            <span className="text-xl font-bold tracking-tighter">MK<span className="text-blue-500">one</span></span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NavItem state={ViewState.HOME} label="Home" />
            <NavItem state={ViewState.CIVILISATION} label="Civilisation One" />
            <NavItem state={ViewState.PRINCIPLES} label="Principles" />
            <NavItem state={ViewState.RISKS} label="Risks" />
            <NavItem state={ViewState.EXPLORER} label="Explorer" />
            <a 
              href="https://github.com" 
              className="ml-4 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 py-4 flex flex-col items-center gap-2">
            <NavItem state={ViewState.HOME} label="Home" />
            <NavItem state={ViewState.CIVILISATION} label="Civilisation One" />
            <NavItem state={ViewState.PRINCIPLES} label="Principles" />
            <NavItem state={ViewState.RISKS} label="Risks" />
            <NavItem state={ViewState.EXPLORER} label="Explorer" />
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className={`flex-1 z-10 relative ${view === ViewState.CIVILISATION ? 'pt-4' : 'pt-12'} pb-24 px-4 max-w-7xl mx-auto w-full`}>
        {view === ViewState.HOME && (
          <div className="space-y-24 animate-in fade-in duration-700">
            {/* Hero */}
            <section className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                A World-Modeling <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Framework</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                MKone is an exploratory unifying framework spanning physics, information theory, cosmology, and cognition. 
                Designed to generate insight, not authoritative truth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setView(ViewState.EXPLORER)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center gap-2 group shadow-xl shadow-blue-900/20"
                >
                  Launch Explorer <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                   onClick={() => setView(ViewState.CIVILISATION)}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full transition-all flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-blue-400" /> Verification Layer
                </button>
              </div>
            </section>

            {/* Definitions */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Theoretic Framework", desc: "Spanning physics, information theory, cosmology, and cognition.", icon: Orbit },
                { title: "Computational Paradigm", desc: "Utilizing tensor networks, quantum circuits, and machine learning.", icon: Cpu },
                { title: "Exploratory Model", desc: "Designed to generate insights and hypotheses, not final facts.", icon: Lightbulb }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all group">
                    <div className="mb-4 text-blue-400 group-hover:scale-110 transition-transform"><Icon className="w-8 h-8" /></div>
                    <h3 className="text-xl font-bold mb-3 text-slate-100">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Is/Not Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div className="p-8 bg-emerald-500/5 rounded-3xl border border-emerald-500/20">
                <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full" /> What MKone Is
                </h3>
                <ul className="space-y-4">
                  {[
                    "A conceptual sandbox for interdisciplinary reasoning.",
                    "A tool for exploring coherence across fragmented domains.",
                    "An engine for generating structural hypotheses."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <ArrowRight className="w-5 h-5 mt-1 text-emerald-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-rose-500/5 rounded-3xl border border-rose-500/20">
                <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-rose-500 rounded-full" /> What MKone Is Not
                </h3>
                <ul className="space-y-4">
                  {[
                    "A verified Theory of Everything.",
                    "A predictive oracle or ground truth.",
                    "A replacement for empirical science or values."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <X className="w-5 h-5 mt-1 text-rose-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {view === ViewState.CIVILISATION && <VerificationLayer />}

        {view === ViewState.PRINCIPLES && (
          <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Ethical Principles</h1>
              <p className="text-slate-400 max-w-2xl mx-auto">MKone responsibility scales not with deployment size, but with interpretive influence.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRINCIPLES.map((p) => {
                const Icon = ICON_MAP[p.icon];
                return (
                  <div key={p.id} className="p-8 bg-slate-900/50 backdrop-blur rounded-3xl border border-slate-800 hover:scale-[1.02] transition-transform flex flex-col group">
                    <div className="mb-6 p-3 bg-slate-950 rounded-xl w-fit group-hover:bg-blue-600/10 transition-colors">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-100">{p.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm flex-1">{p.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-950/80 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-100">
                <ICON_MAP.ShieldCheck className="w-6 h-6 text-emerald-400" /> Commitments
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-blue-400 font-mono text-xs uppercase mb-4 tracking-widest">Maintainer Commitments</h4>
                  <ul className="space-y-3 text-slate-400 text-sm italic">
                    <li>— Documenting assumptions and revisions</li>
                    <li>— Publishing failures and contradictions</li>
                    <li>— Encouraging critique and alternative models</li>
                    <li>— Avoiding claims of finality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple-400 font-mono text-xs uppercase mb-4 tracking-widest">User Commitments</h4>
                  <ul className="space-y-3 text-slate-400 text-sm italic">
                    <li>— Understanding operational limitations</li>
                    <li>— Avoiding overstated or dogmatic claims</li>
                    <li>— Contextualizing all computational outputs</li>
                    <li>— Reflecting on downstream social implications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === ViewState.RISKS && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-white">
                <ShieldAlert className="text-rose-500 w-12 h-12" />
                Operational Risks
              </h1>
              <p className="text-slate-400">Understanding the failure modes of high-abstraction world modeling.</p>
            </div>

            <div className="space-y-4">
              {RISKS.map((risk, idx) => (
                <div key={idx} className="group p-6 bg-slate-900/30 border border-slate-800 rounded-2xl hover:bg-slate-900/50 transition-colors">
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-rose-400 transition-colors mb-2">{risk.term}</h3>
                  <p className="text-slate-400">{risk.definition}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-rose-500/5 rounded-3xl border border-rose-500/20 text-center">
              <p className="text-slate-300 italic leading-relaxed">
                "Epistemic risks are mitigated through explicit framing, plural comparison, and documented uncertainty."
              </p>
            </div>
          </div>
        )}

        {view === ViewState.EXPLORER && <GeminiExplorer />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 backdrop-blur py-8 px-4 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center font-bold text-xs text-white">M</div>
             <span className="text-sm text-slate-500">© 2024 MKone Framework. Ethics First.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Security</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Ethical Audit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
