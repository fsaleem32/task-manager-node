// src/services/taskService.ts
import { AppDataSource } from "../data-source";
import { Task, TaskStatus } from "../entity/Task";

export class TaskService {
  private taskRepo = AppDataSource.getRepository(Task);

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async getTask(id: number): Promise<Task> {
    const t = await this.taskRepo.findOneBy({ id });
    if (!t) throw { status: 404, message: `Task not found: ${id}` };
    return t;
  }

  async createTask(payload: Partial<Task>): Promise<Task> {
    const t = this.taskRepo.create(payload);
    return this.taskRepo.save(t);
  }

  async updateTask(id: number, updated: Partial<Task>): Promise<Task> {
    const existing = await this.getTask(id); // will throw 404 if missing
    existing.title = updated.title ?? existing.title;
    existing.description = updated.description ?? existing.description;
    existing.status = (updated.status as TaskStatus) ?? existing.status;
    existing.dueDate = updated.dueDate ?? existing.dueDate;
    return this.taskRepo.save(existing);
  }

  async deleteTask(id: number): Promise<void> {
    const res = await this.taskRepo.delete({ id });
    if (res.affected === 0) throw { status: 404, message: `Task not found: ${id}` };
  }
}
