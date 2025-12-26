import { UserProgress, CardProgress } from '@/types';

const STORAGE_KEY = 'snowpro-analyst-progress';

const defaultProgress: UserProgress = {
  totalFlashcardsStudied: 0,
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  domainProgress: {},
  studyStreak: 0,
  lastStudyDate: null,
  cardProgress: {},
  quizHistory: [],
};

export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProgress;
    
    const parsed = JSON.parse(stored);
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const updateStudyStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (progress.lastStudyDate === today) {
    return progress;
  }
  
  const newStreak = progress.lastStudyDate === yesterday 
    ? progress.studyStreak + 1 
    : 1;
    
  return {
    ...progress,
    studyStreak: newStreak,
    lastStudyDate: today,
  };
};

export const resetProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

// SM-2 Spaced Repetition Algorithm
export const calculateNextReview = (
  cardProgress: CardProgress,
  quality: number // 0-5, where 5 is perfect recall
): CardProgress => {
  // Quality mapping: 0-1 = hard, 2-3 = medium, 4-5 = easy
  const now = new Date();
  
  let { easeFactor, interval, repetitions } = cardProgress;
  
  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response - reset
    repetitions = 0;
    interval = 1;
  }
  
  // Update ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
  
  return {
    ...cardProgress,
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastReview: now,
  };
};

export const getCardsForReview = (
  cardProgress: Record<string, CardProgress>,
  allCardIds: string[]
): string[] => {
  const now = new Date();
  
  const dueCards = allCardIds.filter((cardId) => {
    const progress = cardProgress[cardId];
    if (!progress) return true; // New card
    return new Date(progress.nextReview) <= now;
  });
  
  return dueCards;
};

export const initializeCardProgress = (cardId: string): CardProgress => ({
  cardId,
  easeFactor: 2.5,
  interval: 0,
  repetitions: 0,
  nextReview: new Date(),
  lastReview: null,
});
