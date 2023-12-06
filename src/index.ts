import express from "express";
import { apiRouter } from "./api/api";
import { initDatabase } from "./infrastructure/database/init";

const runServer = () => {
  const app = express();
  app.use("/mulde", apiRouter);
  app.listen(8000, () => {
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:${8000}`);
  });
};

initDatabase().then(runServer);
