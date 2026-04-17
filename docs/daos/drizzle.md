# DAOs (Data Access Objects) — Drizzle

Esta camada é responsável por toda a comunicação direta com o banco de dados usando o **Drizzle ORM**.

## Localização
`nodejs/src/daos/drizzle/`

## Por que usar DAOs com Drizzle?
1. **Padronização**: Mantemos a mesma interface que os DAOs de outros ORMs (como Prisma), permitindo trocar a implementação de infraestrutura sem afetar as regras de negócio.
2. **Abstração de Esquema**: Os DAOs encapsulam as funções de busca do Drizzle (select, insert, etc.), fornecendo métodos limpos para os Services.

## Exemplo de Implementação

Ao criar um novo DAO utilizando Drizzle, siga este padrão:

1. **Interface**: Defina o contrato em `nodejs/src/daos/_interfaces/[name]-dao.interface.ts`.
2. **Classe**: Implemente a lógica em `nodejs/src/daos/drizzle/[nome].drizzle-dao.ts`.

```typescript
import { db } from "../../db/drizzle/client"; // Sua instância do drizzle
import { tasks } from "../../db/drizzle/schema";
import { ITaskDAO } from "../_interfaces/task-dao.interface";

export class TaskDrizzleDAO implements ITaskDAO {
  async list() {
    // Busca todas as tarefas usando o cliente do Drizzle
    return await db.select().from(tasks);
  }
}
```

## Benefícios do Template
- **Flexibilidade**: Pronto para trabalhar com PostgreSQL conforme configurado no `drizzle.config.ts`.
- **Typing**: Aproveita a tipagem automática do esquema do Drizzle para garantir segurança em tempo de compilação.
- **Convenção de Nomes**: `[nome].drizzle-dao.ts`.
