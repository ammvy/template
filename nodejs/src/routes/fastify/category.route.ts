import { FastifyInstance } from "fastify";
import { CategoryController } from "../../controllers/category.controller.js";
import { NotFoundError, BusinessError } from "../../controllers/task.controller.js";

const categorySchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    nome: { type: "string" },
    cor: { type: "string" },
  },
};

const errorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export async function categoryRoutes(fastify: FastifyInstance, controller: CategoryController) {
  fastify.get("/", {
    schema: {
      tags: ["Categories"],
      summary: "Lista todas as categorias",
      response: {
        200: { type: "array", items: categorySchema },
      },
    },
    handler: async () => {
      return await controller.getAll();
    },
  });

  fastify.get<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Categories"],
      summary: "Busca categoria por ID",
      params: { type: "object", properties: { id: { type: "integer" } } },
      response: {
        200: categorySchema,
        404: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        return await controller.getById(Number(req.params.id));
      } catch (e) {
        if (e instanceof NotFoundError) return reply.status(404).send({ error: e.message });
        throw e;
      }
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["Categories"],
      summary: "Cria uma nova categoria",
      body: {
        type: "object",
        required: ["nome", "cor"],
        properties: {
          nome: { type: "string" },
          cor: { type: "string" },
        },
      },
      response: {
        201: categorySchema,
        400: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        const category = await controller.create(req.body as any);
        return reply.status(201).send(category);
      } catch (e) {
        if (e instanceof BusinessError) return reply.status(400).send({ error: e.message });
        throw e;
      }
    },
  });

  fastify.put<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Categories"],
      summary: "Atualiza uma categoria",
      params: { type: "object", properties: { id: { type: "integer" } } },
      body: {
        type: "object",
        properties: {
          nome: { type: "string" },
          cor: { type: "string" },
        },
      },
      response: {
        200: categorySchema,
        400: errorSchema,
        404: errorSchema,
      },
    },
    handler: async (req, reply) => {
      try {
        return await controller.update(Number(req.params.id), req.body as any);
      } catch (e) {
        if (e instanceof NotFoundError) return reply.status(404).send({ error: e.message });
        if (e instanceof BusinessError) return reply.status(400).send({ error: e.message });
        throw e;
      }
    },
  });

  fastify.delete<{ Params: { id: string } }>("/:id", {
    schema: {
      tags: ["Categories"],
      summary: "Remove uma categoria",
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
        if (e instanceof NotFoundError) return reply.status(404).send({ error: e.message });
        throw e;
      }
    },
  });
}
