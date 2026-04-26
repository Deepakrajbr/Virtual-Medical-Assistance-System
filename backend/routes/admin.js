import express from "express";
import User from "../models/user.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// 🔍 Get all pending doctors
router.get("/pending-doctors", async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
      status: "pending",
    }).select("-password");

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Approve doctor
router.put("/approve-doctor/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });

    res.json({ msg: "Doctor Approved" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ❌ Reject doctor
router.put("/reject-doctor/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true } // 👈 important
    );

    console.log("Rejected doctor:", updated); // 👈 debug

    if (!updated) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.json({ msg: "Doctor Rejected", doctor: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select("-password");

    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
});

router.get("/doctors", async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("-password");
  res.json(doctors);
});


router.get("/appointments", async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
});

export default router;