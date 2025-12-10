export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface Exercise {
  id: string;
  text: string;
  difficulty: Difficulty;
  category: 'TongueTwister' | 'Text' | 'Articulation';
}

export interface HistoryItem {
  exerciseId: string;
  date: string;
  accuracy?: number;
}
