import type { Metadata } from "next";
import { QueryProvider } from "@/lib/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Aplicação de gerenciamento de tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground">
        <QueryProvider>
          <div className="min-h-screen">
            <nav className="bg-brand-surface/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-50">
              <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-brand-gray-light">
                  Task Manager
                </h1>
                <div className="flex gap-6">
                  <a
                    href="/"
                    className="text-foreground hover:underline font-medium"
                  >
                    Tarefas
                  </a>
                  <a
                    href="/categorias"
                    className="text-foreground hover:underline font-medium"
                  >
                    Categorias
                  </a>
                </div>
              </div>
            </nav>
            <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
