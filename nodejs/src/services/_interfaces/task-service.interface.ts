import { Task } from "../../types/task";

export interface ITaskService {
  createTask(data: Omit<Task, "id">): Promise<Task>;
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: Task["id"]): Promise<Task | null>;
  updateTask(id: Task["id"], data: Partial<Omit<Task, "id">>): Promise<Task>;
  deleteTask(id: Task["id"]): Promise<void>;
}
