import express from "express";
import { ragQuery } from "../controller/RagController.js";

const router = express.Router();
router.post("/query", ragQuery);

export default router;
