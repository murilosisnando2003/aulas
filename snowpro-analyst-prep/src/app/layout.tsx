import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import OfflineButton from '@/components/OfflineButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#29B5E8',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SnowPro Advanced: Data Analyst - Preparação para Certificação',
  description:
    'Sistema completo de preparação para a certificação SnowPro Advanced: Data Analyst da Snowflake. 143 flashcards, 171 questões e conteúdo com 100% de cobertura do exame.',
  keywords: [
    'Snowflake',
    'SnowPro',
    'Data Analyst',
    'Certification',
    'SQL',
    'Data Engineering',
    'Flashcards',
    'Quiz',
    'Exame',
    'Preparação',
  ],
  authors: [{ name: 'SnowPro Prep' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SnowPro Prep',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SnowPro Advanced: Data Analyst - Preparação',
    description: 'Sistema de preparação com 143 flashcards e 171 questões para a certificação Snowflake.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnowPro Advanced: Data Analyst - Preparação',
    description: 'Sistema de preparação com cobertura 100% do exame Snowflake.',
  },
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
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  SnowPro Advanced: Data Analyst Prep - Sistema de estudos
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Baseado na documentação oficial da Snowflake
                </p>
              </div>
              <OfflineButton />
            </div>
          </div>
        </footer>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[PWA] Service Worker registrado com sucesso:', registration.scope);
                    })
                    .catch(function(error) {
                      console.error('[PWA] Erro ao registrar Service Worker:', error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
