# Integração Frontend (Next.js) e Backend (Node.js)

Este plano descreve o passo a passo da construção da interface frontend e integração com os endpoints existentes no backend (`Tasks` e `Categories`), seguindo as diretrizes arquiteturais solicitadas (components, modules, react-query hooks) e as regras de clean code e padronização (kebab-case, pastas no plural, arquivos no singular).

## Escolhas Técnicas Definidas
> [!NOTE]
> - Backend será consumido pelo Next.js através da porta `3333` padrão (Express).
> - Camada de Networking feita nativamente com `axios`.
> - Sem Hook Form / Zod, usaremos inputs controlados.
> - UI construída estritamente através do `Tailwind CSS` puro, com design moderno e minimalista.

## Proposed Changes

Abaixo está o detalhamento estrutural dos componentes e mudanças no Next.js (pasta `c:\Users\Victor\Desktop\Referencias Pessoais\template\nextjs`).

### 1. Configuração Inicial e Dependências

Instalação de pacotes necessários para roteamento, formatação, integração de API e estado assíncrono:
* `axios` (Cliente HTTP)
* `@tanstack/react-query` (Gerenciador de estado assíncrono)
* `lucide-react` (Ícones)

#### [MODIFY] src/app/layout.tsx
Adicionaremos o `<QueryProvider>` para envolver a aplicação e disponilibizar o Client do React Query.

### 2. Tipagens (`src/types`)

Criação dos tipos TypeScript para refletir as models do Node.js.

#### [NEW] src/types/task.ts
Mapeamento de `Task`, propriedades `id`, `nome`, `descricao`, `status`. Tipagem do Enum `TaskStatus`.
#### [NEW] src/types/category.ts
Mapeamento de `Category`, constando `id`, `nome` e `cor`.

### 3. Integração de API e Hooks (`src/hooks`)

Serão criados submódulos de requisição contendo pequenos hooks que delegam para o react-query.

#### [NEW] src/lib/api.ts
Configuração base do `axios` com base-url para `http://localhost:3333`.

#### [NEW] src/hooks/tasks/get-all.ts
Exporta `useGetAllTasks`.
#### [NEW] src/hooks/tasks/create-task.ts
Exporta `useCreateTask` utilizando `useMutation`.
#### [NEW] src/hooks/tasks/update-task.ts
Exporta `useUpdateTask`.
#### [NEW] src/hooks/tasks/delete-task.ts
Exporta `useDeleteTask`.

#### [NEW] src/hooks/categories/get-all.ts
Exporta `useGetAllCategories`.
#### [NEW] src/hooks/categories/create-category.ts
Exporta `useCreateCategory`.
#### [NEW] src/hooks/categories/update-category.ts
Exporta `useUpdateCategory`.
#### [NEW] src/hooks/categories/delete-category.ts
Exporta `useDeleteCategory`.

### 4. Componentes Simples (`src/components`)

Componentes isolados e "burros" sem lógicas complexas.

#### [NEW] src/components/button.tsx
#### [NEW] src/components/input.tsx
#### [NEW] src/components/modal.tsx

### 5. Compound Components e Regras de Negócio (`src/modules`)

Estes componentes utilizarão os hooks do `react-query` e orquestrarão os `components`. Formulários usarão inputs controlados via React State nativo.

#### Modules para Tarefas (Tasks)
*   **[NEW]** `src/modules/tasks/task-board.tsx`: O componente que envolverá todas as lógicas e listagem.
*   **[NEW]** `src/modules/tasks/task-form.tsx`: Formulário gerenciador de criação/edição nativo.
*   **[NEW]** `src/modules/tasks/task-item.tsx`: Exibição isolada da tarefa com botões para `edit` e `delete`.

#### Modules para Categorias (Categories)
*   **[NEW]** `src/modules/categories/category-board.tsx`: Container e integração da aba categorias.
*   **[NEW]** `src/modules/categories/category-form.tsx`: Formulário gerenciador de categorias nativo.
*   **[NEW]** `src/modules/categories/category-item.tsx`: Renderização da label/cor de cada categoria.

### 6. Pages (Rotas Next.js)

#### [MODIFY] src/app/page.tsx
A página `Home` (rota `/`) renderizará o module `TaskBoard` e permitirá cadastrar, editar e remover as tarefas.

#### [NEW] src/app/categorias/page.tsx
A página `Categorias` renderizará o module `CategoryBoard` centralizando as ações de cadastrar, editar e excluir categorias.

### 7. Documentação de Arquitetura

#### [NEW] docs/architecture.md
Ao fim de toda a implementação, deve ser gerado um arquivo `architecture.md` (conforme solicitado pelo usuário, o arquivo também pode ser nomeado `archtecture.md`) na raiz do nextjs (ou na raiz do repositório) descrevendo detalhadamente a estrutura de pastas e responsabilidades recém-construídas.

## Verification Plan

### Manual Verification
1. Ligar as APIs do Node.js utilizando `pnpm dev`.
2. Executar o Next.js. Acessar `/` na porta correspondente e simular o fluxo:
   * **CREATE**: Adicionar nova tarefa. Ela deverá render na hora graças à invalidação do react-query (`refetchQueries`).
   * **UPDATE**: Editar a tarefa para finalizada, devendo refletir os states atualizados na API.
   * **DELETE**: Excluir a tarefa.
3. Navegar para `/categorias` e executar teste similar (Post/Put/Delete API checks).
