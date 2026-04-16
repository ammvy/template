# Controllers — Camada de Orquestração

Os Controllers são responsáveis por receber dados da camada de transporte (Routes) e delegar para a camada de negócio (Services).

## Localização
`src/controllers/`

## Princípios
1. **Agnóstico de Framework:** Um Controller neste template **nunca** importa `Request` ou `Response` do Express/Fastify.
2. **Dados Brutos:** Recebem objetos simples (DTOs) e retornam objetos simples (Models/Types).
3. **Erros de Domínio:** Lançam erros semânticos como `NotFoundError` ou `BusinessError`. A Route decide se isso vira HTTP 404 ou 400.

## Por que essa arquitetura?
Facilita testes unitários (não precisa de mocks complexos de `res.status()`) e permite trocar o framework HTTP (ex: Express para Fastify) sem tocar na lógica do Controller.

## Exemplo

```typescript
export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  async getById(id: number): Promise<Task> {
    const task = await this.taskService.getTaskById(id);
    if (!task) throw new NotFoundError(`Tarefa ${id} não encontrada.`);
    return task;
  }
}
```
