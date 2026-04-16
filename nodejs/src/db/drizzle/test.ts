import "dotenv/config";
import { db } from "./index"; // Using .js for ESM compatibility if needed, or just index
import { tarefas, categorias, tarefasParaCategorias } from "./schema";

async function test() {
  console.log("--- Testing Drizzle Connection ---");
  try {
    const allTarefas = await db.select().from(tarefas);
    const allCategorias = await db.select().from(categorias);
    const relations = await db.select().from(tarefasParaCategorias);

    console.log("Tarefas count:", allTarefas.length);
    console.log("Categorias count:", allCategorias.length);
    console.log("Relations count:", relations.length);

    if (allTarefas.length > 0) console.log("First Tarefa:", allTarefas[0]);

    console.log("--- Drizzle test finished successfully ---");
  } catch (error) {
    console.error("Drizzle test failed!");
    console.error(error);
    process.exit(1);
  }
}

await test();
process.exit(0);
