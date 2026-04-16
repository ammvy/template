import { Router, Request, Response, NextFunction } from "express";
import { CategoryController } from "../../controllers/category.controller.js";
import { NotFoundError, BusinessError } from "../../controllers/task.controller.js";

export function categoryRouter(controller: CategoryController): Router {
  const router = Router();

  /**
   * @openapi
   * /categories:
   *   get:
   *     summary: Lista todas as categorias
   *     tags: [Categories]
   *     responses:
   *       200:
   *         description: Lista de categorias
   */
  router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await controller.getAll();
      res.json(categories);
    } catch (e) {
      next(e);
    }
  });

  /**
   * @openapi
   * /categories/{id}:
   *   get:
   *     summary: Busca categoria por ID
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: integer }
   */
  router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await controller.getById(Number(req.params.id));
      res.json(category);
    } catch (e) {
      if (e instanceof NotFoundError) return res.status(404).json({ error: e.message });
      next(e);
    }
  });

  /**
   * @openapi
   * /categories:
   *   post:
   *     summary: Cria nova categoria
   *     tags: [Categories]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nome, cor]
   *             properties:
   *               nome: { type: string }
   *               cor: { type: string }
   */
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await controller.create(req.body);
      res.status(201).json(category);
    } catch (e) {
      if (e instanceof BusinessError) return res.status(400).json({ error: e.message });
      next(e);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const category = await controller.update(Number(req.params.id), req.body);
      res.json(category);
    } catch (e) {
      if (e instanceof NotFoundError) return res.status(404).json({ error: e.message });
      if (e instanceof BusinessError) return res.status(400).json({ error: e.message });
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      await controller.remove(Number(req.params.id));
      res.status(204).send();
    } catch (e) {
      if (e instanceof NotFoundError) return res.status(404).json({ error: e.message });
      next(e);
    }
  });

  return router;
}
