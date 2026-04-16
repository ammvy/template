# Frontend Next.js - Guia de Configuração

## Instalação de Dependências

Para instalar as dependências do projeto, execute:

```bash
pnpm install
```

Ou, se utiliza npm:

```bash
npm install
```

## Rodando o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`.

## Build e Deploy

Para gerar a build de produção:

```bash
pnpm build
```

Para iniciar o servidor de produção:

```bash
pnpm start
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com os seguintes valores:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

O `NEXT_PUBLIC_` permite acessar a variável no cliente.

---

# Arquitetura Frontend

## Estrutura de Pastas

```
src/
├── app/                      # App Router do Next.js 15
│   ├── layout.tsx           # Layout raiz com QueryProvider
│   ├── page.tsx             # Página de tarefas (/)
│   ├── globals.css          # Estilos globais com Tailwind
│   └── categorias/
│       └── page.tsx         # Página de categorias (/categorias)
│
├── components/              # Componentes UI reutilizáveis (sem lógica)
│   ├── button.tsx           # Botão customizado com variantes
│   ├── input.tsx            # Campo de entrada com label e erro
│   └── modal.tsx            # Modal genérico com fechar
│
├── modules/                 # Componentes compostos (com lógica de negócio)
│   ├── tasks/
│   │   ├── task-board.tsx   # Container principal de tarefas
│   │   ├── task-form.tsx    # Formulário de criar/editar tarefa
│   │   └── task-item.tsx    # Renderização de uma tarefa
│   └── categories/
│       ├── category-board.tsx   # Container principal de categorias
│       ├── category-form.tsx    # Formulário de categorias
│       └── category-item.tsx    # Renderização de uma categoria
│
├── hooks/                   # Custom hooks do React Query
│   ├── tasks/
│   │   ├── get-all.ts       # useGetAllTasks - fetch de tarefas
│   │   ├── create-task.ts   # useCreateTask - criar tarefa
│   │   ├── update-task.ts   # useUpdateTask - atualizar tarefa
│   │   └── delete-task.ts   # useDeleteTask - deletar tarefa
│   └── categories/
│       ├── get-all.ts       # useGetAllCategories
│       ├── create-category.ts
│       ├── update-category.ts
│       └── delete-category.ts
│
├── lib/                     # Utilitários e configurações
│   ├── api.ts               # Instância do Axios configurada
│   └── query-provider.tsx   # Provider do React Query
│
└── types/                   # Tipos e interfaces TypeScript
    ├── task.ts              # Interface Task
    ├── task-status.ts       # Enum TaskStatus
    └── category.ts          # Interface Category
