# Guia de Commits Semânticos (Conventional Commits)

Este guia descreve os principais padrões para mensagens de commit, baseados na especificação [Conventional Commits](https://www.conventionalcommits.org/).

## Estrutura do Commit

```text
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(ais)]
```

## Principais Tipos

| Tipo | Descrição |
| :--- | :--- |
| **feat** | Uma nova funcionalidade para o usuário, não uma nova funcionalidade para um script de build. |
| **fix** | Um bug fix para o usuário, não um fix para um script de build. |
| **docs** | Mudanças apenas na documentação. |
| **style** | Mudanças que não afetam o significado do código (espaço em branco, formatação, falta de ponto e vírgula, etc). |
| **refactor** | Uma mudança de código que nem corrige um bug nem adiciona uma funcionalidade. |
| **perf** | Uma mudança de código que melhora o desempenho. |
| **test** | Adicionando testes ausentes ou corrigindo testes existentes. |
| **build** | Mudanças que afetam o sistema de build ou dependências externas (ex: gulp, broccoli, npm). |
| **ci** | Mudanças em nossos arquivos e scripts de configuração de CI (ex: Travis, Circle, GitHub Actions). |
| **chore** | Outras mudanças que não modificam arquivos `src` ou de teste. |
| **revert** | Reverte um commit anterior. |

## Exemplos

- **Simples:** `feat: adiciona sistema de login`
- **Com escopo:** `fix(api): corrige timeout na rota de usuários`
- **Documentação:** `docs: atualiza README com instruções de instalação`
- **Breaking Change:**
  ```text
  feat: altera protocolo de autenticação

  BREAKING CHANGE: o campo 'token' agora é obrigatório no header.
  ```

---
> [!TIP]
> O uso de commits semânticos facilita a geração automática de changelogs e a compreensão do histórico do projeto por outros desenvolvedores.
