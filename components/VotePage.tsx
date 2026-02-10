
import React, { useState, useRef } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Gavel,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  category: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  expiresAt: string;
  status: 'Open' | 'Verified' | 'Contested';
}

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 101,
    title: "Integration of Quantime Entropy in Core Modeling",
    category: "Physics Protocol",
    description: "Proposed update to the entropy calculation mechanism to account for non-linear temporal decay patterns observed in recent high-fidelity simulations.",
    votesFor: 1242,
    votesAgainst: 89,
    expiresAt: "2024-12-15",
    status: 'Open'
  },
  {
    id: 102,
    title: "Expansion of 'Agency First' Statement Scope",
    category: "Ethics Governance",
    description: "Clarifying that human agency constraints apply to all sub-nodes of the decentralised verification layer, regardless of regional political neutrality.",
    votesFor: 3501,
    votesAgainst: 12,
    expiresAt: "2024-12-01",
    status: 'Verified'
  },
  {
    id: 103,
    title: "Standardization of Isomorphism Weighting (Beta)",
    category: "Math Logic",
    description: "A collective motion to normalize weighting factors across fragmented domain comparisons to prevent 'Structural Overreach' risks.",
    votesFor: 412,
    votesAgainst: 567,
    expiresAt: "2024-11-20",
    status: 'Contested'
  }
];

const VotePage: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string, type: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVote = (id: number, type: 'for' | 'against') => {
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votesFor: type === 'for' ? p.votesFor + 1 : p.votesFor,
          votesAgainst: type === 'against' ? p.votesAgainst + 1 : p.votesAgainst
        };
      }
      return p;
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Explicitly typing 'f' as File to avoid the unknown property access error.
      const newFiles = Array.from(files).map((f: File) => ({ name: f.name, type: f.type }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em]">
          Governance Node
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
          Collective <span className="text-blue-500">Stewardship</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Participate in the decentralised verification of knowledge. Your voice anchors the ethical and scientific integrity of Civilisation.one.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Proposals List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <Gavel className="w-6 h-6 text-blue-500" /> Active Proposals
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase">Latest</span>
            </div>
          </div>

          {proposals.map(proposal => (
            <div key={proposal.id} className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] hover:border-slate-700 transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono uppercase font-bold tracking-widest ${
                      proposal.status === 'Open' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' :
                      proposal.status === 'Verified' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-rose-600/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {proposal.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{proposal.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{proposal.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{proposal.description}</p>
                  
                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> Expires: {proposal.expiresAt}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500/50" /> Stake-backed
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-48 space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase mb-1">
                      <span>Consensus</span>
                      <span>{Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleVote(proposal.id, 'for')}
                      className="flex flex-col items-center justify-center p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl hover:bg-blue-600 hover:text-white transition-all group/btn"
                    >
                      <ThumbsUp className="w-4 h-4 mb-1 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold">{proposal.votesFor}</span>
                    </button>
                    <button 
                      onClick={() => handleVote(proposal.id, 'against')}
                      className="flex flex-col items-center justify-center p-3 bg-rose-600/10 border border-rose-500/20 rounded-xl hover:bg-rose-600 hover:text-white transition-all group/btn"
                    >
                      <ThumbsDown className="w-4 h-4 mb-1 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold">{proposal.votesAgainst}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: Upload & Instructions */}
        <div className="space-y-8">
          
          {/* Upload Box */}
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] space-y-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
              <Upload className="w-5 h-5 text-emerald-500" /> Verification Docs
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload scientific reviews, peer critiques, or model validation logs to support or contest active proposals.
            </p>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-slate-600 group-hover:text-emerald-500" />
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-slate-300">Drag & Drop or click to browse</span>
              <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">PDF, DOCX, ZIP (MAX 25MB)</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                onChange={handleFileUpload}
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">Queue ({uploadedFiles.length})</div>
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 group/file">
                    <div className="flex items-center gap-3 truncate">
                      <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs text-slate-300 truncate font-mono">{file.name}</span>
                    </div>
                    <button onClick={() => removeFile(i)} className="p-1 hover:text-rose-500 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                  Submit Verification Packet
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats / Info */}
          <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2rem] space-y-4">
             <div className="flex items-center gap-3 text-blue-400 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Member Status</h4>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Reputation Score</span>
                  <span className="text-xs font-mono text-slate-200">1,402 &Phi;</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Staked CIV1</span>
                  <span className="text-xs font-mono text-slate-200">250.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Verifications Led</span>
                  <span className="text-xs font-mono text-slate-200">14</span>
                </div>
             </div>
             <button className="w-full mt-2 py-3 bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-slate-400 hover:text-blue-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
               Manage Stake <ChevronRight className="w-3.5 h-3.5" />
             </button>
          </div>

          <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-[1.5rem] flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
            <p className="text-[11px] text-amber-200/70 leading-relaxed italic">
              "Votes are weighted by domain-specific reputation and historical verification accuracy. Dogmatism is filtered through the Coherence Protocol."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VotePage;