```

## Padrões de Desenvolvimento

### 1. **Componentes (UI)**
Os componentes em `src/components/` são "burros" (presentational): recebem props e renderizam sem lógica complexa.

**Exemplo:**
```typescript
export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return <button className={variantStyles[variant]} {...props}>{children}</button>;
}
```

### 2. **Módulos (Compostos)**
Os módulos em `src/modules/` são "inteligentes": utilizam hooks, gerenciam estado e orquestram componentes.

**Exemplo:**
```typescript
export function TaskBoard() {
  const { data: tasks } = useGetAllTasks();
  return <div>{tasks.map(task => <TaskItem key={task.id} task={task} />)}</div>;
}
```

### 3. **Hooks (React Query)**
Cada hook encapsula uma operação específica (fetch, mutação) e gerencia o estado via React Query.

**Get:**
```typescript
export function useGetAllTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => (await api.get<Task[]>('/tasks')).data,
  });
}
```

**Mutation:**
```typescript
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => (await api.post('/tasks', payload)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
```

### 4. **Formulários (Inputs Controlados)**
Os formulários usam `useState` nativo (sem Hook Form):

```typescript
const [nome, setNome] = useState('');
const [descricao, setDescricao] = useState('');

<Input value={nome} onChange={(e) => setNome(e.target.value)} />
```

### 5. **Estilização (Tailwind CSS)**
Todo o estilo é feito com Tailwind CSS puro, sem CSS-in-JS ou styled-components.

**Classes úteis:**
- Layout: `flex`, `grid`, `max-w-*`, `mx-auto`, `p-*`
- Cores: `bg-blue-600`, `text-gray-900`, `border-gray-200`
- Estados: `hover:`, `disabled:`, `focus:`
- Responsividade: `md:`, `lg:`, `sm:`

### 6. **Nomeação (Kebab-case)**
- Pastas: plural (`components/`, `modules/`)
- Arquivos: singular e kebab-case (`task-form.tsx`, `category-item.tsx`)
- Funções/Componentes: PascalCase (`TaskForm`, `useGetAllTasks`)
- Variáveis: camelCase (`taskId`, `isLoading`)

## Fluxo de Dados

```
Component Page
    ↓
Module (task-board.tsx, category-board.tsx)
    ↓ useGetAllTasks/useGetAllCategories
React Query + Axios
    ↓
Backend API (Port 3333)
```

### Fluxo de Mutações:

```
User interacts (click button)
    ↓
Module calls useMutation hook (useCreateTask, etc.)
    ↓
Hook sends request via Axios
    ↓
Backend API responds
    ↓
React Query invalidates cache → refetch
    ↓
Component re-renders with new data
```

## Integração com Backend

O backend roda em `http://localhost:3333` e oferece dois conjuntos de endpoints:

### **Tasks** (`/tasks`)
- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

### **Categories** (`/categories`)
- `GET /categories` - Listar todas as categorias
- `POST /categories` - Criar nova categoria
- `PUT /categories/:id` - Atualizar categoria
- `DELETE /categories/:id` - Deletar categoria

## Estados das Requisições

Todos os hooks retornam estados úteis:

```typescript
const { data, isLoading, error, isError } = useGetAllTasks();

// Para mutations:
const mutation = useCreateTask();
mutation.isPending; // boolean - requisição em progresso
mutation.isSuccess; // boolean - sucesso
mutation.isError;   // boolean - erro
mutation.error;     // Error | null
mutation.mutate(payload); // executar a mutação
```

## Boas Práticas

1. **`'use client'` em componentes interativos**: Adicione no topo de componentes que usam hooks
2. **Validação mínima**: Verifique campos obrigatórios antes de enviar
3. **Feedback ao usuário**: Use alert/toast em caso de erro
4. **Optimistic updates**: React Query invalida automáticamente após mutações
5. **Error handling**: Sempre imprima erros em console e mostre ao usuário

## Exemplo Completo: Criar Tarefa

```typescript
// 1. Component (task-form.tsx)
<Input value={nome} onChange={(e) => setNome(e.target.value)} />
<Button onClick={handleSubmit}>Criar</Button>

// 2. Hook call
const createTask = useCreateTask();

// 3. Handler
const handleSubmit = async () => {
  const result = await createTask.mutateAsync({ nome });
  // React Query refetches automatically
};

// 4. Request sent to backend
POST /tasks { "nome": "Minha tarefa" }

// 5. Backend response
{ "id": 1, "nome": "Minha tarefa", ... }

// 6. Query invalidation + refetch
// 7. UI updates with new task
```

---

## Troubleshooting

### Erros CORS
- Certifique-se de que o backend está rodando em `http://localhost:3333`
- Verifique a variável `NEXT_PUBLIC_API_URL` no `.env.local`

### Queries não atualizam após mutações
- Confirme que a `queryKey` está consistente entre fetch e invalidação
- Verifique se `useQueryClient().invalidateQueries()` está sendo chamado

### Componentes não renderizam
- Verifique se há `'use client'` no topo do arquivo (para componentes interativos)
- Confirme se o hook está sendo importado corretamente

---

## Deploy

Para deploy em produção, recomenda-se:
- Usar Vercel (integrações nativas com Next.js)
- Atualizar a variável `NEXT_PUBLIC_API_URL` para a URL real da API
- Gerar build com `pnpm build` antes de fazer push

