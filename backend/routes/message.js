import express from "express";
import Message from "../models/message.js";

const router = express.Router();

// GET OLD MESSAGES
router.get("/:room", async (req, res) => {
  try {
    const messages = await Message.find({
      room: req.params.room,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;