// Tipos principais do sistema de preparação

export interface Domain {
  id: string;
  name: string;
  description: string;
  weight: number; // Porcentagem no exame
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  domainId: string;
  name: string;
  description: string;
  objectives: string[];
}

export interface Flashcard {
  id: string;
  topicId: string;
  domainId: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Question {
  id: string;
  topicId: string;
  domainId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface StudyContent {
  id: string;
  topicId: string;
  domainId: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  docLinks: string[];
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  explanation: string;
}

// Spaced Repetition System (SM-2 Algorithm)
export interface CardProgress {
  cardId: string;
  easeFactor: number; // Default 2.5
  interval: number; // Days until next review
  repetitions: number;
  nextReview: Date;
  lastReview: Date | null;
}

export interface QuizResult {
  questionId: string;
  correct: boolean;
  selectedAnswer: number;
  timestamp: Date;
}

export interface UserProgress {
  totalFlashcardsStudied: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  domainProgress: Record<string, DomainProgress>;
  studyStreak: number;
  lastStudyDate: string | null;
  cardProgress: Record<string, CardProgress>;
  quizHistory: QuizResult[];
}

export interface DomainProgress {
  flashcardsStudied: number;
  questionsAnswered: number;
  correctAnswers: number;
  masteryLevel: number; // 0-100
}

export type StudyMode = 'flashcards' | 'quiz' | 'study' | 'review';

export interface StudySession {
  mode: StudyMode;
  domainId?: string;
  topicId?: string;
  startTime: Date;
  cardsStudied: number;
  questionsAnswered: number;
  correctAnswers: number;
}
