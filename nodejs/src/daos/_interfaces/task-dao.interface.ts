import { Task } from "../../types/task.js";
import { TaskStatus } from "../../types/task-status.js";

export interface ITaskDAO {
  create(data: Omit<Task, "id">): Promise<Task>;
  list(): Promise<Task[]>;
  findById(id: Task["id"]): Promise<Task | null>;
  countByStatus(status: TaskStatus): Promise<number>;
  update(id: Task["id"], data: Partial<Omit<Task, "id">>): Promise<Task>;
  delete(id: Task["id"]): Promise<void>;
}
