import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  doctorId: {                 
    type: String,
    required: true,
  },
  date: String,
  time: String,
  status: {
    type: String,
    default: "pending",
  },
  meetingLink: String,
  meetingId: String,     
  startTime: Date,
  endTime: Date,
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);