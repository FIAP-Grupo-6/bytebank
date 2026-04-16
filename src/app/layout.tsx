import type { Metadata } from 'next';
import '@/styles/globals.css';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'ByteBank',
  description: 'A modern banking application built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex md:flex-row flex-col">
          <Header />
          <Sidebar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-15 md:px-6 md:py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
