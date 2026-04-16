import type { Metadata } from 'next';
import { QueryProvider } from '@/lib/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Aplicação de gerenciamento de tarefas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <QueryProvider>
          <div className="min-h-screen">
            <nav className="bg-white border-b border-gray-200 shadow-sm">
              <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
                <div className="flex gap-4">
                  <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                    Tarefas
                  </a>
                  <a href="/categorias" className="text-gray-600 hover:text-gray-900 font-medium">
                    Categorias
                  </a>
                </div>
              </div>
            </nav>
            <main className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
