export enum AppStep {
  SELECTION = 'SELECTION',
  RESEARCH = 'RESEARCH',
  EVALUATION = 'EVALUATION',
  POSTER = 'POSTER',
}

export interface Myth {
  id: string;
  title: string;
  category: string;
}

export interface GroundingSource {
  title: string;
  url: string;
  snippet?: string;
}

export interface EvaluatedSource extends GroundingSource {
  authorCheck: boolean; // Is de auteur bekend/expert?
  commercialCheck: boolean; // Is het geen reclame?
  evidenceCheck: boolean; // Wordt er bewijs genoemd?
  isReliable: boolean;
  notes: string;
}

export interface ResearchState {
  selectedMyth: Myth | null;
  searchSummary: string;
  searchResults: GroundingSource[];
  evaluatedSources: EvaluatedSource[];
  finalConclusion: string;
  verdict: 'FACT' | 'FICTION' | 'NUANCED' | null;
}