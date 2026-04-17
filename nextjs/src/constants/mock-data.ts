import { Category } from "@/types/category";
import { Task } from "@/types/task";
import { TaskStatus } from "@/types/task-status";

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, nome: "Trabalho", cor: "#45B7D1" },
  { id: 2, nome: "Estudo", cor: "#9D84B7" },
  { id: 3, nome: "Pessoal", cor: "#6BCB77" },
  { id: 4, nome: "Urgente", cor: "#FF6B6B" },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    nome: "Estudar Next.js",
    descricao: "Revisar Server Components e Hooks customizados",
    status: TaskStatus.EM_ANDAMENTO,
    categoriaId: 2,
    categoria: MOCK_CATEGORIES[1],
  },
  {
    id: 2,
    nome: "Finalizar Template",
    descricao: "Limpar o código e preparar para produção",
    status: TaskStatus.PARADO,
    categoriaId: 1,
    categoria: MOCK_CATEGORIES[0],
  },
  {
    id: 3,
    nome: "Comprar Café",
    descricao: "Café em grãos para a semana",
    status: TaskStatus.CONCLUIDA,
    categoriaId: 3,
    categoria: MOCK_CATEGORIES[2],
  },
  {
    id: 4,
    nome: "Reunião de Alinhamento",
    descricao: "Discussão sobre o novo roadmap",
    status: TaskStatus.PARADO,
    categoriaId: 4,
    categoria: MOCK_CATEGORIES[3],
  },
];
