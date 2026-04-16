import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { taskRoutes } from "./task.route.js";
import { categoryRoutes } from "./category.route.js";
import { TaskController } from "../../controllers/task.controller.js";
import { CategoryController } from "../../controllers/category.controller.js";
import { TaskService } from "../../services/task.service.js";
import { CategoryService } from "../../services/category.service.js";
import { TaskPrismaDAO } from "../../daos/prisma/task.dao.js";
import { CategoryPrismaDAO } from "../../daos/prisma/category.dao.js";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export async function createFastifyApp() {
  const theme = new SwaggerTheme();
  const content = theme.getBuffer(SwaggerThemeNameEnum.DARK);

  const fastify = Fastify({ logger: false });

  // Swagger setup
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

  fastify.register(swaggerUi, {
    routePrefix: "/",
    theme: {
      css: [{ filename: "theme.css", content: content }],
    },
    uiConfig: {
      persistAuthorization: true,
    },
  });

  // Dependecy Injection
  const taskDao = new TaskPrismaDAO();
  const categoryDao = new CategoryPrismaDAO();

  const taskService = new TaskService(taskDao);
  const categoryService = new CategoryService(categoryDao);

  const taskController = new TaskController(taskService);
  const categoryController = new CategoryController(categoryService);

  fastify.register(async (app) => taskRoutes(app, taskController), {
    prefix: "/tasks",
  });
  fastify.register(async (app) => categoryRoutes(app, categoryController), {
    prefix: "/categories",
  });

  await fastify.ready();

  return fastify;
}
