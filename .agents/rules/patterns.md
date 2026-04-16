---
trigger: always_on
---

# Padrões de Projeto

# Criação de pastas e arquivos

- Sempre em inglês, usando 'kebab-case'
- \*Obs: Quando os arquivos tiverem funções claras como: DAO, Repository, Service, Controller, Route, a declaração dele deve conter '.[função].ts', ou seja: "[nome].dao.ts", "[nome].repository.ts", "[nome].service.ts", "[nome].controller.ts", "[nome].route.ts"...

- Nomes de pastas: No plural, exceto quando for nome de ferramentas, ou seja, uma pasta para o prisma ou drizzle ficaria apenas "prisma/", "zod/", em casos como "funções"(DAO, Repository, Service, Controller, Route) ficaria "daos/", "repositories/", "services/", "controllers/", "routes/"
- Tipagens e definições prioritárias devem possuir: "\_" no começo do nome
- Nomes de arquivos: Sempre no singular
- Exemplo: `src/controllers/user.controller.ts`

# Criação de Classes, Interfaces e Enums

- Sempre em inglês, usando 'PascalCase'
- Exemplo: `class UserController {}`
- Exemplo: `interface UserController {}`
- Exemplo: `enum UserController {}`

# Criação de Funções

- Sempre em inglês, usando 'camelCase'
- Exemplo: `function userController() {}`

# Criação de Constantes

- Sempre em inglês, usando 'UPPER_CASE'
- Exemplo: `const USER_CONTROLLER = {}`

# Criação de Variáveis

- Sempre em inglês, usando 'camelCase'
- Exemplo: `let userController = {}`
