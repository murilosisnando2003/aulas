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
    <div className="w-full max-w-3xl mx-auto">
      {showProgress && (
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Card {showProgress.current} de {showProgress.total}
          </span>
          <div className="flex gap-2">
            {flashcard.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className="relative cursor-pointer perspective-1000"
        onClick={handleFlip}
        style={{ minHeight: '400px' }}
      >
        <div
          className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 bg-white rounded-2xl shadow-lg p-8 backface-hidden ${
              isFlipped ? 'invisible' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  difficultyColors[flashcard.difficulty]
                }`}
              >
                {flashcard.difficulty === 'easy'
                  ? 'Fácil'
                  : flashcard.difficulty === 'medium'
                  ? 'Médio'
                  : 'Difícil'}
              </span>
              <span className="text-gray-400 text-sm">
                Clique para ver a resposta
              </span>
            </div>

            <div className="flex items-center justify-center h-64">
              <p className="text-xl text-gray-800 text-center leading-relaxed">
                {flashcard.front}
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 overflow-auto ${
              !isFlipped ? 'invisible' : ''
            }`}
          >
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
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
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-gray-600 text-sm">
            Como foi sua lembrança?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleRate(1)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Difícil
            </button>
            <button
              onClick={() => handleRate(3)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Médio
            </button>
            <button
              onClick={() => handleRate(5)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Fácil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
