'use client';

import Link from 'next/link';
import { Domain } from '@/types';

interface DomainCardProps {
  domain: Domain;
  mastery: number;
}

export default function DomainCard({ domain, mastery }: DomainCardProps) {
  return (
    <Link href={`/domains/${domain.id}`}>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: domain.color }}
          >
            {domain.weight}%
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {domain.topics.length} tópicos
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {domain.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {domain.description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Domínio</span>
            <span className="font-medium text-gray-700">{mastery}%</span>
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
      </div>
    </Link>
  );
}
