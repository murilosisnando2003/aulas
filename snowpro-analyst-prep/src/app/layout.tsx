import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SnowPro Advanced: Data Analyst - Preparação',
  description:
    'Sistema de preparação para a certificação SnowPro Advanced: Data Analyst da Snowflake. Flashcards, quizzes e conteúdo de estudo.',
  keywords: [
    'Snowflake',
    'SnowPro',
    'Data Analyst',
    'Certification',
    'SQL',
    'Data Engineering',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              SnowPro Advanced: Data Analyst Prep - Sistema de estudos
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Baseado na documentação oficial da Snowflake
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
