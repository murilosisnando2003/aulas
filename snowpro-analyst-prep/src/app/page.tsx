'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { domains } from '@/data/domains';
import { allFlashcards as flashcards } from '@/data/flashcards';
import { allQuestions as questions } from '@/data/questions';
import ProgressCard from '@/components/ProgressCard';
import DomainCard from '@/components/DomainCard';

export default function Home() {
  const { progress, isLoading, getOverallMastery, getDomainMastery } = useProgress();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const overallMastery = getOverallMastery();
  const accuracy =
    progress && progress.totalQuestionsAnswered > 0
      ? Math.round((progress.correctAnswers / progress.totalQuestionsAnswered) * 100)
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#29B5E8] to-[#0073B7] rounded-3xl p-8 md:p-12 text-white mb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            SnowPro Advanced: Data Analyst
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Prepare-se para a certificação com flashcards, quizzes e conteúdo
            baseado na documentação oficial da Snowflake.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/flashcards"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Começar Flashcards
            </Link>
            <Link
              href="/quiz"
              className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Fazer Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ProgressCard
          title="Domínio Geral"
          value={`${overallMastery}%`}
          subtitle="Nível de maestria"
          color="bg-blue-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <ProgressCard
          title="Flashcards Estudados"
          value={progress?.totalFlashcardsStudied || 0}
          subtitle={`de ${flashcards.length} disponíveis`}
          color="bg-green-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <ProgressCard
          title="Questões Respondidas"
          value={progress?.totalQuestionsAnswered || 0}
          subtitle={`${accuracy}% de acerto`}
          color="bg-purple-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ProgressCard
          title="Sequência de Estudos"
          value={progress?.studyStreak || 0}
          subtitle="dias consecutivos"
          color="bg-orange-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          }
        />
      </div>

      {/* Exam Info */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Sobre o Exame SnowPro Advanced: Data Analyst
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-2">Formato</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• 65 questões de múltipla escolha</li>
              <li>• 115 minutos de duração</li>
              <li>• Pontuação mínima: 750/1000</li>
              <li>• Exame supervisionado online</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h3 className="font-semibold text-green-900 mb-2">Pré-requisitos</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• SnowPro Core Certification</li>
              <li>• 2-3 anos experiência com dados</li>
              <li>• Conhecimento avançado de SQL</li>
              <li>• Experiência com Snowflake</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <h3 className="font-semibold text-purple-900 mb-2">Domínios</h3>
            <ul className="text-purple-700 text-sm space-y-1">
              {domains.map((domain) => (
                <li key={domain.id}>
                  • {domain.name} ({domain.weight}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Domains Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Domínios do Exame</h2>
          <Link
            href="/domains"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.slice(0, 3).map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              mastery={getDomainMastery(domain.id)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/flashcards" className="group">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flashcards
            </h3>
            <p className="text-gray-500">
              {flashcards.length} cards com spaced repetition para memorização eficiente.
            </p>
          </div>
        </Link>

        <Link href="/quiz" className="group">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-7 h-7 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz</h3>
            <p className="text-gray-500">
              {questions.length} questões no formato do exame para praticar.
            </p>
          </div>
        </Link>

        <Link href="/progress" className="group">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <svg
                className="w-7 h-7 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Progresso
            </h3>
            <p className="text-gray-500">
              Acompanhe seu progresso e identifique áreas para melhorar.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
