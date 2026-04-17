# UI Components (`src/components/`)

Componentes puramente visuais, de escopo raso e sem acoplamento com lógica de negócio.

## Características
- **Dumb Components**: Não sabem de onde o dado vem, apenas como mostrá-lo.
- **Baseados em Props**: Toda a variação e comportamento são injetados via propriedades.
- **Reutilização Total**: Podem ser usados em qualquer módulo do sistema.

## Exemplos
- `button.tsx`: Estilização premium de botão com suporte a variantes (primary, ghost, danger).
- `input.tsx`: Componente de entrada com estados de foco e erro padronizados.
- `modal.tsx`: Estrutura base de overlay para diálogos.

## Regra de Ouro
Componentes nesta pasta **nunca** devem importar hooks de API ou lidar com regras de negócio.
