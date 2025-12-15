// src/controllers/taskController.ts
import { Router, Request, Response, NextFunction } from "express";
import { TaskService } from "../services/taskService";

const router = Router();
const taskService = new TaskService();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const task = await taskService.getTask(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const created = await taskService.createTask(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await taskService.updateTask(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
