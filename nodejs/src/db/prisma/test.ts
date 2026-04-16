import { prisma } from "./index";

async function test() {
  console.log("--- Testing Prisma Connection ---");
  try {
    const tarefas = await prisma.tarefa.findMany();
    const categorias = await prisma.categoria.findMany();

    console.log("Tarefas:", tarefas);
    console.log("Categorias:", categorias);
    
    console.log("--- Prisma test finished successfully ---");
  } catch (error) {
    console.error("Prisma test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
