# DAOs (Data Access Objects) — Prisma

Esta camada é responsável por toda a comunicação direta com o banco de dados usando o **Prisma ORM**.

## Localização
`src/daos/prisma/`

## Por que usar DAOs?
1. **Isolamento de Infraestrutura:** O resto da aplicação não sabe que usamos Prisma. Se decidirmos mudar para Drizzle ou MySQL nativo, apenas os DAOs mudam.
2. **Tipagem Forte:** Usamos interfaces (`I[Name]DAO`) para garantir que qualquer implementação siga o mesmo contrato.

## Exemplo de Implementação

Ao criar um novo DAO, siga este padrão:

1. **Interface:** Defina em `src/daos/_interfaces/[name]-dao.interface.ts`
2. **Classe:** Crie em `src/daos/prisma/[name]-prisma-dao.ts`

```typescript
import { PrismaClient } from "@prisma/client";
import { ITaskDAO } from "../_interfaces/task-dao.interface";

export class TaskPrismaDAO implements ITaskDAO {
  private prisma = new PrismaClient(); // Ou use um singleton

  async list() {
    return this.prisma.task.findMany();
  }
}
```

## Benefícios do Template
- **Integração com Docker:** Pronto para rodar com MariaDB/MySQL.
- **Convenção de Nomes:** `[nome].prisma-dao.ts`.
