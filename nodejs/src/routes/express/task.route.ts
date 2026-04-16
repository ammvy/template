import { Router, Request, Response, NextFunction } from "express";
import {
  TaskController,
  NotFoundError,
  BusinessError,
} from "../../controllers/task.controller";

export function taskRouter(controller: TaskController): Router {
  const router = Router();

  /**
   * @openapi
   * /tasks:
   *   get:
   *     summary: Lista todas as tarefas
   *     tags: [Tasks]
   *     responses:
   *       200:
   *         description: Lista de tarefas retornada com sucesso
   */
  router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await controller.getAll();
      res.json(tasks);
    } catch (e) {
      next(e);
    }
  });

  /**
   * @openapi
   * /tasks/{id}:
   *   get:
   *     summary: Busca uma tarefa por ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   */
  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const task = await controller.getById(Number(req.params.id));
        res.json(task);
      } catch (e) {
        if (e instanceof NotFoundError)
          return res.status(404).json({ error: e.message });
        next(e);
      }
    },
  );

  /**
   * @openapi
   * /tasks:
   *   post:
   *     summary: Cria uma nova tarefa
   *     tags: [Tasks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nome]
   *             properties:
   *               nome: { type: string }
   *               descricao: { type: string }
   *               status: { type: string, enum: [PARADO, EM_ANDAMENTO, CONCLUIDA] }
   */
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await controller.create(req.body);
      res.status(201).json(task);
    } catch (e) {
      if (e instanceof BusinessError)
        return res.status(400).json({ error: e.message });
      next(e);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const task = await controller.update(Number(req.params.id), req.body);
      res.json(task);
    } catch (e) {
      if (e instanceof NotFoundError)
        return res.status(404).json({ error: e.message });
      if (e instanceof BusinessError)
        return res.status(400).json({ error: e.message });
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      await controller.remove(Number(req.params.id));
      res.status(204).send();
    } catch (e) {
      if (e instanceof NotFoundError)
        return res.status(404).json({ error: e.message });
      next(e);
    }
  });

  return router;
}
