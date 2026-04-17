# PostgreSQL Documentation

O **PostgreSQL** é amplamente considerado o banco de dados relacional de código aberto mais avançado do mundo, focado em extensibilidade e conformidade com padrões.

## Diferenciais Práticos
- **Complexidade e Integridade**: Excelente para lidar com consultas complexas, joins pesados e garantir integridade de dados rigorosa.
- **Tipos de Dados**: Suporta nativamente tipos avançados como JSONB (permitindo consultas rápidas em dados não estruturados), Arrays, e tipos geométricos.
- **Concorrência**: Gerencia melhor múltiplas conexões simultâneas de escrita/leitura pesada sem degradar a performance drasticamente.

## Configuração no Projeto
Neste template, o PostgreSQL está configurado no `docker-compose.yml`:
- **Imagem**: `postgres:15`
- **Porta Externa**: `5433` (mapeada para a 5432 interna).
- **Database padrão**: `tasks_db`

## Quando escolher PostgreSQL?
- Casos de uso que exigem processamento de dados complexos ou transações pesadas.
- Necessidade de armazenar metadados em formato JSONB com alta performance de busca.
- Projetos que buscam máxima conformidade com o padrão SQL ISO/IEC.
- Aplicações de análise de dados ou sistemas geográficos (via PostGIS).
