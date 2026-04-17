# Modules (`src/modules/`)

Componentes compostos e complexos que representam funcionalidades ou domínios específicos.

## Características
- **Compound Components**: Combinam múltiplos `components` de UI para formar uma funcionalidade (Ex: uma lista, um formulário).
- **Conectados**: São responsáveis por utilizar os custom hooks (`src/hooks/`) para buscar ou enviar dados para o backend.
- **Orquestração**: Decidem o estado da tela (exibição de erro, loading ou lista vazia).

## Exemplos
- `tasks/task-board.tsx`: Orquestra a listagem de tarefas, filtros e ações.
- `categories/category-form.tsx`: Lida com o estado local do formulário de categorias e dispara a mutation de criação.

## Fluxo
As `pages` da aplicação utilizam os módulos para construir a interface principal.
