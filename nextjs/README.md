# Task Manager Frontend - Next.js

Frontend da aplicação de gerenciamento de tarefas construído com **Next.js 15**, **React 19**, **Tailwind CSS**, **React Query** e **TypeScript**.

## 🚀 Quick Start

### 1. Instalar dependências
```bash
pnpm install
```

### 2. Rodar servidor de desenvolvimento
```bash
pnpm dev
```

Acesse `http://localhost:3000` no navegador.

### 3. Criar build para produção
```bash
pnpm build
pnpm start
```

## 📁 Estrutura do Projeto

Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para uma documentação detalhada da arquitetura, padrões e convenções de nomeação.

```
src/
├── app/                  # App Router do Next.js
├── components/          # Componentes UI reutilizáveis
├── modules/             # Componentes compostos (com lógica)
├── hooks/               # Custom hooks (React Query)
├── lib/                 # Configurações e utilitários
└── types/               # Tipos TypeScript
```

## 🔌 Requisitos

- **Node.js** >= 18
- **pnpm** >= 8
- **Backend** rodando em `http://localhost:3333`

## 🛠 Tecnologias

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Styling
- **React Query** - State management assíncrono
- **Axios** - Client HTTP
- **Lucide React** - Ícones

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## 💡 Padrões

- **Components**: Sem lógica (presentational)
- **Modules**: Com lógica de negócio e orquestração
- **Hooks**: Encapsula operações de API via React Query
- **Nomeação**: kebab-case para arquivos, PascalCase para componentes
- **Styling**: Tailwind CSS puro

## 🌐 Endpoints da API

### Tasks
- `GET /tasks` - Listar tarefas
- `POST /tasks` - Criar tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

### Categories
- `GET /categories` - Listar categorias
- `POST /categories` - Criar categoria
- `PUT /categories/:id` - Atualizar categoria
- `DELETE /categories/:id` - Deletar categoria

## 📖 Documentação Completa

Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para:
- Estrutura detalhada de pastas
- Padrões de desenvolvimento
- Fluxo de dados
- Integração com backend
- Troubleshooting

## ⚙️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Cria build de produção |
| `pnpm start` | Inicia servidor de produção |
| `pnpm lint` | Executa linter |

---

**Desenvolvido como parte do template de referência pessoal.**
