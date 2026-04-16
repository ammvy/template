import { TaskPrismaDAO } from "./daos/prisma/task-prisma-dao.js";
import { CategoryPrismaDAO } from "./daos/prisma/category-prisma-dao.js";
import { TaskDrizzleDAO } from "./daos/drizzle/task-drizzle-dao.js";
import { CategoryDrizzleDAO } from "./daos/drizzle/category-drizzle-dao.js";
import { TaskService } from "./services/task-service.js";
import { CategoryService } from "./services/category-service.js";
import { TaskStatus } from "./types/task-status.js";

async function testORM(name: string, taskDao: any, categoryDao: any) {
  console.log(`\n--- Testando ${name} ---`);
  const taskService = new TaskService(taskDao);
  const categoryService = new CategoryService(categoryDao);

  // 1. Testar Categoria Válida
  try {
    const cat = await categoryService.createCategory({ nome: "Trabalho", cor: "#123456" });
    console.log(`[OK] Categoria válida criada: ${cat.nome}`);
  } catch (e: any) {
    console.error(`[FAIL] Erro ao criar categoria válida: ${e.message}`);
  }

  // 2. Testar Categoria Inválida (Cor #000)
  try {
    await categoryService.createCategory({ nome: "Erro", cor: "#000" });
    console.log(`[FAIL] Categoria com cor proibida foi criada indevidamente`);
  } catch (e: any) {
    console.log(`[OK] Validação de cor funcionou: ${e.message}`);
  }

  // 3. Testar Limite de Tarefas
  console.log(`Limpando tarefas existentes para teste de limite...`);
  const tasks = await taskService.getAllTasks();
  for (const t of tasks) {
    await taskService.deleteTask(t.id);
  }

  try {
    console.log(`Criando 10 tarefas PARADO...`);
    for (let i = 1; i <= 10; i++) {
      await taskService.createTask({
        nome: `Tarefa ${i}`,
        descricao: null,
        status: TaskStatus.PARADO,
      });
    }
    console.log(`[OK] 10 tarefas criadas.`);

    console.log(`Tentando criar a 11ª tarefa...`);
    await taskService.createTask({
      nome: "Tarefa 11",
      descricao: null,
      status: TaskStatus.PARADO,
    });
    console.log(`[FAIL] 11ª tarefa foi criada indevidamente`);
  } catch (e: any) {
    console.log(`[OK] Validação de limite funcionou: ${e.message}`);
  }
}

async function run() {
  try {
    await testORM("PRISMA", new TaskPrismaDAO(), new CategoryPrismaDAO());
    await testORM("DRIZZLE", new TaskDrizzleDAO(), new CategoryDrizzleDAO());
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
