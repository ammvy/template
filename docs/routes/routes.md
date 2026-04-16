# Routes (HTTP Transport)

## Visão Geral
A camada de **Routes** é a interface externa do sistema, responsável por expor as funcionalidades da aplicação via protocolo HTTP. Ela gerencia o roteamento das requisições para os controllers e define os contratos de entrada e saída.

## Arquitetura
Este projeto foi desenhado para ser agnóstico a frameworks, suportando múltiplas implementações de transporte:

- **Fastify**: Implementação principal, focada em performance e validação estrita via JSON Schemas.
- **Express**: Implementação alternativa, utilizando o middleware padrão da comunidade.

As rotas são localizadas em `nodejs/src/routes/` e organizadas por framework.

## Fastify (Recomendado)
A implementação em Fastify utiliza plugins assíncronos e integra-se nativamente com o **Swagger/OpenAPI**.

### Características:
- **Schemas**: Todas as rotas possuem definições de `body`, `params` e `response` para validação automática.
- **Swagger**: A documentação é gerada automaticamente no prefixo `/docs`.
- **Efetividade**: Melhores tempos de resposta e uso reduzido de memória.

## Express
Utilizada para cenários onde a compatibilidade com o ecossistema Express é prioritária.

### Características:
- **Middleware**: Utiliza middlewares padrão para parsing de JSON e tratamento de erros.
- **Simplicidade**: Curva de aprendizado menor para desenvolvedores familiarizados com o ecossistema Node.js tradicional.

## Rotas Implementadas

### Tasks (`/tasks`)
- `GET /`: Lista todas as tarefas.
- `GET /:id`: Busca uma tarefa específica por ID.
- `POST /`: Cria uma nova tarefa.
- `PUT /:id`: Atualiza os dados de uma tarefa existente.
- `DELETE /:id`: Remove uma tarefa do sistema.

### Categories (`/categories`)
- Operações CRUD similares para a gestão de categorias.

## Como estender
Para adicionar uma nova rota:
1. Crie o arquivo de rota no respectivo diretório do framework (`fastify/` ou `express/`).
2. Defina a função que recebe a instância da aplicação e o controller correspondente.
3. No caso do Fastify, defina o `schema` para garantir a validação e documentação.
4. Registre a nova rota no `index.ts` do framework.
