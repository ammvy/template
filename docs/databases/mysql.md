# MySQL Documentation

O **MySQL** é um dos sistemas de gerenciamento de banco de dados relacionais (RDBMS) mais populares do mundo, conhecido por sua confiabilidade e facilidade de uso.

## Diferenciais Práticos
- **Performance de Leitura**: Historicamente, o MySQL é extremamente otimizado para cargas de trabalho com alta frequência de leitura e baixa complexidade de joins.
- **Ecossistema**: Possui a maior comunidade e suporte de ferramentas de terceiros no mercado.
- **Dialeto SQL**: Utiliza o padrão SQL com algumas extensões específicas que facilitam consultas simples.

## Configuração no Projeto
Neste template, o MySQL está configurado no `docker-compose.yml`:
- **Imagem**: `mysql:8.0`
- **Porta Externa**: `3307` (mapeada para a 3306 interna para evitar conflitos com instalações locais).
- **Database padrão**: `tasks_db`

## Quando escolher MySQL?
- Projetos que exigem simplicidade e rapidez em consultas de leitura.
- Aplicações web tradicionais (CMS, blogs, e-commerces simples).
- Ambientes onde a equipe já possui forte domínio sobre o ecossistema MySQL.
