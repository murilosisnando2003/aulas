'use client';

import { useState } from 'react';
import { Question } from '@/types';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (selectedAnswer: number, correct: boolean) => void;
  showProgress?: { current: number; total: number };
}

export default function QuizQuestion({
  question,
  onAnswer,
  showProgress,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    onAnswer(selectedAnswer, isCorrect);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 border border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    hard: 'bg-red-100 text-red-800 border border-red-300',
  };

  const getOptionClass = (index: number) => {
    const baseClass =
      'w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all';

    if (!showResult) {
      if (selectedAnswer === index) {
        return `${baseClass} border-blue-500 bg-blue-50`;
      }
      return `${baseClass} border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50`;
    }

    // Show results
    if (index === question.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    return `${baseClass} border-slate-200 bg-slate-50 opacity-50`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {showProgress && (
        <div className="mb-3 sm:mb-4 flex items-center justify-between text-xs sm:text-sm text-slate-600">
          <span className="font-semibold">
            {showProgress.current}/{showProgress.total}
          </span>
          <span
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
              difficultyColors[question.difficulty]
            }`}
          >
            {question.difficulty === 'easy'
              ? 'Fácil'
              : question.difficulty === 'medium'
              ? 'Médio'
              : 'Difícil'}
          </span>
        </div>
      )}

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-8">
        <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
          {question.question}
        </h3>

        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={getOptionClass(index)}
              disabled={showResult}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-700">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-slate-800 text-sm sm:text-base">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div
            className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-red-50 border-2 border-red-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-bold text-green-700 text-sm sm:text-base">
                    Correto!
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="font-bold text-red-700 text-sm sm:text-base">
                    Incorreto
                  </span>
                </>
              )}
            </div>
            <p className="text-slate-700 text-xs sm:text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-bold text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-bold text-sm sm:text-base hover:bg-blue-700 transition-colors shadow-sm"
            >
              Próxima →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
