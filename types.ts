export enum AppScreen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  STUDY_HUB = 'STUDY_HUB',
  AI_ASSISTANT = 'AI_ASSISTANT',
  FLASHCARDS = 'FLASHCARDS',
  NOTES = 'NOTES',
  PROFILE = 'PROFILE',
  PROGRESS = 'PROGRESS',
  STUDY_PLANNER = 'STUDY_PLANNER',
  FEATURES = 'FEATURES'
}

export enum QuestionType {
  MCQ = 'MCQ',
  CBQ = 'CBQ' // Case Based Question
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  subject: string;
  year: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  masteryLevel: number; // 0-5
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: number;
  tags?: string[];
  summary?: string; // AI Generated summary
  reminder?: string; // ISO Date string
}

export interface StudyTask {
  id: string;
  text: string;
  time: string;
  completed: boolean;
  subject: string;
}

export interface UserPreferences {
  name: string;
  email?: string; // Optional for Guest
  avatar?: string; // Optional url
  isGuest: boolean;
  subjects: string[]; // Keeping structure but we won't ask for it explicitly in onboarding anymore
  goal: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}