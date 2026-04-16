import { db } from "../../db/drizzle/index";
import { tarefas, categorias } from "../../db/drizzle/schema";
import { Task } from "../../types/task";
import { TaskStatus } from "../../types/task-status";
import { ITaskDAO } from "../_interfaces/task-dao.interface";
import { eq, sql } from "drizzle-orm";

export class TaskDrizzleDAO implements ITaskDAO {
  private mapToDomain(
    taskRow: typeof tarefas.$inferSelect,
    categoryRow?: typeof categorias.$inferSelect | null,
  ): Task {
    return {
      id: taskRow.id,
      nome: taskRow.nome,
      descricao: taskRow.descricao,
      status: (taskRow.status === "EM ANDAMENTO"
        ? TaskStatus.EM_ANDAMENTO
        : taskRow.status) as TaskStatus,
      categoriaId: taskRow.categoriaId,
      categoria: categoryRow
        ? {
            id: categoryRow.id,
            nome: categoryRow.nome,
            cor: categoryRow.cor,
          }
        : undefined,
    };
  }

  private mapToDBStatus(
    status: TaskStatus,
  ): "PARADO" | "EM ANDAMENTO" | "CONCLUIDA" {
    if (status === TaskStatus.EM_ANDAMENTO) return "EM ANDAMENTO";
    return status as "PARADO" | "CONCLUIDA";
  }

  async create(data: Omit<Task, "id" | "categoria">): Promise<Task> {
    const [row] = await db
      .insert(tarefas)
      .values({
        nome: data.nome,
        descricao: data.descricao,
        status: this.mapToDBStatus(data.status),
        categoriaId: data.categoriaId,
      })
      .returning();
    return this.mapToDomain(row);
  }

  async list(): Promise<Task[]> {
    const rows = await db
      .select({
        tarefa: tarefas,
        categoria: categorias,
      })
      .from(tarefas)
      .leftJoin(categorias, eq(tarefas.categoriaId, categorias.id));

    return rows.map((row) => this.mapToDomain(row.tarefa, row.categoria));
  }

  async findById(id: number): Promise<Task | null> {
    const [row] = await db
      .select({
        tarefa: tarefas,
        categoria: categorias,
      })
      .from(tarefas)
      .leftJoin(categorias, eq(tarefas.categoriaId, categorias.id))
      .where(eq(tarefas.id, id));

    return row ? this.mapToDomain(row.tarefa, row.categoria) : null;
  }

  async countByStatus(status: TaskStatus): Promise<number> {
    const dbStatus = this.mapToDBStatus(status);
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(tarefas)
      .where(eq(tarefas.status, dbStatus));
    return Number(result.count);
  }

  async update(id: number, data: Partial<Omit<Task, "id">>): Promise<Task> {
    const updateData: any = {};
    if (data.nome !== undefined) updateData.nome = data.nome;
    if (data.descricao !== undefined) updateData.descricao = data.descricao;
    if (data.status !== undefined)
      updateData.status = this.mapToDBStatus(data.status);
    if (data.categoriaId !== undefined)
      updateData.categoriaId = data.categoriaId;

    const [row] = await db
      .update(tarefas)
      .set(updateData)
      .where(eq(tarefas.id, id))
      .returning();

    // To return the full object with category, we might need another select or findById
    return this.findById(id) as Promise<Task>;
  }

  async delete(id: number): Promise<void> {
    await db.delete(tarefas).where(eq(tarefas.id, id));
  }
}

