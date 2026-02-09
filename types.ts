
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

export interface MKoneHypothesis {
  domain: string;
  coherencePattern: string;
  structuralPattern: string;
  uncertaintyRating: number;
  alternatePerspectives: string[];
}

export enum ViewState {
  HOME = 'home',
  MANIFESTO = 'manifesto',
  PRINCIPLES = 'principles',
  EXPLORER = 'explorer',
  RISKS = 'risks'
}
