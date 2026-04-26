import express from "express";
import multer from "multer";
import { uploadPDF } from "../controller/pdfController.js";

const router = express.Router();

// store in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("pdf"), uploadPDF);

export default router;
