import { FastifyInstance, FastifyPluginAsync } from "fastify";
import {
  TaskController,
  NotFoundError,
  BusinessError,
} from "../../controllers/task.controller";

const taskSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    nome: { type: "string" },
    descricao: { type: ["string", "null"] },
    status: { type: "string", enum: ["PARADO", "EM_ANDAMENTO", "CONCLUIDA"] },
  },
};

const errorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export async function taskRoutes(
  fastify: FastifyInstance,
  controller: TaskController,
) {
  fastify.get("/", {
    schema: {
      tags: ["Tasks"],
      summary: "Lista todas as tarefas",
      response: {
        200: { type: "array", items: taskSchema },
      },
    },
    handler: async () => {
      return await controller.getAll();
    },
  });

  fastify.get<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Tasks"],
      summary: "Busca tarefa por ID",
      params: {
        type: "object",
        properties: { id: { type: "integer" } },
      },
      response: {
        200: taskSchema,
        404: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        return await controller.getById(Number(req.params.id));
      } catch (e) {
        if (e instanceof NotFoundError)
          return reply.status(404).send({ error: e.message });
        throw e;
      }
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["Tasks"],
      summary: "Cria uma nova tarefa",
      body: {
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
      response: {
        201: taskSchema,
        400: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        const task = await controller.create(req.body as any);
        return reply.status(201).send(task);
      } catch (e) {
        if (e instanceof BusinessError)
          return reply.status(400).send({ error: e.message });
        throw e;
      }
    },
  });

  fastify.put<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Tasks"],
      summary: "Atualiza uma tarefa",
      params: { type: "object", properties: { id: { type: "integer" } } },
      body: {
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
      response: {
        200: taskSchema,
        400: errorSchema,
        404: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        return await controller.update(Number(req.params.id), req.body as any);
      } catch (e) {
        if (e instanceof NotFoundError)
          return reply.status(404).send({ error: e.message });
        if (e instanceof BusinessError)
          return reply.status(400).send({ error: e.message });
        throw e;
      }
    },
  });

  fastify.delete<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Tasks"],
      summary: "Remove uma tarefa",
      params: { type: "object", properties: { id: { type: "integer" } } },
      response: {
        204: { type: "null" },
        404: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        await controller.remove(Number(req.params.id));
        return reply.status(204).send();
      } catch (e) {
        if (e instanceof NotFoundError)
          return reply.status(404).send({ error: e.message });
        throw e;
      }
    },
  });
}
