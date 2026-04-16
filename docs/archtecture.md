# Arquitetura Frontend / Backend (Integração Next.js + Node.js)

Este documento atua como referência sobre as regras e responsabilidades no fluxo de construção e manutenção da aplicação (Next.js acessando o backend Node).

## Stack Tecnológica

*   **Frontend**: Next.js App Router (React 19).
*   **Networking / Fetching**: API REST via `axios` envelopada no `@tanstack/react-query` (Hooks puros).
*   **Aparência (Styling)**: Tailwind CSS nativo (Design Premium, minimalista, dark theme preferencial) com classes puras. Sem dependências complexas de design system neste estágio.
*   **Formulários**: Native React Controlled Forms.
*   **Ícones**: `lucide-react`.

## Estrutura de Pastas e Responsabilidades (`nextjs/src/`)

### 1. `components/`
Componentes puramente visuais, de escopo raso e sem acoplamento. Representam peças de *Lego* ("Dumb Components").
*   Eles confiam inteiramente na entrada de dados via `props`.
*   Exemplos: `button.tsx`, `input.tsx`, `modal.tsx`.
*   Regra vital: Componentes não acessam chamadas de rede nem injetam lógica de regras de negócio.

### 2. `modules/`
Componentes compostos (Compound Components). Eles envolvem fluxos específicos, formam layouts granulares e lidam com integrações.
*   Constituídos de agrupamentos maiores e utilizam `components` menores internamente.
*   Eles acessam os `hooks` do react-query para conversar com a abstração do backend.
*   Exemplo de hierarquia:
    *   `src/modules/tasks/task-board.tsx`: O cérebro da tela de Tarefas. Consome os hooks de carregar tarefas (`useGetAllTasks`), controla modais, injeta o state para as lógicas.
    *   `src/modules/tasks/task-form.tsx`: Trata o state do input nativo que cadastra/edita uma task e dispara as mutations correspondentes (ex: `useCreateTask`).

### 3. `hooks/`
Toda a comunicação de API é isolada nesses arquivos usando `React Query`. Isso unifica a configuração de requisição (axios) ao state asíncrono (loading, error, cache fetching).
*   Separado rigidamente por recursos (entidades).
*   Cada operação possui seu próprio arquivo exportando um Custom Hook específico.
*   **Padrão Naming**: `<acao>-<entidade>.ts`. Exemplo: `get-all.ts`, `update-task.ts`.
*   Estrutura interna em `/tasks/` e `/categories/`.

### 4. `types/`
Interfaces e Type definitions que espelham exatamente os contratos dispostos pelo Backend, resultando em um Frontend seguro (*Type-Safe*) fim-a-fim.
*   **Exemplos**: `task.ts` (exportando Interface Task e consts auxiliares), `task-status.ts`.

### 5. `app/` (Pages e Layout)
Consome exclusivamente camadas de Módulo (`modules`). A página e os roteadores do Next declaram quais "Boards" carregar em cada path.
*   `/` (Home): Renderiza o `TaskBoard`.
*   `/categorias`: Renderiza o `CategoryBoard`.

## Padrões Adicionais Exigidos

*   **Identidade Visual Tática / Acessibilidade**: Interface focada no dinamismo com transições suaves.
*   **Convenção de Escrita**: Utilizar unicamente `kebab-case` na criação de arquivos para o Frontend. Arquivos no singular, diretórios no plural.

---
> A camada de cliente axios global aponta via baseUrl para a API em `http://localhost:3333` padrão (server express instanciado).
