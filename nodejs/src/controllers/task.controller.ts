import { Task } from "../types/task";
import { TaskStatus } from "../types/task-status";
import { ITaskService } from "../services/_interfaces/task-service.interface";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BusinessError";
  }
}

export interface CreateTaskInput {
  nome: string;
  descricao?: string | null;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  nome?: string;
  descricao?: string | null;
  status?: TaskStatus;
}

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  async getAll(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  async getById(id: Task["id"]): Promise<Task> {
    const task = await this.taskService.getTaskById(id);
    if (!task) throw new NotFoundError(`Tarefa com id ${id} não encontrada.`);
    return task;
  }

  async create(input: CreateTaskInput): Promise<Task> {
    try {
      return await this.taskService.createTask({
        nome: input.nome,
        descricao: input.descricao ?? null,
        status: input.status ?? TaskStatus.PARADO,
      });
    } catch (e) {
      if (e instanceof Error) throw new BusinessError(e.message);
      throw e;
    }
  }

  async update(id: Task["id"], input: UpdateTaskInput): Promise<Task> {
    try {
      return await this.taskService.updateTask(id, input);
    } catch (e) {
      if (e instanceof Error) throw new BusinessError(e.message);
      throw e;
    }
  }

  async remove(id: Task["id"]): Promise<void> {
    await this.taskService.deleteTask(id);
  }
}
