'use client';

import { useProgress } from '@/hooks/useProgress';
import { domains } from '@/data/domains';
import DomainCard from '@/components/DomainCard';

export default function DomainsPage() {
  const { isLoading, getDomainMastery } = useProgress();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Domínios do Exame
        </h1>
        <p className="text-gray-600">
          A certificação SnowPro Advanced: Data Analyst cobre 6 domínios principais.
          Clique em cada domínio para ver os tópicos e estudar.
        </p>
      </div>

      {/* Weight Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Distribuição de Peso no Exame
        </h2>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: `${domain.color}20` }}
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: domain.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {domain.name.split(' ').slice(0, 2).join(' ')} ({domain.weight}%)
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden flex">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="h-full"
              style={{
                width: `${domain.weight}%`,
                backgroundColor: domain.color,
              }}
              title={`${domain.name}: ${domain.weight}%`}
            />
          ))}
        </div>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            mastery={getDomainMastery(domain.id)}
          />
        ))}
      </div>
    </div>
  );
}
