import { Category } from "../../types/category";

export interface ICategoryDAO {
  create(data: Omit<Category, "id">): Promise<Category>;
  list(): Promise<Category[]>;
  findById(id: Category["id"]): Promise<Category | null>;
  update(
    id: Category["id"],
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category>;
  delete(id: Category["id"]): Promise<void>;
}
