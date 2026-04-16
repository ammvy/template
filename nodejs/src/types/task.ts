import { TaskStatus } from "./task-status.js";

export interface Task {
  id: number;
  nome: string;
  descricao: string | null;
  status: TaskStatus;
}
