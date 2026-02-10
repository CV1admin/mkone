
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
  Target,
  Network,
  GraduationCap,
  FlaskConical,
  Users,
  Trees,
  MailOpen,
  LucideIcon
} from 'lucide-react';
import { Principle, Risk, Statement } from './types';

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

export const STATEMENTS: Statement[] = [
  {
    id: 1,
    title: 'Purpose',
    content: 'Civilisation.One advances universal education, scientific verification, and ethical AI through open, decentralised collaboration.',
    icon: 'Target'
  },
  {
    id: 2,
    title: 'Decentralisation by Design',
    content: 'No single node controls knowledge or direction. Governance emerges through transparent standards and mutual verification.',
    icon: 'Network'
  },
  {
    id: 3,
    title: 'Open Knowledge & Verifiability',
    content: 'Models, simulations, and learning pathways are designed to be inspectable, testable, and reproducible.',
    icon: 'BookOpen'
  },
  {
    id: 4,
    title: 'Education Without Barriers',
    content: 'Age-universal access with complexity scaling—supporting early learners, students, and experts from the same core structure.',
    icon: 'GraduationCap'
  },
  {
    id: 5,
    title: 'Science as a Living Process',
    content: 'Hypotheses are encouraged, challenged, refined, or discarded through evidence, coherence, and peer review.',
    icon: 'FlaskConical'
  },
  {
    id: 6,
    title: 'Human–AI Co-Learning',
    content: 'AI assists with simulation, explanation, and reasoning—under auditable constraints and clear accountability.',
    icon: 'Cpu'
  },
  {
    id: 7,
    title: 'Ethical Alignment',
    content: 'Protocols enforce no-harm, transparency, fairness, and respect for human agency. Ethics is built-in, not bolted-on.',
    icon: 'ShieldCheck'
  },
  {
    id: 8,
    title: 'Cultural & Political Neutrality',
    content: 'Not bound to any nation or ideology. We welcome diverse perspectives while remaining evidence-grounded.',
    icon: 'Globe'
  },
  {
    id: 9,
    title: 'Collective Intelligence',
    content: 'Constructive dissent and contradiction are treated as engines of understanding, not threats to it.',
    icon: 'Users'
  },
  {
    id: 10,
    title: 'Stewardship of the Future',
    content: 'We design curricula, tools, and AI systems for long-term civilisational stability, sustainability, and wisdom.',
    icon: 'Trees'
  },
  {
    id: 11,
    title: 'Transparency of Power',
    content: 'Decision systems, algorithms, and governance mechanisms are visible and accountable. Influence is earned by contribution.',
    icon: 'Eye'
  },
  {
    id: 12,
    title: 'Invitation',
    content: 'Open to learners, educators, scientists, builders, and explorers. Participation is shared stewardship of knowledge.',
    icon: 'MailOpen'
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
  BookOpen,
  Target,
  Network,
  GraduationCap,
  FlaskConical,
  Users,
  Trees,
  MailOpen
};
