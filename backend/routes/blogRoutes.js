import express from "express";
import Blog from "../models/Blog.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Only doctors can post blogs" });
    }

    const { title, content, image } = req.body;

    const blog = new Blog({
      doctorId: req.user.id,
      doctorName: req.user.name,
      title,
      content,
      image,
    });

    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

export default router;