# 📂 Guia de Documentação (Sumário)

Para uma compreensão profunda de cada camada, consulte os documentos detalhados na pasta `docs/`:

## 🏗️ Geral
- **[Arquitetura e Integração](docs/archtecture.md)**: Visão de alto nível e stack tecnológica.
- **[Commits Semânticos](docs/semantic-commits.md)**: Padrões de versionamento e mensagens.
- **[Setup do Ambiente](docs/environment/setup.md)**: Docker, PNPM e execução do projeto.

---

## Como Começar?

1. Clone o repositório. (git clone https://github.com/ammvy/template)
2. Certifique-se de ter o Docker e o pnpm instalados.
3. Suba o banco: `docker compose up -d`.
4. Instale as dependências com `pnpm i` em ambas as pastas (`nextjs` e `nodejs`).
5. Execute `pnpm dev` em ambos os serviços.

---

## 👥 Documentação por Perfil

| 🏗️ Perfil 1: Dados | ⚙️ Perfil 2: Lógica Backend | 🛣️ Perfil 3: API | 🎨 Perfil 4: Web (UI) | 🧠 Perfil 5: Web (Lógica) |
| :--- | :--- | :--- | :--- | :--- |
| [MySQL](docs/databases/mysql.md) | [Camada DAO](docs/daos/daos.md) | [Agnostic Controllers](docs/controllers/agnostic-controllers.md) | [Pages & Layouts](docs/routing/pages-layout.md) | [Custom Hooks](docs/hooks/hooks.md) |
| [PostgreSQL](docs/databases/postgresql.md) | [DAO Drizzle](docs/daos/drizzle.md) | [Controllers](docs/controllers/controllers.md) | [UI Components](docs/components/components.md) | [Consumo API](docs/hooks/consumption.md) |
| [Docker Instances](docs/databases/docker-instances.md) | [DAO Prisma](docs/daos/prisma.md) | [HTTP Transports](docs/routes/http-transports.md) | [Modules](docs/components/modules.md) | |
| [Drizzle (ORM)](docs/orms/drizzle.md) | [Regras de Negócio](docs/services/business-logic.md) | [Routes](docs/routes/routes.md) | | |
| [Prisma (ORM)](docs/orms/prisma.md) | [Services](docs/services/services.md) | | | |

> Desenvolvido para facilitar o bootstrap de aplicações profissionais com foco em código limpo e manutenível.
