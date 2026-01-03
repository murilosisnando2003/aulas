'use client';

import { Suspense, useReducer } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { domains } from '@/data/domains';
import { allFlashcards as flashcards, getFlashcardsByDomain } from '@/data/flashcards';
import FlashcardViewer from '@/components/FlashcardViewer';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getCards(domain: string) {
  const cards = domain === 'all' ? [...flashcards] : getFlashcardsByDomain(domain);
  return shuffleArray(cards);
}

interface FlashcardState {
  cards: ReturnType<typeof getCards>;
  currentIndex: number;
  isComplete: boolean;
  sessionStats: { studied: number; easy: number; medium: number; hard: number };
  selectedDomain: string;
}

type FlashcardAction =
  | { type: 'SHUFFLE'; domain: string }
  | { type: 'RATE'; quality: number }
  | { type: 'CHANGE_DOMAIN'; domain: string };

function flashcardReducer(state: FlashcardState, action: FlashcardAction): FlashcardState {
  switch (action.type) {
    case 'SHUFFLE':
      return {
        ...state,
        cards: getCards(action.domain),
        currentIndex: 0,
        isComplete: false,
        sessionStats: { studied: 0, easy: 0, medium: 0, hard: 0 },
      };
    case 'RATE': {
      const newStats = {
        studied: state.sessionStats.studied + 1,
        easy: state.sessionStats.easy + (action.quality >= 4 ? 1 : 0),
        medium: state.sessionStats.medium + (action.quality >= 2 && action.quality < 4 ? 1 : 0),
        hard: state.sessionStats.hard + (action.quality < 2 ? 1 : 0),
      };
      if (state.currentIndex < state.cards.length - 1) {
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
          sessionStats: newStats,
        };
      }
      return {
        ...state,
        isComplete: true,
        sessionStats: newStats,
      };
    }
    case 'CHANGE_DOMAIN':
      return {
        ...state,
        selectedDomain: action.domain,
        cards: getCards(action.domain),
        currentIndex: 0,
        isComplete: false,
        sessionStats: { studied: 0, easy: 0, medium: 0, hard: 0 },
      };
    default:
      return state;
  }
}

function FlashcardsContent() {
  const searchParams = useSearchParams();
  const domainId = searchParams.get('domain');

  const { recordFlashcardStudy } = useProgress();

  const [state, dispatch] = useReducer(flashcardReducer, {
    cards: [],
    currentIndex: 0,
    isComplete: false,
    sessionStats: { studied: 0, easy: 0, medium: 0, hard: 0 },
    selectedDomain: domainId || 'all',
  }, (initial) => ({
    ...initial,
    cards: getCards(initial.selectedDomain),
  }));

  const handleRate = (quality: number) => {
    const currentCard = state.cards[state.currentIndex];
    recordFlashcardStudy(currentCard.id, currentCard.domainId, quality);
    dispatch({ type: 'RATE', quality });
  };

  const handleShuffle = () => {
    dispatch({ type: 'SHUFFLE', domain: state.selectedDomain });
  };

  const handleDomainChange = (newDomain: string) => {
    dispatch({ type: 'CHANGE_DOMAIN', domain: newDomain });
  };

  if (state.cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Nenhum flashcard disponível
          </h1>
          <Link href="/domains" className="text-blue-600 hover:underline font-medium">
            Voltar para domínios
          </Link>
        </div>
      </div>
    );
  }

  // Complete Screen - Mobile Optimized
  if (state.isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 border border-slate-200">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-green-600"
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
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-4">
                Sessão Completa!
              </h1>
              <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Você estudou {state.sessionStats.studied} flashcards.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
                <div className="bg-green-50 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-green-200">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {state.sessionStats.easy}
                  </div>
                  <div className="text-xs sm:text-sm text-green-700 font-medium">Fáceis</div>
                </div>
                <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-yellow-200">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                    {state.sessionStats.medium}
                  </div>
                  <div className="text-xs sm:text-sm text-yellow-700 font-medium">Médios</div>
                </div>
                <div className="bg-red-50 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-red-200">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">
                    {state.sessionStats.hard}
                  </div>
                  <div className="text-xs sm:text-sm text-red-700 font-medium">Difíceis</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-4">
                <button
                  onClick={handleShuffle}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 transition-colors"
                >
                  Estudar Novamente
                </button>
                <Link
                  href="/quiz"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-purple-700 transition-colors text-center"
                >
                  Fazer Quiz
                </Link>
                <Link
                  href="/"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-200 text-slate-700 rounded-lg font-medium text-sm sm:text-base hover:bg-slate-300 transition-colors text-center"
                >
                  Voltar ao Início
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Flashcard Screen - Mobile Optimized
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900">Flashcards</h1>
              <p className="text-slate-600 text-xs sm:text-base">
                Clique no card para ver a resposta.
              </p>
            </div>
            <button
              onClick={handleShuffle}
              className="flex-shrink-0 px-3 sm:px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm sm:text-base border border-slate-200 shadow-sm"
            >
              🔀 Embaralhar
            </button>
          </div>

          <select
            value={state.selectedDomain}
            onChange={(e) => handleDomainChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-300 rounded-lg bg-white text-slate-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="all">Todos os Domínios</option>
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.name}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
            <span>Progresso</span>
            <span className="font-medium">
              {state.currentIndex + 1} / {state.cards.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2">
            <div
              className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((state.currentIndex + 1) / state.cards.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <FlashcardViewer
          flashcard={state.cards[state.currentIndex]}
          onRate={handleRate}
          showProgress={{
            current: state.currentIndex + 1,
            total: state.cards.length,
          }}
        />
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <FlashcardsContent />
    </Suspense>
  );
}
