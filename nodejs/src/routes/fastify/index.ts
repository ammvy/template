import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import path from "path";
import { createRequire } from "module";
import { taskRoutes } from "./task.route.js";
import { categoryRoutes } from "./category.route.js";
import { TaskController } from "../../controllers/task.controller.js";
import { CategoryController } from "../../controllers/category.controller.js";
import { TaskService } from "../../services/task.service.js";
import { CategoryService } from "../../services/category.service.js";
import { TaskPrismaDAO } from "../../daos/prisma/task.dao.js";
import { CategoryPrismaDAO } from "../../daos/prisma/category.dao.js";

// Configuração de ambiente para ESM
const require = createRequire(import.meta.url);
const swaggerUiPath = path.join(
  path.dirname(require.resolve("@fastify/swagger-ui")),
  "static",
);

export async function createFastifyApp() {
  const fastify = Fastify({ logger: false });

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Tasks API (Fastify)",
        version: "1.0.0",
        description: "API de Tarefas usando Fastify 5 + Prisma",
      },
      tags: [{ name: "Tasks" }, { name: "Categories" }],
      servers: [{ url: "http://localhost:3334" }],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Dependecy Injection
  const taskDao = new TaskPrismaDAO();
  const categoryDao = new CategoryPrismaDAO();

  const taskService = new TaskService(taskDao);
  const categoryService = new CategoryService(categoryDao);

  const taskController = new TaskController(taskService);
  const categoryController = new CategoryController(categoryService);

  // 3. Register Routes
  fastify.register(async (app) => taskRoutes(app, taskController), {
    prefix: "/tasks",
  });
  fastify.register(async (app) => categoryRoutes(app, categoryController), {
    prefix: "/categories",
  });

  await fastify.ready();

  return fastify;
}
