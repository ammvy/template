import { prisma } from "../../db/prisma";
import { Category } from "../../types/category";
import { ICategoryDAO } from "../_interfaces/category-dao.interface";

export class CategoryPrismaDAO implements ICategoryDAO {
  async create(data: Omit<Category, "id">): Promise<Category> {
    const category = await prisma.categoria.create({
      data: {
        nome: data.nome,
        cor: data.cor,
      },
    });
    return category as Category;
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.categoria.findMany();
    return categories as Category[];
  }

  async findById(id: number): Promise<Category | null> {
    const category = await prisma.categoria.findUnique({
      where: { id },
    });
    return category as Category | null;
  }

  async update(
    id: number,
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category> {
    const category = await prisma.categoria.update({
      where: { id },
      data: {
        nome: data.nome,
        cor: data.cor,
      },
    });
    return category as Category;
  }

  async delete(id: number): Promise<void> {
    await prisma.categoria.delete({
      where: { id },
    });
  }
}
