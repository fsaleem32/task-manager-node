// src/entity/Task.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 50, default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: "date", nullable: true })
  dueDate?: string; // stored as 'YYYY-MM-DD' (string)
}
