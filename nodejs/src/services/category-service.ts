import { Category } from "../types/category";
import { ICategoryService } from "./_interfaces/category-service.interface";
import { ICategoryDAO } from "../daos/_interfaces/category-dao.interface";

export class CategoryService implements ICategoryService {
  constructor(private readonly categoryDao: ICategoryDAO) {}

  private validateColor(color: string): void {
    const forbidden = ["#000", "#FFF", "black", "white", "#000000", "#FFFFFF"];
    if (forbidden.includes(color.toLowerCase())) {
      throw new Error(`A cor ${color} não é permitida para categorias.`);
    }
  }

  async createCategory(data: Omit<Category, "id">): Promise<Category> {
    this.validateColor(data.cor);
    return await this.categoryDao.create(data);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryDao.list();
  }

  async getCategoryById(id: Category["id"]): Promise<Category | null> {
    return await this.categoryDao.findById(id);
  }

  async updateCategory(
    id: Category["id"],
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category> {
    if (data.cor) {
      this.validateColor(data.cor);
    }
    return await this.categoryDao.update(id, data);
  }

  async deleteCategory(id: Category["id"]): Promise<void> {
    await this.categoryDao.delete(id);
  }
}
