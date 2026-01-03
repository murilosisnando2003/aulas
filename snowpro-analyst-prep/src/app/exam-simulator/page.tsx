'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { domains } from '@/data/domains';
import { allQuestions, getExamQuestions, getQuestionStats } from '@/data/questions';
import { Question } from '@/types';

// Constantes do exame real DAA-C01
const EXAM_CONFIG = {
  totalQuestions: 65,
  timeMinutes: 115,
  passingScore: 75, // 75% = 750/1000 scaled
  examCode: 'DAA-C01',
  examName: 'SnowPro Advanced: Data Analyst',
};

interface ExamAnswer {
  questionId: string;
  selectedAnswer: number | null;
  flagged: boolean;
}

export default function ExamSimulatorPage() {
  const { recordQuizAnswer } = useProgress();
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Map<string, ExamAnswer>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_CONFIG.timeMinutes * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Timer
  useEffect(() => {
    if (!isStarted || isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isComplete]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Fisher-Yates shuffle para opções
  const shuffleOptions = <T,>(array: T[]): T[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const startExam = () => {
    // Usa seed baseado no timestamp para garantir aleatoriedade única
    const seed = Date.now();
    console.log(`[Simulado] Nova sessão iniciada - Seed: ${seed}`);
    
    // Seleciona questões com distribuição proporcional aos pesos do exame real
    const selectedQuestions = getExamQuestions(EXAM_CONFIG.totalQuestions);
    
    console.log(`[Simulado] ${selectedQuestions.length} questões selecionadas de ${allQuestions.length} disponíveis`);
    
    // Embaralha as opções de cada questão com Fisher-Yates para maior randomização
    const shuffledQuestions = selectedQuestions.map((q) => {
      const optionsWithIndex = q.options.map((opt, idx) => ({ opt, idx }));
      const shuffled = shuffleOptions(optionsWithIndex);
      const newCorrectAnswer = shuffled.findIndex((o) => o.idx === q.correctAnswer);
      return {
        ...q,
        options: shuffled.map((o) => o.opt),
        correctAnswer: newCorrectAnswer,
      };
    });

    // Registra IDs das questões deste simulado no localStorage para tracking
    const viewedIds = JSON.parse(localStorage.getItem('viewedQuestionIds') || '[]');
    const newViewedIds = [...new Set([...viewedIds, ...shuffledQuestions.map(q => q.id)])];
    localStorage.setItem('viewedQuestionIds', JSON.stringify(newViewedIds));
    
    console.log(`[Simulado] Total de questões vistas até agora: ${newViewedIds.length}/${allQuestions.length}`);

    setExamQuestions(shuffledQuestions);
    setAnswers(new Map());
    setCurrentIndex(0);
    setTimeRemaining(EXAM_CONFIG.timeMinutes * 60);
    setIsStarted(true);
    setIsComplete(false);
    setShowReview(false);
  };

  const selectAnswer = (answer: number) => {
    const question = examQuestions[currentIndex];
    const newAnswers = new Map(answers);
    newAnswers.set(question.id, {
      questionId: question.id,
      selectedAnswer: answer,
      flagged: answers.get(question.id)?.flagged || false,
    });
    setAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const question = examQuestions[currentIndex];
    const newAnswers = new Map(answers);
    const current = answers.get(question.id);
    newAnswers.set(question.id, {
      questionId: question.id,
      selectedAnswer: current?.selectedAnswer ?? null,
      flagged: !current?.flagged,
    });
    setAnswers(newAnswers);
  };

  const finishExam = useCallback(() => {
    setIsComplete(true);

    // Registrar respostas no progresso
    examQuestions.forEach((q) => {
      const answer = answers.get(q.id);
      if (answer?.selectedAnswer !== null && answer?.selectedAnswer !== undefined) {
        const isCorrect = answer.selectedAnswer === q.correctAnswer;
        recordQuizAnswer(q.id, q.domainId, isCorrect, answer.selectedAnswer);
      }
    });
  }, [examQuestions, answers, recordQuizAnswer]);

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    examQuestions.forEach((q) => {
      const answer = answers.get(q.id);
      if (answer?.selectedAnswer === null || answer?.selectedAnswer === undefined) {
        unanswered++;
      } else if (answer.selectedAnswer === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const percentage = Math.round((correct / examQuestions.length) * 100);
    const passed = percentage >= EXAM_CONFIG.passingScore;

    return { correct, incorrect, unanswered, percentage, passed };
  };

  const getAnsweredCount = () => {
    return Array.from(answers.values()).filter(
      (a) => a.selectedAnswer !== null && a.selectedAnswer !== undefined
    ).length;
  };

  const getFlaggedCount = () => {
    return Array.from(answers.values()).filter((a) => a.flagged).length;
  };

  // Estado para estatísticas de cobertura
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const stats = getQuestionStats();
  const coveragePercent = Math.round((viewedIds.length / stats.total) * 100);

  // Carrega IDs vistos do localStorage após montagem
  useEffect(() => {
    const stored = localStorage.getItem('viewedQuestionIds');
    if (stored) {
      setViewedIds(JSON.parse(stored));
    }
  }, []);

  // Intro Screen - Mobile Optimized
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-blue-500/20 rounded-full mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-10 sm:h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Simulado Oficial
                </h1>
                <p className="text-blue-200 text-sm sm:text-lg">
                  {EXAM_CONFIG.examCode} - <span className="hidden sm:inline">{EXAM_CONFIG.examName}</span><span className="sm:hidden">Data Analyst</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{EXAM_CONFIG.totalQuestions}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Questões</div>
                </div>
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{EXAM_CONFIG.timeMinutes}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Minutos</div>
                </div>
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{EXAM_CONFIG.passingScore}%</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Para Aprovação</div>
                </div>
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">${375}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Custo Real</div>
                </div>
              </div>

              {/* Estatísticas de Cobertura */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-8">
                <h3 className="font-semibold text-green-300 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Cobertura do Banco
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-green-200/80 text-xs">Total Disponível</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{viewedIds.length}</div>
                    <div className="text-green-200/80 text-xs">Questões Vistas</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-200/80">Progresso</span>
                    <span className="text-green-300 font-medium">{coveragePercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${coveragePercent}%` }}
                    />
                  </div>
                </div>
                <p className="text-green-200/60 text-xs mt-2 hidden sm:block">
                  🔄 Cada simulado gera questões 100% aleatórias com distribuição proporcional aos pesos do exame real.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-8">
                <h3 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Antes de Começar
                </h3>
                <ul className="text-yellow-200/80 text-xs sm:text-sm space-y-1">
                  <li>• Timer começa imediatamente</li>
                  <li>• Marque questões para revisão</li>
                  <li>• Questões sem resposta = erradas</li>
                  <li className="hidden sm:block">• Não há pausas - planeje seu tempo</li>
                  <li>• <strong>Questões aleatórias</strong> a cada simulado</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-8">
                <h3 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">Distribuição por Domínio</h3>
                <div className="space-y-1 sm:space-y-2">
                  {domains.map((d) => (
                    <div key={d.id} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-blue-200/80 truncate mr-2">{d.name}</span>
                      <span className="text-white font-medium flex-shrink-0">{d.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 sm:gap-4">
                <Link
                  href="/"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white rounded-lg font-medium text-center text-sm sm:text-base hover:bg-white/20 transition-colors"
                >
                  ← Voltar
                </Link>
                <button
                  onClick={startExam}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold text-sm sm:text-lg hover:bg-blue-700 transition-colors"
                >
                  Iniciar ▶
                </button>
              </div>
              
              {viewedIds.length > 0 && (
                <button
                  onClick={() => {
                    localStorage.removeItem('viewedQuestionIds');
                    window.location.reload();
                  }}
                  className="w-full mt-3 sm:mt-4 px-4 py-2 bg-red-500/10 text-red-300 rounded-lg text-xs sm:text-sm hover:bg-red-500/20 transition-colors border border-red-500/30"
                >
                  🔄 Resetar Progresso
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen - Mobile Optimized
  if (isComplete && !showReview) {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-8 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 ${
                results.passed ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {results.passed ? (
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                {results.passed ? 'Parabéns! Você passou!' : 'Continue estudando!'}
              </h1>
              <p className={`text-base sm:text-xl font-semibold mb-4 sm:mb-8 ${
                results.passed ? 'text-green-400' : 'text-red-400'
              }`}>
                {results.passed
                  ? 'Você está preparado para o exame real!'
                  : 'Revise os domínios com mais erros.'}
              </p>

              <div className="text-5xl sm:text-7xl font-bold text-white mb-1 sm:mb-2">
                {results.percentage}%
              </div>
              <p className="text-blue-200 mb-4 sm:mb-8 text-sm sm:text-base">
                {results.correct} de {examQuestions.length} corretas
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl p-2 sm:p-4">
                  <div className="text-xl sm:text-3xl font-bold text-green-400">{results.correct}</div>
                  <div className="text-green-200/80 text-xs sm:text-sm">Corretas</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl p-2 sm:p-4">
                  <div className="text-xl sm:text-3xl font-bold text-red-400">{results.incorrect}</div>
                  <div className="text-red-200/80 text-xs sm:text-sm">Incorretas</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-2 sm:p-4">
                  <div className="text-xl sm:text-3xl font-bold text-yellow-400">{results.unanswered}</div>
                  <div className="text-yellow-200/80 text-xs sm:text-sm">Sem resp.</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-8 text-sm sm:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Tempo utilizado</span>
                  <span className="text-white font-medium">
                    {formatTime(EXAM_CONFIG.timeMinutes * 60 - timeRemaining)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-200">Pontuação mínima</span>
                  <span className="text-white font-medium">{EXAM_CONFIG.passingScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 sm:justify-center">
                <button
                  onClick={() => setShowReview(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 transition-colors"
                >
                  Revisar
                </button>
                <button
                  onClick={startExam}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-green-700 transition-colors"
                >
                  Novo Simulado
                </button>
                <Link
                  href="/flashcards"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-purple-700 transition-colors text-center"
                >
                  Flashcards
                </Link>
                <Link
                  href="/"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-white/20 transition-colors text-center"
                >
                  Início
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review Screen - Mobile Optimized
  if (showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Revisão do Simulado</h1>
              <button
                onClick={() => setShowReview(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                ← Voltar aos Resultados
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {examQuestions.map((q, idx) => {
                const answer = answers.get(q.id);
                const isCorrect = answer?.selectedAnswer === q.correctAnswer;
                const wasAnswered = answer?.selectedAnswer !== null && answer?.selectedAnswer !== undefined;

                return (
                  <div
                    key={q.id}
                    className={`bg-white/10 backdrop-blur-lg rounded-xl border p-4 sm:p-6 ${
                      wasAnswered
                        ? isCorrect
                          ? 'border-green-500/30'
                          : 'border-red-500/30'
                        : 'border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                        wasAnswered
                          ? isCorrect
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                            <div
                              key={optIdx}
                              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                                optIdx === q.correctAnswer
                                  ? 'bg-green-500/20 border border-green-500/50 text-green-200'
                                  : answer?.selectedAnswer === optIdx && optIdx !== q.correctAnswer
                                  ? 'bg-red-500/20 border border-red-500/50 text-red-200'
                                  : 'bg-white/5 text-gray-300'
                              }`}
                            >
                              <span className="font-medium mr-1 sm:mr-2">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className="break-words">{opt}</span>
                              {optIdx === q.correctAnswer && (
                                <span className="ml-1 sm:ml-2 text-green-400 text-xs">✓</span>
                              )}
                              {answer?.selectedAnswer === optIdx && optIdx !== q.correctAnswer && (
                                <span className="ml-1 sm:ml-2 text-red-400 text-xs">✗</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <p className="text-blue-200 text-xs sm:text-sm">
                            <strong className="text-blue-300">Explicação:</strong> {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={() => setShowReview(false)}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Voltar aos Resultados
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam in Progress
  const currentQuestion = examQuestions[currentIndex];
  const currentAnswer = answers.get(currentQuestion?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header - Mobile Optimized */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Mobile: Stack layout / Desktop: Row layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {/* Top row mobile: Question number + Timer */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden sm:inline text-blue-200 text-sm">
                  {EXAM_CONFIG.examCode}
                </span>
                <div className="hidden sm:block h-4 w-px bg-white/20" />
                <span className="text-white font-medium text-sm sm:text-base">
                  {currentIndex + 1}/{examQuestions.length}
                </span>
              </div>

              {/* Timer - Always visible */}
              <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-mono text-base sm:text-lg font-bold ${
                timeRemaining < 300 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
              }`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Stats - Compact on mobile */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <span className="text-green-400">
                ✓ {getAnsweredCount()}
              </span>
              <span className="text-yellow-400">
                ⚑ {getFlaggedCount()}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-1 mt-2 sm:mt-3">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-8">
            {/* Question */}
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm sm:text-base">
                {currentIndex + 1}
              </div>
              <p className="text-white text-base sm:text-lg leading-relaxed">{currentQuestion?.question}</p>
            </div>

            {/* Options - Mobile Optimized */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {currentQuestion?.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={`w-full text-left px-3 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border transition-all ${
                    currentAnswer?.selectedAnswer === idx
                      ? 'bg-blue-500/20 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 text-xs sm:text-sm font-medium mr-2 sm:mr-4">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base">{option}</span>
                </button>
              ))}
            </div>

            {/* Actions - Mobile Stack */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-4 sm:pt-6 gap-3 sm:gap-0">
              {/* Flag button */}
              <button
                onClick={toggleFlag}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                  currentAnswer?.flagged
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={currentAnswer?.flagged ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                {currentAnswer?.flagged ? 'Marcada' : 'Marcar'}
              </button>

              {/* Navigation buttons */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Anterior
                </button>

                {currentIndex < examQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 transition-colors"
                  >
                    Próxima →
                  </button>
                ) : (
                  <button
                    onClick={finishExam}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-green-700 transition-colors"
                  >
                    Finalizar ✓
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator - Mobile Optimized */}
          <div className="mt-4 sm:mt-8 bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6">
            <h3 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">Navegação</h3>
            <div className="grid grid-cols-7 xs:grid-cols-9 sm:grid-cols-11 md:grid-cols-13 gap-1.5 sm:gap-2">
              {examQuestions.map((q, idx) => {
                const answer = answers.get(q.id);
                const isAnswered = answer?.selectedAnswer !== null && answer?.selectedAnswer !== undefined;
                const isFlagged = answer?.flagged;
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`aspect-square w-full max-w-[36px] rounded text-xs sm:text-sm font-medium transition-all ${
                      isCurrent
                        ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-slate-900'
                        : ''
                    } ${
                      isFlagged
                        ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50'
                        : isAnswered
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-6 mt-3 sm:mt-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-green-500/20" />
                <span>Respondida</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-yellow-500/30 border border-yellow-500/50" />
                <span>Marcada</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-white/10" />
                <span>Não respondida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

