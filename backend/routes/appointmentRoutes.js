import express from "express";
import {
  createAppointment,
  getDoctorAppointments,
  getUserAppointments,
  updateStatus,
  joinAppointment,
  cancelAppointment,
} from "../controller/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/join/:id", protect, joinAppointment);


// patient booking
router.post("/", protect, createAppointment);

// user fetch
router.get("/user", protect, getUserAppointments);

// doctor fetch
router.get("/doctor", protect, getDoctorAppointments);

// update
router.put("/:id", protect, updateStatus);
//cancel appointment
router.put("/cancel/:id", protect, cancelAppointment);

export default router;