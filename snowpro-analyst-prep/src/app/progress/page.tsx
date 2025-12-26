'use client';

import { useProgress } from '@/hooks/useProgress';
import { domains } from '@/data/domains';
import { allFlashcards as flashcards } from '@/data/flashcards';
import ProgressCard from '@/components/ProgressCard';

export default function ProgressPage() {
  const { progress, isLoading, getOverallMastery, getDomainMastery, resetProgress } =
    useProgress();

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

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      resetProgress();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seu Progresso</h1>
          <p className="text-gray-600">
            Acompanhe sua evolução na preparação para o exame.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          Resetar Progresso
        </button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ProgressCard
          title="Domínio Geral"
          value={`${overallMastery}%`}
          subtitle="Meta: 100%"
          color="bg-blue-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <ProgressCard
          title="Flashcards"
          value={`${progress?.totalFlashcardsStudied || 0}/${flashcards.length}`}
          subtitle={`${Math.round(((progress?.totalFlashcardsStudied || 0) / flashcards.length) * 100)}% concluído`}
          color="bg-green-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <ProgressCard
          title="Taxa de Acerto"
          value={`${accuracy}%`}
          subtitle={`${progress?.correctAnswers || 0} de ${progress?.totalQuestionsAnswered || 0}`}
          color="bg-purple-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
        <ProgressCard
          title="Sequência"
          value={progress?.studyStreak || 0}
          subtitle="dias consecutivos"
          color="bg-orange-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          }
        />
      </div>

      {/* Exam Readiness */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Prontidão para o Exame
        </h2>
        <div className="flex items-center gap-8 mb-6">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={overallMastery >= 75 ? '#22c55e' : overallMastery >= 50 ? '#eab308' : '#ef4444'}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${overallMastery * 3.52} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{overallMastery}%</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {overallMastery >= 75
                ? 'Pronto para o exame!'
                : overallMastery >= 50
                ? 'Quase lá!'
                : 'Continue estudando'}
            </h3>
            <p className="text-gray-600">
              {overallMastery >= 75
                ? 'Você demonstra conhecimento sólido. Considere agendar o exame!'
                : overallMastery >= 50
                ? 'Bom progresso! Revise os domínios com menor pontuação.'
                : 'Continue praticando flashcards e quizzes para melhorar seu domínio.'}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-900 font-medium">Dica de Estudo</p>
              <p className="text-blue-700 text-sm">
                O exame SnowPro Advanced: Data Analyst requer pontuação mínima de 750/1000 (aproximadamente 75%). 
                Foque nos domínios com maior peso: Data Analysis & Transformation (25%) e SQL & Query Fundamentals (20%).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Progresso por Domínio
        </h2>
        <div className="space-y-6">
          {domains.map((domain) => {
            const mastery = getDomainMastery(domain.id);
            const domainProgress = progress?.domainProgress[domain.id];

            return (
              <div key={domain.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: domain.color }}
                    >
                      {domain.weight}%
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{domain.name}</h3>
                      <p className="text-sm text-gray-500">
                        {domainProgress?.flashcardsStudied || 0} flashcards • {' '}
                        {domainProgress?.questionsAnswered || 0} questões
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{mastery}%</div>
                    {domainProgress?.questionsAnswered ? (
                      <p className="text-sm text-gray-500">
                        {Math.round((domainProgress.correctAnswers / domainProgress.questionsAnswered) * 100)}% acerto
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${mastery}%`,
                      backgroundColor: domain.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
