import { db } from "../../db/drizzle/index.js";
import { tarefas } from "../../db/drizzle/schema.js";
import { Task } from "../../types/task.js";
import { TaskStatus } from "../../types/task-status.js";
import { ITaskDAO } from "../_interfaces/task-dao.interface.js";
import { eq, sql } from "drizzle-orm";

export class TaskDrizzleDAO implements ITaskDAO {
  private mapToDomain(row: typeof tarefas.$inferSelect): Task {
    return {
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      status: (row.status === "EM ANDAMENTO"
        ? TaskStatus.EM_ANDAMENTO
        : row.status) as TaskStatus,
    };
  }

  private mapToDBStatus(
    status: TaskStatus,
  ): "PARADO" | "EM ANDAMENTO" | "CONCLUIDA" {
    if (status === TaskStatus.EM_ANDAMENTO) return "EM ANDAMENTO";
    return status as "PARADO" | "CONCLUIDA";
  }

  async create(data: Omit<Task, "id">): Promise<Task> {
    const [row] = await db
      .insert(tarefas)
      .values({
        nome: data.nome,
        descricao: data.descricao,
        status: this.mapToDBStatus(data.status),
      })
      .returning();
    return this.mapToDomain(row);
  }

  async list(): Promise<Task[]> {
    const rows = await db.select().from(tarefas);
    return rows.map((row) => this.mapToDomain(row));
  }

  async findById(id: number): Promise<Task | null> {
    const [row] = await db.select().from(tarefas).where(eq(tarefas.id, id));
    return row ? this.mapToDomain(row) : null;
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
    const updateData: any = { ...data };
    if (data.status) {
      updateData.status = this.mapToDBStatus(data.status);
    }

    const [row] = await db
      .update(tarefas)
      .set(updateData)
      .where(eq(tarefas.id, id))
      .returning();
    return this.mapToDomain(row);
  }

  async delete(id: number): Promise<void> {
    await db.delete(tarefas).where(eq(tarefas.id, id));
  }
}
