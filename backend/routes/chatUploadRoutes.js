import express from "express";
import multer from "multer";

const router = express.Router();

// 📁 storage config
const storage = multer.diskStorage({
  destination: "uploads/chat/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📎 upload endpoint
router.post("/", upload.single("file"), (req, res) => {
  res.json({
    url: `http://localhost:5000/uploads/chat/${req.file.filename}`,
  });
});

export default router;