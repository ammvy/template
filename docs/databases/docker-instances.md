# Database Docker Instances

Este documento explica as instâncias de banco de dados configuradas no arquivo `docker-compose.yml` da raiz do projeto. Utilizamos Docker para garantir que o ambiente de desenvolvimento seja consistente para todos os colaboradores.

## Overview

O projeto disponibiliza duas instâncias de banco de dados relacionais: **MySQL** e **PostgreSQL**. Ambas são inicializadas simultaneamente ao executar o comando:

```bash
docker compose up -d
```

---

## 1. MySQL Instance

A instância do MySQL é ideal para projetos que priorizam performance de leitura e simplicidade.

### Configurações Técnicas
- **Serviço**: `mysql`
- **Imagem**: `mysql:8.0`
- **Nome do Container**: `template-mysql`
- **Portas**: `3307:3306`
  - A porta interna **3306** é mapeada para a porta externa **3307** da sua máquina para evitar conflitos com outras instâncias locais do MySQL.
- **Volumes**: `mysql_data` mapeado para `/var/lib/mysql`.
  - Garante que os dados persistam mesmo que o container seja removido.

### Variáveis de Ambiente
- `MYSQL_ROOT_PASSWORD`: `password`
- `MYSQL_DATABASE`: `tasks_db`

---

## 2. PostgreSQL Instance

A instância do PostgreSQL é voltada para casos de uso que exigem maior conformidade com padrões SQL e suporte a tipos de dados avançados (como JSONB).

### Configurações Técnicas
- **Serviço**: `postgres`
- **Imagem**: `postgres:15`
- **Nome do Container**: `template-postgres`
- **Portas**: `5433:5432`
  - A porta interna **5432** é mapeada para a porta externa **5433** da sua máquina.
- **Volumes**: `postgres_data` mapeado para `/var/lib/postgresql/data`.

### Variáveis de Ambiente
- `POSTGRES_USER`: `postgres`
- `POSTGRES_PASSWORD`: `password`
- `POSTGRES_DB`: `tasks_db`

---

## Persistência de Dados

Os volumes são definidos globalmente no final do arquivo `docker-compose.yml`:

```yaml
volumes:
  mysql_data:
  postgres_data:
```

Isso garante que, ao rodar `docker compose down`, os dados não sejam perdidos. Para limpar os bancos de dados completamente, utilize `docker compose down -v`.
