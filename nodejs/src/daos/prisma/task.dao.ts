import { prisma } from "../../db/prisma";
import { Task } from "../../types/task";
import { TaskStatus } from "../../types/task-status";
import { ITaskDAO } from "../_interfaces/task-dao.interface";
import { Status as PrismaStatus } from "@prisma/client";

export class TaskPrismaDAO implements ITaskDAO {
  async create(data: Omit<Task, "id">): Promise<Task> {
    const task = await prisma.tarefa.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        status: data.status as PrismaStatus,
        ...(data.categoriaId && {
          categorias: {
            connect: {
              id: data.categoriaId,
            },
          },
        }),
      },
      include: { categorias: true },
    });
    return task as Task;
  }

  async list(): Promise<Task[]> {
    const tasks = await prisma.tarefa.findMany({
      include: { categorias: true },
    });
    return tasks as Task[];
  }

  async findById(id: number): Promise<Task | null> {
    const task = await prisma.tarefa.findUnique({
      where: { id },
      include: { categorias: true },
    });
    return task as Task | null;
  }

  async countByStatus(status: TaskStatus): Promise<number> {
    return await prisma.tarefa.count({
      where: { status: status as PrismaStatus },
    });
  }

  async update(id: number, data: Partial<Omit<Task, "id">>): Promise<Task> {
    const updateData: any = {
      nome: data.nome,
      descricao: data.descricao,
      status: data.status as PrismaStatus | undefined,
      categoriaId: data.categoriaId,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    const task = await prisma.tarefa.update({
      where: { id },
      data: updateData,
      include: { categorias: true },
    });
    return task as Task;
  }

  async delete(id: number): Promise<void> {
    await prisma.tarefa.delete({
      where: { id },
    });
  }
}
