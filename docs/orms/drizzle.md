# Drizzle ORM

## Visão Geral

O Drizzle é um ORM leve e focado em TypeScript que permite escrever esquemas em código TS puro, oferecendo performance máxima e tipagem forte sem a necessidade de um passo de geração obrigatório para consultas básicas.

Neste projeto, o Drizzle está configurado para conectar-se ao **PostgreSQL**.

## Configuração

- **Arquivo de Esquema**: `nodejs/src/db/drizzle/schema.ts`
- **Arquivo de Configuração**: `nodejs/drizzle.config.ts`
- **Banco de Dados**: PostgreSQL (Porta 5433)
- **Driver**: `node-postgres` (pg) com `pg.Pool` para gerenciamento de conexões.
- **URL de Conexão**: Definida via variável `POSTGRES_URL` no `.env`.

## Principais Comandos (Scripts pnpm)

| Comando                 | Descrição                                                             |
| :---------------------- | :-------------------------------------------------------------------- |
| `pnpm drizzle:push`     | Sincroniza o esquema TS diretamente com o banco de dados.             |
| `pnpm drizzle:generate` | Gera os arquivos SQL de migração baseados no esquema TS.              |
| `pnpm drizzle:migrate`  | Executa as migrações SQL pendentes utilizando o kit do Drizzle.       |
| `pnpm drizzle:studio`   | Abre o Drizzle Studio para visualização de dados.                     |
| `pnpm test:drizzle`     | Executa um script de teste para validar a conexão e listar registros. |

## Como usar

As tabelas são definidas como objetos TypeScript no arquivo `schema.ts`. Para aplicar mudanças, você pode usar `pnpm drizzle:push` para prototipagem rápida ou `pnpm drizzle:generate` seguindo de `pnpm drizzle:migrate` para um fluxo formal de migrações.
