'use client';

import { use } from 'react';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { getDomainById } from '@/data/domains';
import { getFlashcardsByDomain } from '@/data/flashcards';
import { getQuestionsByDomain } from '@/data/questions';
import StudyContent from '@/components/StudyContent';

interface DomainPageProps {
  params: Promise<{ domainId: string }>;
}

export default function DomainPage({ params }: DomainPageProps) {
  const resolvedParams = use(params);
  const { getDomainMastery } = useProgress();

  const domain = getDomainById(resolvedParams.domainId);

  if (!domain) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Domínio não encontrado
        </h1>
        <Link href="/domains" className="text-blue-600 hover:underline">
          Voltar para domínios
        </Link>
      </div>
    );
  }

  const flashcards = getFlashcardsByDomain(domain.id);
  const questions = getQuestionsByDomain(domain.id);
  const mastery = getDomainMastery(domain.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/domains"
          className="text-blue-600 hover:underline text-sm mb-4 inline-block"
        >
          ← Voltar para domínios
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: domain.color }}
              >
                {domain.weight}%
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{domain.name}</h1>
            </div>
            <p className="text-gray-600">{domain.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{mastery}%</div>
            <div className="text-sm text-gray-500">Domínio</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">
            {domain.topics.length}
          </div>
          <div className="text-gray-500">Tópicos</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">
            {flashcards.length}
          </div>
          <div className="text-gray-500">Flashcards</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">
            {questions.length}
          </div>
          <div className="text-gray-500">Questões</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link
          href={`/flashcards?domain=${domain.id}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Estudar Flashcards
        </Link>
        <Link
          href={`/quiz?domain=${domain.id}`}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Fazer Quiz
        </Link>
      </div>

      {/* Topics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Tópicos</h2>
        {domain.topics.map((topic) => (
          <StudyContent key={topic.id} topic={topic} domainColor={domain.color} />
        ))}
      </div>
    </div>
  );
}
