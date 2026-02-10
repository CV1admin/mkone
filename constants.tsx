
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
    id: 'unity',
    title: 'Unity of Awareness',
    description: 'The intentional alignment of cognitive intent with computational advancement. Technology serves as a transparent extension of consciousness, ensuring that systems remain anchored in collective human awareness.',
    icon: 'Cpu'
  },
  {
    id: 'agency',
    title: 'Agency First',
    description: 'Civilisation.one preserves human agency. It does not decide, judge, or command. All interpretations and consequences remain human responsibility.',
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
    description: 'Civilisation.one is one lens among many. It is used alongside, not instead of, competing theories and frameworks.',
    icon: 'Globe'
  },
  {
    id: 'responsibility',
    title: 'Responsibility',
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
