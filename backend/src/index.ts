// src/index.ts
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import taskRouter from "./controllers/taskController";
import { errorHandler } from "./middleware/errorHandler";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

async function main() {
  await AppDataSource.initialize();
  console.log("Data source initialized");

  const app = express();
  app.use(cors({ origin: "http://localhost:5173" })); // same as Java CORS hint
  app.use(express.json());

  app.use("/api/tasks", taskRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Error during Data Source initialization:", err);
});
