'use client';

import { useState } from 'react';
import { Flashcard } from '@/types';
import ReactMarkdown from 'react-markdown';

interface FlashcardViewerProps {
  flashcard: Flashcard;
  onRate: (quality: number) => void;
  showProgress?: { current: number; total: number };
}

export default function FlashcardViewer({
  flashcard,
  onRate,
  showProgress,
}: FlashcardViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (quality: number) => {
    setIsFlipped(false);
    onRate(quality);
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  return (
    <div className="w-full max-w-full md:max-w-3xl mx-auto">
      {showProgress && (
        <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
          <span>
            Card {showProgress.current}/{showProgress.total}
          </span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {flashcard.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {flashcard.tags.length > 2 && (
              <span className="px-1.5 py-0.5 text-gray-400 text-xs">
                +{flashcard.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      <div
        className="relative cursor-pointer perspective-1000 min-h-[240px] sm:min-h-[320px] md:min-h-[400px]"
        onClick={handleFlip}
      >
        <div
          className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 backface-hidden ${
              isFlipped ? 'invisible' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  difficultyColors[flashcard.difficulty]
                }`}
              >
                {flashcard.difficulty === 'easy'
                  ? 'Fácil'
                  : flashcard.difficulty === 'medium'
                  ? 'Médio'
                  : 'Difícil'}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm">
                Toque para ver
              </span>
            </div>

            <div className="flex items-center justify-center h-40 sm:h-52 md:h-64">
              <p className="text-base sm:text-xl text-gray-800 text-center leading-relaxed">
                {flashcard.front}
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 backface-hidden rotate-y-180 overflow-auto ${
              !isFlipped ? 'invisible' : ''
            }`}
          >
            <div className="prose prose-sm max-w-none text-sm sm:text-base">
              <ReactMarkdown
                components={{
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs sm:text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                        <code {...props}>{children}</code>
                      </pre>
                    );
                  },
                  pre: ({ children }) => <>{children}</>,
                }}
              >
                {flashcard.back}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3 sm:gap-4">
          <p className="text-gray-600 text-xs sm:text-sm">
            Como foi sua lembrança?
          </p>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleRate(1)}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-red-600 transition-colors"
            >
              Difícil
            </button>
            <button
              onClick={() => handleRate(3)}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-yellow-600 transition-colors"
            >
              Médio
            </button>
            <button
              onClick={() => handleRate(5)}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-green-600 transition-colors"
            >
              Fácil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
