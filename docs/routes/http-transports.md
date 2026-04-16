# Routes — Express vs Fastify

O template oferece suporte nativo a dois dos frameworks mais populares do ecossistema Node.js, mantendo a mesma interface de negócio.

## Localização
`src/routes/`

## Portas de Desenvolvimento
- **Express:** 3333
- **Fastify:** 3334

## Documentação (Swagger)
Ambas as rotas possuem Swagger UI integrado:
- `http://localhost:3333/docs` (Express - via JSDoc)
- `http://localhost:3334/docs` (Fastify - via JSON Schema)

## Express
- **Configuração:** Localizada em `src/routes/express/index.ts`.
- **Estilo:** Mais flexível, usa `swagger-jsdoc` nos comentários das rotas.
- **Middleware:** Usa middlewares padrão do ecossistema Express.

## Fastify
- **Configuração:** Localizada em `src/routes/fastify/index.ts`.
- **Estilo:** Mais estruturado, usa JSON Schema para validação automática de entrada e geração de documentação.
- **Performance:** Focado em baixa latência e alta throughput.

## Adicionando novas rotas
1. Crie o arquivo `[nome].route.ts` na pasta do framework desejado.
2. Registre a nova rota no `index.ts` correspondente.
3. Certifique-se de injetar o Controller necessário no construtor.
