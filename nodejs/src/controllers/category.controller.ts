import { Category } from "../types/category";
import { ICategoryService } from "../services/_interfaces/category-service.interface";
import { BusinessError, NotFoundError } from "./task.controller";

export interface CreateCategoryInput {
  nome: string;
  cor: string;
}

export interface UpdateCategoryInput {
  nome?: string;
  cor?: string;
}

export class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {}

  async getAll(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  async getById(id: Category["id"]): Promise<Category> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category)
      throw new NotFoundError(`Categoria com id ${id} não encontrada.`);
    return category;
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    try {
      return await this.categoryService.createCategory(input);
    } catch (e) {
      if (e instanceof Error) throw new BusinessError(e.message);
      throw e;
    }
  }

  async update(
    id: Category["id"],
    input: UpdateCategoryInput,
  ): Promise<Category> {
    try {
      return await this.categoryService.updateCategory(id, input);
    } catch (e) {
      if (e instanceof Error) throw new BusinessError(e.message);
      throw e;
    }
  }

  async remove(id: Category["id"]): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
