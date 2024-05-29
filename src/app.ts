import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const test = (req: Request, res: Response) => {
  const a = 22;
  res.send(a);
};
app.get("/", test);

// global error handling
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
