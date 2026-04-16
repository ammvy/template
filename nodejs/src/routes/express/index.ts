import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { taskRouter } from "./task.route";
import { categoryRouter } from "./category.route";
import { TaskController } from "../../controllers/task.controller";
import { CategoryController } from "../../controllers/category.controller";
import { TaskService } from "../../services/task.service";
import { CategoryService } from "../../services/category.service";
import { TaskDrizzleDAO } from "../../daos/drizzle/task.dao";
import { CategoryDrizzleDAO } from "../../daos/drizzle/category.dao";

export function createExpressApp(): Express {
  const app = express();

  // CORS configuration - allow all requests
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false,
    }),
  );

  app.use(express.json());

  // Dependecy Injection
  const taskDao = new TaskDrizzleDAO();
  const categoryDao = new CategoryDrizzleDAO();

  const taskService = new TaskService(taskDao);
  const categoryService = new CategoryService(categoryDao);

  const taskController = new TaskController(taskService);
  const categoryController = new CategoryController(categoryService);

  // Swagger setup
  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Tasks API (Express)",
        version: "1.0.0",
        description: "Template API with Express and Prisma",
      },
      components: {
        schemas: {
          Task: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              descricao: { type: "string", nullable: true },
              status: {
                type: "string",
                enum: ["PARADO", "EM_ANDAMENTO", "CONCLUIDA"],
              },
            },
          },
          Category: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              cor: { type: "string" },
            },
          },
          ErrorResponse: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          CreateTaskInput: {
            type: "object",
            required: ["nome"],
            properties: {
              nome: { type: "string" },
              descricao: { type: "string" },
              status: {
                type: "string",
                enum: ["PARADO", "EM_ANDAMENTO", "CONCLUIDA"],
              },
            },
          },
          UpdateTaskInput: {
            type: "object",
            properties: {
              nome: { type: "string" },
              descricao: { type: "string" },
              status: {
                type: "string",
                enum: ["PARADO", "EM_ANDAMENTO", "CONCLUIDA"],
              },
            },
          },
        },
      },
    },
    apis: ["./src/routes/express/*.ts"],
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routes
  app.use("/tasks", taskRouter(taskController));
  app.use("/categories", categoryRouter(categoryController));

  return app;
}
