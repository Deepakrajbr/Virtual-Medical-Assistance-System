import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  doctorId: String,
  doctorName: String,

  patientId: String,
  patientName: String,

  appointmentId: String,

  diagnosis: String,
  prescription: String,
  notes: String,

  pdfUrl: String, // 🔥 important

}, { timestamps: true });

export default mongoose.model("Report", reportSchema);