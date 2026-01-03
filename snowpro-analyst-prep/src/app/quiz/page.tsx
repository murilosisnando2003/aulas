'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { domains } from '@/data/domains';
import { allQuestions as questions, getQuestionsByDomain, getRandomQuestions } from '@/data/questions';
import QuizQuestion from '@/components/QuizQuestion';
import { Question } from '@/types';

function QuizContent() {
  const searchParams = useSearchParams();
  const domainId = searchParams.get('domain');

  const { recordQuizAnswer } = useProgress();
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState<string>(domainId || 'all');
  const [questionCount, setQuestionCount] = useState(10);
  const [customCount, setCustomCount] = useState('');
  const [shuffleOptions, setShuffleOptions] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });

  const startQuiz = useCallback(() => {
    let selected =
      selectedDomain === 'all'
        ? getRandomQuestions(questionCount)
        : getRandomQuestions(questionCount, selectedDomain);
    
    // Embaralha as opções de cada questão se habilitado
    if (shuffleOptions) {
      selected = selected.map((q) => {
        const optionsWithIndex = q.options.map((opt, idx) => ({ opt, idx }));
        const shuffled = [...optionsWithIndex].sort(() => Math.random() - 0.5);
        const newCorrectAnswer = shuffled.findIndex((o) => o.idx === q.correctAnswer);
        return {
          ...q,
          options: shuffled.map((o) => o.opt),
          correctAnswer: newCorrectAnswer,
        };
      });
    }
    
    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setIsStarted(true);
    setIsComplete(false);
    setSessionStats({ correct: 0, incorrect: 0 });
  }, [selectedDomain, questionCount, shuffleOptions]);

  const handleAnswer = (selectedAnswer: number, correct: boolean) => {
    const currentQuestion = currentQuestions[currentIndex];
    recordQuizAnswer(
      currentQuestion.id,
      currentQuestion.domainId,
      correct,
      selectedAnswer
    );

    setSessionStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }));

    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setIsStarted(false);
    setIsComplete(false);
    setCurrentIndex(0);
    setSessionStats({ correct: 0, incorrect: 0 });
  };

  // Quiz Setup Screen
  if (!isStarted) {
    const availableQuestions =
      selectedDomain === 'all'
        ? questions.length
        : getQuestionsByDomain(selectedDomain).length;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Configurar Quiz
            </h1>

            <div className="space-y-6">
              {/* Domain Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domínio
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os Domínios ({questions.length} questões)</option>
                  {domains.map((domain) => {
                    const count = getQuestionsByDomain(domain.id).length;
                    return (
                      <option key={domain.id} value={domain.id}>
                        {domain.name} ({count} questões)
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Question Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Questões
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[5, 10, 20, 30, 50].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setQuestionCount(Math.min(count, availableQuestions));
                        setCustomCount('');
                      }}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                        questionCount === count && !customCount
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${count > availableQuestions ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={count > availableQuestions}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                
                {/* Custom count input */}
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max={availableQuestions}
                    value={customCount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomCount(val);
                      const num = parseInt(val, 10);
                      if (!isNaN(num) && num > 0 && num <= availableQuestions) {
                        setQuestionCount(num);
                      }
                    }}
                    placeholder="Ou digite um número..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    Máx: {availableQuestions}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {availableQuestions} questões disponíveis | Selecionadas: <strong>{questionCount}</strong>
                </p>
              </div>

              {/* Shuffle Options */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleOptions}
                    onChange={(e) => setShuffleOptions(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Embaralhar ordem das alternativas
                  </span>
                </label>
                <span className="text-xs text-gray-500">
                  (recomendado para simular prova real)
                </span>
              </div>

              {/* Start Button */}
              <button
                onClick={startQuiz}
                disabled={availableQuestions === 0}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Iniciar Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Complete Screen
  if (isComplete) {
    const percentage = Math.round(
      (sessionStats.correct / currentQuestions.length) * 100
    );
    const passed = percentage >= 75;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {passed ? (
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
              ) : (
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Completo!
            </h1>
            <p className={`text-xl font-semibold mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Parabéns! Você passou!' : 'Continue estudando!'}
            </p>

            <div className="text-6xl font-bold text-gray-900 mb-2">
              {percentage}%
            </div>
            <p className="text-gray-500 mb-8">
              {sessionStats.correct} de {currentQuestions.length} corretas
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {sessionStats.correct}
                </div>
                <div className="text-sm text-green-700">Corretas</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-600">
                  {sessionStats.incorrect}
                </div>
                <div className="text-sm text-red-700">Incorretas</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-8">
              <p className="text-blue-700 text-sm">
                {passed
                  ? 'O exame SnowPro requer 75% para aprovação. Você está no caminho certo!'
                  : 'O exame SnowPro requer 75% para aprovação. Revise os flashcards e tente novamente!'}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Novo Quiz
              </button>
              <Link
                href="/exam-simulator"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Simulado Real (65 questões)
              </Link>
              <Link
                href="/flashcards"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Estudar Flashcards
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

  // Quiz in Progress
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz</h1>
          <p className="text-gray-600">
            {selectedDomain === 'all'
              ? 'Todos os domínios'
              : domains.find((d) => d.id === selectedDomain)?.name}
          </p>
        </div>

        <button
          onClick={resetQuiz}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Cancelar
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Progresso</span>
          <span>
            {sessionStats.correct} corretas / {currentIndex} respondidas
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <QuizQuestion
        question={currentQuestions[currentIndex]}
        onAnswer={handleAnswer}
        showProgress={{
          current: currentIndex + 1,
          total: currentQuestions.length,
        }}
      />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
