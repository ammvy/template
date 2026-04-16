import { db } from "../../db/drizzle/index.js";
import { categorias } from "../../db/drizzle/schema.js";
import { Category } from "../../types/category.js";
import { ICategoryDAO } from "../_interfaces/category-dao.interface.js";
import { eq } from "drizzle-orm";

export class CategoryDrizzleDAO implements ICategoryDAO {
  async create(data: Omit<Category, "id">): Promise<Category> {
    const [row] = await db
      .insert(categorias)
      .values({
        nome: data.nome,
        cor: data.cor,
      })
      .returning();
    return row as Category;
  }

  async list(): Promise<Category[]> {
    const rows = await db.select().from(categorias);
    return rows as Category[];
  }

  async findById(id: number): Promise<Category | null> {
    const [row] = await db
      .select()
      .from(categorias)
      .where(eq(categorias.id, id));
    return (row as Category) || null;
  }

  async update(
    id: number,
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category> {
    const [row] = await db
      .update(categorias)
      .set(data)
      .where(eq(categorias.id, id))
      .returning();
    return row as Category;
  }

  async delete(id: number): Promise<void> {
    await db.delete(categorias).where(eq(categorias.id, id));
  }
}
