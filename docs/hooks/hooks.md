# Data Fetching Hooks (`src/hooks/`)

Toda a persistência e busca de dados é isolada em ganchos customizados que utilizam a biblioteca **@tanstack/react-query**.

## Organização
Os hooks são separados por domínio (entidade):
- `tasks/`: `get-all.ts`, `create-task.ts`, `delete-task.ts`, `update-task.ts`.
- `categories/`: `get-all.ts`, `create-category.ts`.

## Padrão de Codificação
Utilizamos o padrão `<acao>-<entidade>` para nomear os arquivos.

## Vantagens
- **Gerenciamento de Cache**: O React Query evita requisições desnecessárias.
- **Estados Nativos**: Oferece variáveis como `isLoading`, `isError`, `isSuccess` nativamente.
- **Revalidação Automática**: Ao realizar uma alteração (mutation), podemos disparar a invalidação de queries para atualizar a UI instantaneamente.
