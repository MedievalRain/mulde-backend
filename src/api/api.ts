import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { corsOptions } from "../config/cors";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { userRouter } from "./routes/userRouter";
import { adminRouter } from "./routes/adminRouter";

const apiRouter = express.Router();
apiRouter.use(cookieParser());
apiRouter.use(cors(corsOptions));
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use("/user", userRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use(errorMiddleware);

export { apiRouter };
