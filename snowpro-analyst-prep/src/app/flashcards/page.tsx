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
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Nenhum flashcard disponível
        </h1>
        <Link href="/domains" className="text-blue-600 hover:underline">
          Voltar para domínios
        </Link>
      </div>
    );
  }

  if (state.isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sessão Completa!
            </h1>
            <p className="text-gray-600 mb-6">
              Você estudou {state.sessionStats.studied} flashcards nesta sessão.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {state.sessionStats.easy}
                </div>
                <div className="text-sm text-green-700">Fáceis</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {state.sessionStats.medium}
                </div>
                <div className="text-sm text-yellow-700">Médios</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-600">
                  {state.sessionStats.hard}
                </div>
                <div className="text-sm text-red-700">Difíceis</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleShuffle}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Estudar Novamente
              </button>
              <Link
                href="/quiz"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Fazer Quiz
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
          <p className="text-gray-600">
            Clique no card para ver a resposta, depois avalie sua lembrança.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <select
            value={state.selectedDomain}
            onChange={(e) => handleDomainChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Domínios</option>
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleShuffle}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Embaralhar
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Progresso da sessão</span>
          <span>
            {state.currentIndex + 1} / {state.cards.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
