# Prisma ORM

## Visão Geral
O Prisma é um ORM (Object-Relational Mapper) de nova geração que utiliza um esquema declarativo (`schema.prisma`) para definir o modelo de dados e gerar um cliente type-safe.

Neste projeto, o Prisma está configurado para conectar-se ao **MySQL**.

## Configuração
- **Arquivo de Esquema**: `nodejs/src/db/prisma/schema.prisma`
- **Arquivo de Configuração**: `nodejs/prisma.config.ts`
- **Banco de Dados**: MySQL (Porta 3306)
- **URL de Conexão**: Definida via variável `MYSQL_URL` no `.env`.

## Principais Comandos (Scripts pnpm)

| Comando | Descrição |
| :--- | :--- |
| `pnpm prisma:generate` | Gera o Prisma Client baseado no esquema atual. |
| `pnpm prisma:migrate` | Cria e aplica uma nova migração ao banco de dados (ambiente de dev). |
| `pnpm prisma:push` | Sincroniza o esquema diretamente com o banco sem criar arquivos de migração. |
| `pnpm prisma:studio` | Abre uma interface visual no navegador para gerenciar os dados. |
| `pnpm test:prisma` | Executa um script de teste para validar a conexão e listar registros. |

## Como usar
Para adicionar novas tabelas, edite o arquivo `schema.prisma`, execute `pnpm prisma:migrate` para aplicar as mudanças e `pnpm prisma:generate` para atualizar o IntelliSense do seu editor.
