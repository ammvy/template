import { pgTable, serial, text, pgEnum, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum("status", ["PARADO", "EM ANDAMENTO", "CONCLUIDA"]);

export const tarefas = pgTable("tarefas", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  descricao: text("descricao"),
  status: statusEnum("status").notNull().default("PARADO"),
});

export const categorias = pgTable("categorias", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  cor: text("cor").notNull(),
});

export const tarefasParaCategorias = pgTable(
  "tarefas_para_categorias",
  {
    tarefaId: integer("tarefa_id")
      .notNull()
      .references(() => tarefas.id),
    categoriaId: integer("categoria_id")
      .notNull()
      .references(() => categorias.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tarefaId, t.categoriaId] }),
  })
);

export const tarefasRelations = relations(tarefas, ({ many }) => ({
  tarefasParaCategorias: many(tarefasParaCategorias),
}));

export const categoriasRelations = relations(categorias, ({ many }) => ({
  tarefasParaCategorias: many(tarefasParaCategorias),
}));

export const tarefasParaCategoriasRelations = relations(tarefasParaCategorias, ({ one }) => ({
  tarefa: one(tarefas, {
    fields: [tarefasParaCategorias.tarefaId],
    references: [tarefas.id],
  }),
  categoria: one(categorias, {
    fields: [tarefasParaCategorias.categoriaId],
    references: [categorias.id],
  }),
}));
