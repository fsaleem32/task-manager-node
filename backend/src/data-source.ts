import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "../data/appdb.sqlite"),
  synchronize: true, // dev convenience (like H2). Use migrations in prod.
  logging: false,
  entities: [Task],
  migrations: [],
});