import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  if (err && typeof err === "object" && "status" in err) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
}
