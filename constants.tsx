
import { 
  ShieldCheck, 
  Cpu, 
  Dna, 
  Orbit, 
  Scale, 
  Eye, 
  UserCheck, 
  Globe, 
  AlertTriangle,
  BookOpen,
  LucideIcon
} from 'lucide-react';
import { Principle, Risk } from './types';

export const PRINCIPLES: Principle[] = [
  {
    id: 'agency',
    title: 'Agency First',
    description: 'MKone preserves human agency. It does not decide, judge, or command. All interpretations and consequences remain human responsibility.',
    icon: 'UserCheck'
  },
  {
    id: 'reality',
    title: 'Models ≠ Reality',
    description: 'Outputs are simulations and patterns—not facts. Conceptual elegance does not imply ontological truth.',
    icon: 'Orbit'
  },
  {
    id: 'transparency',
    title: 'Transparency Over Authority',
    description: 'Embedded assumptions are made explicit. We encourage questioning the origin and exclusion of structures.',
    icon: 'Eye'
  },
  {
    id: 'pluralism',
    title: 'Pluralism by Design',
    description: 'MKone is one lens among many. It is used alongside, not instead of, competing theories and frameworks.',
    icon: 'Globe'
  },
  {
    id: 'responsibility',
    title: 'Scaled Responsibility',
    description: 'As influence, automation, or authority grows, so does the ethical responsibility of the user.',
    icon: 'Scale'
  }
];

export const RISKS: Risk[] = [
  { term: 'Epistemic Overreach', definition: 'Confusing internal logical coherence with external empirical correctness.' },
  { term: 'Reification', definition: 'Treating mathematical abstractions as if they were physical entities.' },
  { term: 'Worldview Capture', definition: 'Allowing a single modeling framework to dominate all forms of interpretation.' },
  { term: 'Mythologization', definition: 'Elevating computational frameworks beyond their evidentiary basis into dogma.' }
];

export const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Cpu,
  Dna,
  Orbit,
  Scale,
  Eye,
  UserCheck,
  Globe,
  AlertTriangle,
  BookOpen
};
