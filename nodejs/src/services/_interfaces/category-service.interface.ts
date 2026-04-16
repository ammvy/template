import { Category } from "../../types/category";

export interface ICategoryService {
  createCategory(data: Omit<Category, "id">): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: Category["id"]): Promise<Category | null>;
  updateCategory(
    id: Category["id"],
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category>;
  deleteCategory(id: Category["id"]): Promise<void>;
}
