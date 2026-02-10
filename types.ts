
export interface Principle {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Risk {
  term: string;
  definition: string;
}

export interface Statement {
  id: number;
  title: string;
  content: string;
  icon: string;
}

export interface MKoneHypothesis {
  domain: string;
  coherencePattern: string;
  structuralPattern: string;
  uncertaintyRating: number;
  alternatePerspectives: Array<{ text: string; weight: number }>;
}

export enum ViewState {
  HOME = 'home',
  MANIFESTO = 'manifesto',
  PRINCIPLES = 'principles',
  EXPLORER = 'explorer',
  RISKS = 'risks',
  CIVILISATION = 'civilisation',
  STATEMENTS = 'statements',
  VOTE = 'vote'
}
