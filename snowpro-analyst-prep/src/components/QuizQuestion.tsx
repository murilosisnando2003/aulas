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
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  const getOptionClass = (index: number) => {
    const baseClass =
      'w-full p-4 rounded-lg border-2 text-left transition-all';

    if (!showResult) {
      if (selectedAnswer === index) {
        return `${baseClass} border-blue-500 bg-blue-50`;
      }
      return `${baseClass} border-gray-200 hover:border-blue-300 hover:bg-gray-50`;
    }

    // Show results
    if (index === question.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    return `${baseClass} border-gray-200 bg-gray-50 opacity-50`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {showProgress && (
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Questão {showProgress.current} de {showProgress.total}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
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

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={getOptionClass(index)}
              disabled={showResult}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-700">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <svg
                    className="w-5 h-5 text-green-600"
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
                  <span className="font-semibold text-green-700">
                    Correto!
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 text-red-600"
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
                  <span className="font-semibold text-red-700">
                    Incorreto
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-700 text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verificar Resposta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Próxima Questão
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
