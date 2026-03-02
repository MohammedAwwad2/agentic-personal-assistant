import express from "express";
import cors from "cors";
import { router } from "./utils/routes.js";
import { config } from "./config/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(config.server.port, () => {
  console.log(`🚀 Server running on port ${config.server.port}`);
});
