import express from "express";
import Report from "../models/Report.js";
import { protect } from "../middleware/authMiddleware.js";
import { generatePDF } from "../utils/generateReport.js";

const router = express.Router();


// ✅ CREATE REPORT
router.post("/", protect, async (req, res) => {
    try {
      const report = new Report({
        doctorId: req.user.id,
        doctorName: req.user.name,
  
        patientId: req.body.patientId,
        patientName: req.body.patientName,
  
        appointmentId: req.body.appointmentId,
  
        diagnosis: req.body.diagnosis,
        prescription: req.body.prescription,
        notes: req.body.notes,
      });
  
      await report.save();
  
      // 🔥 generate PDF
      const pdfPath = await generatePDF(report);
  
      report.pdfUrl = "/" + pdfPath;
      await report.save();
  
      res.json(report);
  
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });

// ✅ GET PATIENT REPORTS
router.get("/user", protect, async (req, res) => {
    const reports = await Report.find({
      patientName: req.user.name   // ✅ CHANGE HERE
    });
  
    res.json(reports);
  });


// ✅ GET DOCTOR REPORTS
router.get("/doctor", protect, async (req, res) => {
  const reports = await Report.find({ doctorId: req.user.id });
  res.json(reports);
});

export default router;