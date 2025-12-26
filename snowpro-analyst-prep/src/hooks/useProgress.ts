'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, QuizResult, DomainProgress } from '@/types';
import {
  loadProgress,
  saveProgress,
  updateStudyStreak,
  calculateNextReview,
  initializeCardProgress,
  resetProgress as resetStoredProgress,
} from '@/lib/storage';

// Lazy initializer for progress state
const getInitialProgress = (): { progress: UserProgress | null; isLoading: boolean } => {
  if (typeof window === 'undefined') {
    return { progress: null, isLoading: true };
  }
  return { progress: loadProgress(), isLoading: false };
};

export const useProgress = () => {
  const [state, setState] = useState(getInitialProgress);

  // Sync to localStorage when progress changes
  useEffect(() => {
    if (state.progress && !state.isLoading) {
      saveProgress(state.progress);
    }
  }, [state.progress, state.isLoading]);

  const recordFlashcardStudy = useCallback(
    (cardId: string, domainId: string, quality: number) => {
      setState((prevState) => {
        if (!prevState.progress) return prevState;

        const updatedProgress = updateStudyStreak(prevState.progress);

        // Update card progress with SM-2
        const existingCardProgress =
          updatedProgress.cardProgress[cardId] || initializeCardProgress(cardId);
        const newCardProgress = calculateNextReview(existingCardProgress, quality);

        // Update domain progress
        const domainProgress = updatedProgress.domainProgress[domainId] || {
          flashcardsStudied: 0,
          questionsAnswered: 0,
          correctAnswers: 0,
          masteryLevel: 0,
        };

        const isNewCard = !updatedProgress.cardProgress[cardId];

        return {
          ...prevState,
          progress: {
            ...updatedProgress,
            totalFlashcardsStudied: updatedProgress.totalFlashcardsStudied + (isNewCard ? 1 : 0),
            cardProgress: {
              ...updatedProgress.cardProgress,
              [cardId]: newCardProgress,
            },
            domainProgress: {
              ...updatedProgress.domainProgress,
              [domainId]: {
                ...domainProgress,
                flashcardsStudied: domainProgress.flashcardsStudied + (isNewCard ? 1 : 0),
                masteryLevel: calculateMasteryLevel({
                  ...domainProgress,
                  flashcardsStudied: domainProgress.flashcardsStudied + (isNewCard ? 1 : 0),
                }),
              },
            },
          },
        };
      });
    },
    []
  );

  const recordQuizAnswer = useCallback(
    (questionId: string, domainId: string, correct: boolean, selectedAnswer: number) => {
      setState((prevState) => {
        if (!prevState.progress) return prevState;

        const updatedProgress = updateStudyStreak(prevState.progress);

        const quizResult: QuizResult = {
          questionId,
          correct,
          selectedAnswer,
          timestamp: new Date(),
        };

        // Update domain progress
        const domainProgress = updatedProgress.domainProgress[domainId] || {
          flashcardsStudied: 0,
          questionsAnswered: 0,
          correctAnswers: 0,
          masteryLevel: 0,
        };

        const newDomainProgress: DomainProgress = {
          ...domainProgress,
          questionsAnswered: domainProgress.questionsAnswered + 1,
          correctAnswers: domainProgress.correctAnswers + (correct ? 1 : 0),
          masteryLevel: 0,
        };
        newDomainProgress.masteryLevel = calculateMasteryLevel(newDomainProgress);

        return {
          ...prevState,
          progress: {
            ...updatedProgress,
            totalQuestionsAnswered: updatedProgress.totalQuestionsAnswered + 1,
            correctAnswers: updatedProgress.correctAnswers + (correct ? 1 : 0),
            quizHistory: [...updatedProgress.quizHistory.slice(-999), quizResult],
            domainProgress: {
              ...updatedProgress.domainProgress,
              [domainId]: newDomainProgress,
            },
          },
        };
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    resetStoredProgress();
    setState({ progress: loadProgress(), isLoading: false });
  }, []);

  const getOverallMastery = useCallback((): number => {
    if (!state.progress) return 0;

    const domainIds = Object.keys(state.progress.domainProgress);
    if (domainIds.length === 0) return 0;

    const totalMastery = domainIds.reduce(
      (sum, id) => sum + (state.progress!.domainProgress[id]?.masteryLevel || 0),
      0
    );

    return Math.round(totalMastery / domainIds.length);
  }, [state.progress]);

  const getDomainMastery = useCallback(
    (domainId: string): number => {
      if (!state.progress) return 0;
      return state.progress.domainProgress[domainId]?.masteryLevel || 0;
    },
    [state.progress]
  );

  return {
    progress: state.progress,
    isLoading: state.isLoading,
    recordFlashcardStudy,
    recordQuizAnswer,
    resetProgress,
    getOverallMastery,
    getDomainMastery,
  };
};

const calculateMasteryLevel = (domainProgress: DomainProgress): number => {
  const { flashcardsStudied, questionsAnswered, correctAnswers } = domainProgress;

  // Weight: 40% flashcards, 60% quiz accuracy
  const flashcardScore = Math.min(100, flashcardsStudied * 5); // 20 flashcards = 100%
  const quizAccuracy =
    questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0;

  return Math.round(flashcardScore * 0.4 + quizAccuracy * 0.6);
};
