import express from "express";
import { ChatController } from "../controllers/ChatController.js";
import { IngestionController } from "../controllers/IngestionController.js";
import { createUploadMiddleware } from "../middleware/upload.js";

const router = express.Router();
const upload = createUploadMiddleware();

router.post("/chat", ChatController.handleChat);
router.post("/ingest", upload.single("file"), IngestionController.handleIngestion);

export { router };
