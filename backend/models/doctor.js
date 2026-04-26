import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
  experience: Number,
  workingDays: [String],
  blockedDates: [String],
  image: String,
  rating: {
    type: Number,
    default: 4.5,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
});

export default mongoose.model("Doctor", doctorSchema);