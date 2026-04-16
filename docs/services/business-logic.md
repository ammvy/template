# Services — Regras de Negócio

A camada de **Services** é o coração da aplicação. Aqui residem as validações, cálculos e orquestração de dados.

## Localização
`src/services/`

## Princípios
1. **Framework-Agnostic:** Services não conhecem Express, Fastify ou qualquer detalhe de transporte.
2. **Persistence-Agnostic:** Services não conhecem Prisma ou SQL. Eles recebem DAOs via Injeção de Dependência.
3. **Validação:** Toda regra de negócio (ex: "não pode ter mais de 10 tarefas paradas") deve estar aqui.

## Exemplo de Implementação

```typescript
export class TaskService implements ITaskService {
  constructor(private readonly taskDao: ITaskDAO) {}

  async createTask(data: Omit<Task, "id">): Promise<Task> {
    // Regra de Negócio
    if (data.status === TaskStatus.PARADO) {
      const count = await this.taskDao.countByStatus(TaskStatus.PARADO);
      if (count >= 10) {
        throw new Error("Limite de 10 tarefas não iniciadas atingido.");
      }
    }
    return await this.taskDao.create(data);
  }
}
```

## Como estender
- Adicione novos métodos à interface em `_interfaces/`.
- Implemente a lógica na classe correspondente.
- Injete no Controller desejado no `index.ts` das rotas.
