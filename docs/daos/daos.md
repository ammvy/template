# Data Access Objects (DAOs)

## Visão Geral
O padrão **DAO (Data Access Object)** é utilizado para isolar a lógica de acesso a dados da lógica de negócio (Services). Isso permite que o projeto suporte múltiplos ORMs e facilite a troca ou manutenção da infraestrutura de dados.

## Arquitetura
Neste projeto, utilizamos interfaces para definir as operações que cada DAO deve suportar.

- **Interfaces**: Localizadas em `nodejs/src/daos/_interfaces/`.
- **Implementações**:
    - **Prisma**: Localizadas em `nodejs/src/daos/prisma/`.
    - **Drizzle**: Localizadas em `nodejs/src/daos/drizzle/`.

## DAOs Implementados

### TaskDAO
Responsável pelas operações CRUD da entidade `Tarefa` e suas relações.
- **Métodos**: `create`, `list`, `findById`, `update`, `delete`.
- **Diferencial**: Realiza o mapeamento de enums entre o banco de dados e o domínio (`TaskStatus`).

### CategoryDAO
Responsável pelas operações CRUD da entidade `Categoria`.
- **Métodos**: `create`, `list`, `findById`, `update`, `delete`.

## Como estender
Para adicionar um novo banco ou ORM, basta criar uma nova classe que implemente as interfaces `ITaskDAO` ou `ICategoryDAO` e injetá-la no Service correspondente.
