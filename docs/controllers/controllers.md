# Controllers

## Visão Geral
A camada de **Controllers** atua como um intermediário entre as **Rotas (HTTP)** e os **Services (Lógica de Negócio)**. Sua principal responsabilidade é receber as requisições, validar os dados de entrada, chamar os serviços apropriados e formatar as respostas de sucesso ou erro.

## Arquitetura
Os controllers neste projeto são classes que utilizam **Injeção de Dependência** via construtor para receber as instâncias dos serviços de que dependem. Isso facilita a testabilidade e o desacoplamento.

- **Localização**: `nodejs/src/controllers/`.
- **Padrão de Nome**: `[nome].controller.ts`.

## Tratamento de Erros
Para garantir respostas HTTP consistentes, utilizamos classes de erro personalizadas que são interceptadas na camada de rotas:

- **NotFoundError**: Lançado quando um recurso solicitado não existe (gera um HTTP 404).
- **BusinessError**: Lançado quando uma regra de negócio é violada (gera um HTTP 400).

## Controllers Implementados

### TaskController
Gerencia o fluxo de dados para as tarefas.
- **Serviço Injetado**: `ITaskService`.
- **Operações**: `getAll`, `getById`, `create`, `update`, `remove`.

### CategoryController
Gerencia o fluxo de dados para as categorias.
- **Serviço Injetado**: `ICategoryService`.
- **Operações**: `getAll`, `getById`, `create`, `update`, `remove`.

## Como estender
Ao criar um novo controller:
1. Defina interfaces para os dados de entrada (`Input`).
2. Receba o serviço necessário no construtor.
3. Utilize os erros personalizados para sinalizar falhas de negócio ou recursos não encontrados.
