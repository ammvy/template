# Roteamento e Estrutura de Páginas (`src/app/`)

A organização do roteamento segue o padrão **Next.js App Router**.

## `layout.tsx` (O Shell)

- Define a estrutura persistente da aplicação (Navbar, Sidebar, Rodapé).
- Contém os **Context Providers** essenciais como o `QueryClientProvider` do React Query.
- Garante que estados globais e estilos base (globals.css) sejam carregados uma única vez.
- Envolve todas as páginas no mesmo nível e abaixo.

## `page.tsx` (Os Pontos de Entrada)

- Representam as rotas acessíveis via navegador.
- **Responsabilidade Única**: Chamar um `module` específico para renderizar o conteúdo daquela rota.
- Exemplo: `app/page.tsx` instancia o modulo `TaskBoard`.

## Estrutura de Pastas

- Cada pasta dentro de `app/` que contém um `page.tsx` torna-se automaticamente uma URL.
- Exemplo: `app/categorias/page.tsx` -> `localhost:3000/categorias`.
