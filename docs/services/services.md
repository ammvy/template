# Services (Camada de Negócio)

## Visão Geral
A camada de **Services** contém toda a lógica de negócio e regras de validação da aplicação. Ela atua como uma orquestradora que utiliza os **DAOs** para persistência, mas sem se preocupar com a implementação específica deles.

## Regras de Negócio Implementadas

### TaskService
Localizado em `nodejs/src/services/task-service.ts`.

- **Limite de Tarefas**: Uma tarefa com status `PARADO` (Não iniciada) só pode ser criada se houver menos de **10** tarefas nesse mesmo status no sistema.
- **Mapeamento de Status**: Converte os enums de domínio para strings compatíveis com as necessidades da interface.

### CategoryService
Localizado em `nodejs/src/services/category-service.ts`.

- **Validação de Cores**: Para manter a acessibilidade e o design, cores muito próximas ao Branco (`#FFF`) ou Preto (`#000`) são proibidas.
    - Exceção: O sistema valida variações hexadecimais como `#000000`, `#ffffff`, etc.

## Injeção de Dependência
Os Services utilizam injeção de dependência via construtor. Isso permite que possamos testar os serviços passando mocks ou alternar entre os DAOs de **Prisma** e **Drizzle** sem alterar uma única linha de código do serviço.

```typescript
const taskDao = new TaskPrismaDAO(); // ou new TaskDrizzleDAO()
const taskService = new TaskService(taskDao);
```

## Como estender
Para adicionar novas regras, sempre as implemente nos métodos dos Services antes de chamar os métodos correspondentes nos DAOs.
