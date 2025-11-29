import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from "express";
import userRouter from "./presentation/routes/user.router";

const app = express();

app.use(express.json());

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Error";

  return res.status(status).json({
    error: message
  });
};

app.use(userRouter);

app.use(errorHandler);
app.listen(3000);
