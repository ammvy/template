import { Category } from "./category";
import { TaskStatus } from "./task-status";

export interface Task {
  id: number;
  nome: string;
  descricao: string | null;
  status: TaskStatus;
  categoriaId?: number;
  categoria?: Category;
}

