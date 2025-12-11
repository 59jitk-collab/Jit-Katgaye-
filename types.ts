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
  FEATURES = 'FEATURES',
  REVISION_NOTES = 'REVISION_NOTES',
  DOUBT_SOLVER = 'DOUBT_SOLVER',
  NCERT_ACTIVITIES = 'NCERT_ACTIVITIES',
  // Sidebar Screens
  STUDY_TIMER = 'STUDY_TIMER',
  MY_COURSES = 'MY_COURSES',
  SYLLABUS = 'SYLLABUS',
  CALENDAR = 'CALENDAR',
  STATISTICS = 'STATISTICS'
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
  chapter?: string; // Added chapter support
  year: number;
  isPYQ?: boolean;
  isSQP?: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
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

export interface ChapterNote {
  id: string;
  subject: string;
  chapterName: string;
  content: string; // Markdown supported
  readTime?: string;
}

export interface Activity {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  aim: string;
  materials: string[];
  procedure: string[];
  conclusion: string;
  visualType?: 'CHEMISTRY_BURN' | 'CHEMISTRY_BUBBLE' | 'BIOLOGY_3D_PLANT' | 'PHYSICS_CIRCUIT';
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

export interface UserStats {
    questionsSolved: number;
    accuracy: number;
    streak: number;
    subjectStats: SubjectStat[];
}

export interface SubjectStat {
    name: string;
    correct: number;
    total: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface StudyHubFilter {
    subject?: string;
    chapter?: string;
    type?: 'PYQ' | 'MCQ' | 'NOTES'; 
}