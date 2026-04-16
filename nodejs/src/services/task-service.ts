import { Task } from "../types/task";
import { TaskStatus } from "../types/task-status";
import { ITaskDAO } from "../daos/_interfaces/task-dao.interface";
import { ITaskService } from "./_interfaces/task-service.interface";

export class TaskService implements ITaskService {
  constructor(private readonly taskDao: ITaskDAO) {}

  async createTask(data: Omit<Task, "id">): Promise<Task> {
    if (data.status === TaskStatus.PARADO) {
      const count = await this.taskDao.countByStatus(TaskStatus.PARADO);
      if (count >= 10) {
        throw new Error("Limite de 10 tarefas não iniciadas atingido.");
      }
    }
    return await this.taskDao.create(data);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskDao.list();
  }

  async getTaskById(id: Task["id"]): Promise<Task | null> {
    return await this.taskDao.findById(id);
  }

  async updateTask(
    id: Task["id"],
    data: Partial<Omit<Task, "id">>,
  ): Promise<Task> {
    if (data.status === TaskStatus.PARADO) {
      const count = await this.taskDao.countByStatus(TaskStatus.PARADO);
      if (count >= 10) {
        throw new Error("Limite de 10 tarefas não iniciadas atingido.");
      }
    }
    return await this.taskDao.update(id, data);
  }

  async deleteTask(id: Task["id"]): Promise<void> {
    await this.taskDao.delete(id);
  }
}
