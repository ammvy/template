# Configuração do Ambiente Local

Instruções para inicializar o ecossistema de desenvolvimento.

## Docker (Banco de Dados)
Não instalamos bancos de dados localmente. Utilizamos o Docker para garantir que todos os desenvolvedores tenham o mesmo ambiente.
- Comando: `docker compose up -d`
- Responsabilidade: Sobe os containers de banco de dados definidos na raiz.

## Node.js e PNPM
Requeremos o uso do **pnpm** para gerenciamento de dependências.

### Por que `pnpm install`?
O `pnpm` utiliza links simbólicos e um store global, o que torna a instalação:
1. Extremamente rápida.
2. Econômica em espaço de disco.
3. Segura (evita dependências fantasmagóricas).

## Processo de Execução
1. `docker compose up -d` (na raiz).
2. `pnpm install` (em `nodejs/` e `nextjs/`).
3. `pnpm dev` em ambas as pastas para iniciar os servidores.

*Nota: Você também pode usar `npm` ou `yarn`, mas as travas de versão (`-lock`) são otimizadas para pnpm neste projeto.*
