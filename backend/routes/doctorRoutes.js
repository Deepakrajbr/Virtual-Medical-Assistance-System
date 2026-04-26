import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;